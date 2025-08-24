<template>
  <div class="q-pa-md">
    <!-- Upozorenje za nelogirane -->
    <q-banner v-if="!isLoggedIn" class="bg-red text-white q-mb-md" dense>
      <div class="row items-center justify-between">
        <div>⚠️ Morate biti prijavljeni da biste mogli objaviti poruku.</div>
        <q-btn
          flat
          color="white"
          label="Prijavi se"
          @click="goToLogin"
          class="q-ml-md"
        />
      </div>
    </q-banner>

    <!-- Forma za unos poruke -->
    <q-form @submit.prevent="submitPost" class="q-mb-md custom-post">
      <q-input
        v-model="message"
        type="textarea"
        outlined
        autogrow
        label="✍️ Unesi svoju poruku"
        counter
        maxlength="500"
        class="custom-input"
        :rules="[(val) => !!val || 'Poruka je obavezna']"
        :disable="!isLoggedIn"
      />

      <q-btn
        label="Objavi"
        type="submit"
        color="primary"
        class="q-mt-sm"
        :loading="isSubmitting"
        :disable="!isLoggedIn"
      />
    </q-form>

    <q-separator spaced class="text-white" />

    <!-- Lista poruka -->
    <div
      v-for="post in posts"
      :key="post.id"
      class="q-mt-md q-pa-md custom-post hover-effect"
    >
      <div class="row items-center justify-between">
        <!-- Autor -->
        <div class="text-white">
          <b>{{ post.author }}</b>
        </div>
        <!-- Datum -->
        <div class="text-grey-5 text-caption">
          {{ formatDate(post.created_at) }}
        </div>
      </div>

      <!-- Poruka -->
      <div class="q-mt-sm text-white">
        {{ post.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { Notify } from "quasar";
import { useRouter } from "vue-router";

const message = ref("");
const posts = ref([]);
const isSubmitting = ref(false);
const isLoggedIn = ref(false);
const backendUrl = "http://localhost:3000";
let intervalId = null;

const router = useRouter();

// Provjera da li je korisnik logiran
async function checkAuth() {
  try {
    await axios.get(backendUrl + "/api/check-auth", { withCredentials: true });
    isLoggedIn.value = true;
  } catch {
    isLoggedIn.value = false;
  }
}

// Redirect na login
function goToLogin() {
  router.push("/login");
}

// Submit poruke
async function submitPost() {
  if (!message.value.trim() || isSubmitting.value) return;

  if (!isLoggedIn.value) {
    Notify.create({
      message: "Morate biti prijavljeni da pošaljete poruku",
      color: "negative",
    });
    return;
  }

  isSubmitting.value = true;
  try {
    await axios.post(
      backendUrl + "/api/community",
      { message: message.value },
      { withCredentials: true }
    );
    message.value = "";
    await loadPosts();
  } catch (err) {
    console.error(err);
    Notify.create({
      message: "Greška kod slanja poruke",
      color: "negative",
    });
  } finally {
    isSubmitting.value = false;
  }
}

// Load poruka
async function loadPosts() {
  try {
    const res = await axios.get(backendUrl + "/api/community", {
      withCredentials: true,
    });
    posts.value = res.data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } catch (err) {
    console.error("Greška kod učitavanja poruka:", err);
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("hr-HR");
}

// On mount: provjeri auth i pokreni live refresh
onMounted(() => {
  checkAuth();
  loadPosts();
  intervalId = setInterval(loadPosts, 5000);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style>
.custom-post {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 8px;
  padding: 10px;
  color: white;
  transition: all 0.2s ease;
}

.custom-input .q-field__native {
  color: white !important;
  background-color: transparent !important;
}

.custom-input .q-field__label,
.custom-input .q-field__label.q-field--floating-label {
  color: white !important;
}

.custom-input .q-field__native::placeholder {
  color: white !important;
}

.hover-effect:hover {
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.q-separator {
  border-color: white;
}

.custom-input.q-field--focused {
  border: 2px solid white !important;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}
</style>
