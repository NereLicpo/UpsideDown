<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="email"
          label="Email"
          type="email"
          filled
          class="q-mb-md"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          filled
          class="q-mb-md"
        />
        <q-input
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          filled
          class="q-mb-md"
        />
      </q-card-section>

      <q-card-actions class="q-pa-md">
        <q-btn
          :loading="loading"
          label="Register"
          color="primary"
          @click="register"
          class="full-width"
        />
      </q-card-actions>

      <q-card-section v-if="error" class="text-negative">
        {{ error }}
      </q-card-section>

      <q-card-section v-if="success" class="text-positive">
        {{ success }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const error = ref("");
    const success = ref("");
    const loading = ref(false);
    const router = useRouter(); // 🚀 za preusmjeravanje

    const register = async () => {
      if (!email.value || !password.value || !confirmPassword.value) {
        error.value = "Please fill in all fields.";
        success.value = "";
        return;
      }

      if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match.";
        return;
      }

      if (password.value.length < 6) {
        error.value = "Password must be at least 6 characters.";
        return;
      }

      error.value = "";
      loading.value = true;

      try {
        const response = await axios.post(
          "https://upsidedown-api.onrender.com/api/register",
          { email: email.value, password: password.value },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        success.value = response.data.message;

        // ⏳ Mali delay za UX, onda redirect
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (err) {
        error.value = err.response?.data?.error || "Registration failed";
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      confirmPassword,
      register,
      error,
      success,
      loading,
    };
  },
};
</script>
