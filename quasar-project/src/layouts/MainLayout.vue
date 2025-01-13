<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="my-sidebar"
    >
      <q-list>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          :title="link.title"
          :caption="link.caption"
          :icon="link.icon"
          :link="link.link"
        />
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout'
});

const linksList = [
  {
    title: 'Početna stranica',
    caption: 'quasar.dev',
    icon: 'home',
    link: '#/'
  },
  {
    title: 'O igri',
    caption: 'Opis naše igrice gdje se korisnik može upoznati sa pričom i radnjom unutar virtualnog svijeta',
    icon: 'search',
    link: '#/about'
  },
  {
    title: 'Likovi',
    caption: 'O likovima u igrici',
    icon: 'person',
    link: '#/Likovi'
  },
  {
    title: 'Combat',
    caption: 'Detalji o borbama koji se događaju unutar igrice',
    icon: 'star',
    link: '#/combat'
  },
  {
    title: 'O nama',
    caption: 'Nešto malo o našoj ekipi',
    icon: 'person',
    link: '#/Onama'
  },
  {
    title: 'Patch Notes',
    caption: '@QuasarFramework',
    icon: 'code',
    link: '#/Notes'
  },
  {
    title: 'Kontakt',
    caption: 'Community Quasar projects',
    icon: 'info',
    link: 'https://awesome.quasar.dev'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
/* Sidebar pozadina */
.my-sidebar {
  background-color: #000 !important; /* Crna boja */
  color: #fff !important; /* Bijela boja teksta */
}

/* Stil za stavke u sidebaru */
.my-sidebar .q-item {
  background-color: transparent !important; /* Transparentna pozadina stavki */
  color: #fff !important; /* Bijela boja teksta */
}

/* Hover efekat */
.my-sidebar .q-item:hover {
  background-color: #444 !important; /* Svjetlija nijansa za hover */
  color: #fff !important; /* Tekst ostaje bijel na hover */
}
</style>
