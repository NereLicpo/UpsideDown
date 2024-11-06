<template>
  <div id="app">
    <!-- Izbornik -->
    <nav class="navbar">
      <ul>
        <li><a href="#home">Početna</a></li>
        <li><a href="#about">O igri</a></li>
        <li><a href="#likovi">Likovi</a></li>
        <li><a href="#combat">Combat</a></li>
        <li><a href="#contact">Kontakt</a></li>
      </ul>
    </nav>

    <!-- Početni sadržaj stranice -->
    <header class="main-header">
      <h1>Dobrodošli u svijet 'UpsideDown'</h1>
      <p>Pripremite se za nevjerojatnu avanturu.</p>
    </header>

    <!-- Komponenta Opis igre -->
    <OpisIgrice />

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024. Sva prava zadržana.</p>
    </footer>
  </div>
</template>

<script>
import OpisIgrice from './pages/HomePage.vue';

export default {
  name: 'App',
  components: {
    OpisIgrice
  }
};
</script>

<style>
/* Osnovni stil za izbornik */
.navbar {
  background-color: #333;
  color: white;
  padding: 15px 0;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.navbar li {
  margin: 0 25px;
}

.navbar a {
  color: #f0f0f0;
  text-decoration: none;
  font-size: 18px;
}

.navbar a:hover {
  color: #ff5c57;
}

/* Stil za header */
.main-header {
  background-color: #444;
  color: white;
  padding: 50px 20px;
  text-align: center;
}

.main-header h1 {
  font-size: 36px;
  margin-bottom: 15px;
}

.main-header p {
  font-size: 18px;
  margin-top: 10px;
}

/* Stil za footer */
.footer {
  background-color: #222;
  color: #f0f0f0;
  padding: 20px;
  text-align: center;
  margin-top: 50px;
}

/* Responsivnost */
@media (max-width: 768px) {
  .navbar a {
    font-size: 16px;
  }

  .main-header h1 {
    font-size: 30px;
  }
}
</style>
