<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 500px">
      <q-card-section>
        <div class="text-h6">Admin Dashboard</div>
      </q-card-section>

      <q-card-section>
        <p>Welcome, Admin! Here you can manage users, view logs, and more.</p>
      </q-card-section>

      <!-- Forma za dodavanje Developer Notes -->
      <q-card-section>
        <q-form @submit="addNote">
          <q-input v-model="note.title" label="Title" required />
          <q-input
            v-model="note.content"
            label="Content"
            type="textarea"
            required
          />
          <q-input v-model="note.category" label="Category" required />
          <q-select
            v-model="note.priority"
            :options="priorityOptions"
            label="Priority"
            required
          />
          <q-input v-model="note.author" label="Author" required />

          <q-btn
            type="submit"
            label="Add Note"
            color="primary"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Logout" color="negative" @click="logout" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const router = useRouter();
    const note = ref({
      title: "",
      content: "",
      category: "",
      priority: "Medium",
      author: "",
    });
    const priorityOptions = ["Low", "Medium", "High"];

    const addNote = async () => {
      try {
        await axios.post(
          "http://localhost:3000/api/developer-notes",
          note.value
        );
        alert("Developer Note added successfully!");
        note.value = {
          title: "",
          content: "",
          category: "",
          priority: "Medium",
          author: "",
        }; // Reset form
      } catch (error) {
        console.error("Error adding note:", error);
        alert("Failed to add note.");
      }
    };

    const logout = async () => {
      try {
        await axios.post(
          "http://localhost:3000/api/logout",
          {},
          { withCredentials: true }
        );
        router.push("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    return { logout, note, addNote, priorityOptions };
  },
};
</script>
