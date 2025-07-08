const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000; // Render koristi dinamički port

// Middleware
app.use(
  session({
    secret: "ante", // U produkciji koristi jači ključ!
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // HTTPS zahtijeva secure cookie
      sameSite: "none", // Za cross-origin (frontend i backend na različitim domenama)
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS konfiguracija
app.use(
  cors({
    origin: "https://upsidedown-spa.onrender.com", // frontend domena
    credentials: true, // omogućuje cookieje i sessione
  })
);

// Database connection
const db = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "kmrkalj",
  password: "11",
  database: "kmrkalj",
});

db.connect((err) => {
  if (err) {
    console.error("Greška pri spajanju na bazu:", err);
  } else {
    console.log("Spojeno na bazu podataka.");
  }
});

// === ROUTES ===

// Dohvati sve DeveloperNotes
app.get("/api/developer-notes", (req, res) => {
  const query = "SELECT * FROM DeveloperNotes";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Dodaj novi DeveloperNote
app.post("/api/developer-notes", (req, res) => {
  const { title, content, category, priority, author } = req.body;

  if (!title || !content || !category || !priority || !author) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO DeveloperNotes (Title, Content, Category, Priority, Author, CreatedAt, UpdatedAt)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;

  db.query(
    query,
    [title, content, category, priority, author],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Developer Note dodan", id: results.insertId });
    }
  );
});

// Spremi poruku iz kontakta
app.post("/api/messages", (req, res) => {
  const { ime, email, poruka } = req.body;
  const query = "INSERT INTO Kontakti (ime, email, poruka) VALUES (?, ?, ?)";
  db.query(query, [ime, email, poruka], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Poruka spremljena", id: results.insertId });
  });
});

// Login ruta
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Nedostaje email ili lozinka" });
  }

  const query = "SELECT * FROM Users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      req.session.user = { id: results[0].id, role: results[0].role };
      return res.json({ message: "Login uspješan", role: results[0].role });
    } else {
      return res.status(401).json({ error: "Neispravni podaci" });
    }
  });
});

// Provjera autentikacije
app.get("/api/check-auth", (req, res) => {
  if (req.session.user) {
    res.json({ role: req.session.user.role });
  } else {
    res.status(401).json({ error: "Niste prijavljeni" });
  }
});

// Logout ruta
app.post("/api/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Greška pri odjavi" });
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  } else {
    res.status(400).json({ error: "Nema aktivne sesije" });
  }
});

// Registracija korisnika
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  const role = "user";

  if (!email || !password) {
    return res.status(400).json({ error: "Email i lozinka su obavezni" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Lozinka mora imati barem 6 znakova" });
  }

  const checkQuery = "SELECT * FROM Users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      return res.status(409).json({ error: "Email je već registriran" });
    }

    const insertQuery =
      "INSERT INTO Users (email, password, role) VALUES (?, ?, ?)";
    db.query(insertQuery, [email, password, role], (err, results) => {
      if (err)
        return res.status(500).json({ error: "Greška pri registraciji" });
      res.json({ message: "Uspješna registracija" });
    });
  });
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
