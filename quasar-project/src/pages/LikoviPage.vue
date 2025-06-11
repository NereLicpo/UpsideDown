<template>
  <q-page class="q-pa-md page-container">
    <div class="page-header text-center">
      <div class="title">Čudovišta</div>
      <div class="subtitle">
        Otkrijte zastrašujuća bića koja vrebaju u tami.
      </div>
    </div>

    <div class="monsters-grid">
      <q-card
        v-for="(monster, index) in monsters"
        :key="index"
        class="monster-card"
      >
        <q-avatar size="120px" class="avatar">
          <img :src="monster.image" alt="Slika čudovišta" />
        </q-avatar>
        <div class="monster-info">
          <div class="text-h5 text-orange">{{ monster.name }}</div>
          <div class="synopsis-text">{{ monster.description }}</div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "CudovistaPage",
  data() {
    return {
      monsters: [
        {
          name: "Ice Ghoul",
          description: "Grozomorno biće prekriveno ledom.",
          image: "/images/IceGhoulBattler.png",
        },
        {
          name: "Insect Man",
          description: "Polu čovjek polu kukac, kreće se tiho, ali smrtonosno",
          image: "/images/InsectManBattler.png",
        },
        {
          name: "Not Deer",
          description:
            "Izgleda kao jelen — dok ne bude prekasno da shvatiš da nije.",
          image: "/images/NotDeerSprite.png",
        },
      ],
    };
  },
};
</script>

<style scoped>
.page-container {
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}
.title {
  font-size: 3rem;
  font-weight: bold;
  color: #ff6600;
  text-transform: uppercase;
}
.subtitle {
  font-size: 1.2rem;
  color: #ddd;
  margin-top: 10px;
}

.monsters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1000px;
  width: 100%;
}

.monster-card {
  background: #1e1e1e;
  color: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.monster-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 15px rgba(255, 102, 0, 0.6);
}

.avatar img {
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.monster-info {
  margin-top: 15px;
}
.text-orange {
  color: #ff6600;
}
.synopsis-text {
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 10px;
}
</style>
