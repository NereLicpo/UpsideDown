const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "ante",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:9000",
    credentials: true,
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
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Routes
app.get("/api/developer-notes", (req, res) => {
  const query = "SELECT * FROM DeveloperNotes";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

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
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      res.json({
        message: "Developer Note added successfully",
        id: results.insertId,
      });
    }
  );
});

// Export for testing
module.exports = app;
