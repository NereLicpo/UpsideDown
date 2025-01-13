<template>
  <q-page style="background-color: #333333; color: #ffffff;" class="q-pa-md">
    <div class="text-h4 text-center q-mb-lg">O nama</div>

    <q-card class="q-mb-md" v-for="(person, index) in people" :key="index" style="display: flex; align-items: center; padding: 16px;">
      <q-avatar size="150px" class="q-mr-md">
        <img :src="person.image" alt="Profile picture" />
      </q-avatar>
      <div>
        <div class="text-h5">{{ person.name }}</div>
        <div class="text-subtitle1">Dob: {{ person.age }}</div>
        <div class="q-mt-sm text-body1">{{ person.description }}</div>
        <div class="q-mt-sm">
          <q-icon name="phone" /> {{ person.contact.phone }}
          <br />
          <q-icon name="email" /> {{ person.contact.email }}
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "oNamaPage",
  data() {
    return {
      people: [
        {
          name: "Ivan Horvat",
          age: 30,
          description: "Razvojni programer s više od 10 godina iskustva.",
          contact: {
            phone: "+385 91 123 4567",
            email: "ivan.horvat@example.com",
          },
          image: "https://via.placeholder.com/150",
        },
        {
          name: "Ana Kovačić",
          age: 28,
          description: "Dizajnerica koja voli kreativna rješenja.",
          contact: {
            phone: "+385 92 234 5678",
            email: "ana.kovacic@example.com",
          },
          image: "https://via.placeholder.com/150",
        },
        {
          name: "Marko Jurić",
          age: 35,
          description: "Stručnjak za marketing i odnose s javnošću.",
          contact: {
            phone: "+385 98 345 6789",
            email: "marko.juric@example.com",
          },
          image: "https://via.placeholder.com/150",
        },
        {
          name: "Lucija Novak",
          age: 26,
          description: "Frontend developer s fokusom na UX/UI.",
          contact: {
            phone: "+385 97 456 7890",
            email: "lucija.novak@example.com",
          },
          image: "https://via.placeholder.com/150",
        },
        {
          name: "Petar Radić",
          age: 40,
          description: "Iskusni projektni menadžer.",
          contact: {
            phone: "+385 95 567 8901",
            email: "petar.radic@example.com",
          },
          image: "https://via.placeholder.com/150",
        },
      ],
    };
  },
};
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}
.q-card {
  background-color: #444444;
  color: #ffffff;
  border-radius: 8px;
}
.text-h5 {
  font-size: 1.25rem;
  font-weight: bold;
}
.text-subtitle1 {
  font-size: 1.125rem;
}
.text-body1 {
  font-size: 1rem;
}
</style>
