<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg text-center" style="max-width: 400px; width: 100%">
      <q-card-section>
        <div class="text-h6 q-mb-md">Odjava</div>
        <div v-if="loading">
          <q-spinner color="primary" size="40px" />
          <p class="q-mt-sm">Odjavljujem vas...</p>
        </div>
        <div v-else>
          <q-icon name="check_circle" color="green" size="40px" />
          <p class="q-mt-sm">Uspješno ste odjavljeni</p>
          <q-btn
            color="primary"
            label="Prijavi se ponovo"
            class="q-mt-md"
            @click="goToLogin"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Notify } from "quasar";

const backendUrl = "http://localhost:3000";
const router = useRouter();
const loading = ref(true);

// Odmah kad se otvori stranica -> pozovi backend logout
onMounted(async () => {
  try {
    await axios.post(backendUrl + "/api/logout", {}, { withCredentials: true });
    Notify.create({
      message: "Odjavljeni ste",
      color: "positive",
    });
  } catch (err) {
    console.error(err);
    Notify.create({
      message: "Greška kod odjave",
      color: "negative",
    });
  } finally {
    loading.value = false;
  }
});

// Redirect na login
function goToLogin() {
  router.push("/login");
}
</script>
