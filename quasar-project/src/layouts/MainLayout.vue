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

        <q-toolbar-title> UpsideDown </q-toolbar-title>

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
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Početna stranica",
    caption: "",
    icon: "home",
    link: "/",
  },
  {
    title: "O igri",
    caption: "",
    icon: "search",
    link: "/about",
  },
  {
    title: "Likovi",
    caption: "",
    icon: "emoji_people",
    link: "/Likovi",
  },

  {
    title: "O nama",
    caption: "Nešto malo o našoj ekipi",
    icon: "person",
    link: "/Onama",
  },
  {
    title: "Developer Notes",
    caption: "",
    icon: "description",
    link: "/Notes",
  },
  {
    title: "Kontakt",
    caption: "",
    icon: "contact_support",
    link: "/Kontakti",
  },
  {
    title: "Community",
    caption: "",
    icon: "groups",
    link: "/Community",
  },
  {
    title: "Download",
    caption: "",
    icon: "download",
    link: "/Download",
  },

  {
    title: "Login",
    caption: "",
    icon: "login",
    link: "/Login",
  },
  {
    title: "Register",
    caption: "",
    icon: "login",
    link: "/Register",
  },

  {
    title: "Admin",
    caption: "",
    icon: "leaderboard",
    link: "/admin",
  },
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
