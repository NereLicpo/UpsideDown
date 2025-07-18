<template>
  <q-page class="q-pa-md">
    <div class="pixel-text-bubble">
      <q-card flat bordered class="q-pa-md transparent-bg">
        <div class="text-h6 q-mb-md">Developer Notes</div>
        <div class="dev-notes-container" data-test="developer-notes">
          <q-card
            v-for="note in notes"
            :key="note.NoteID"
            flat
            bordered
            class="dev-note-card q-mb-md"
            data-test="note-card"
          >
            <q-card-section>
              <div class="text-h6 text-orange q-mb-sm" data-test="note-title">
                {{ note.Title }}
              </div>
              <div class="text-body2 q-mb-sm" data-test="note-content">
                {{ note.Content }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="text-body2" data-test="note-category">
                <strong>Category:</strong> {{ note.Category }}
              </div>
              <div class="text-body2" data-test="note-priority">
                <strong>Priority:</strong> {{ note.Priority }}
              </div>
              <div class="text-body2" data-test="note-author">
                <strong>Author:</strong> {{ note.Author }}
              </div>
              <div class="text-body2" data-test="note-status">
                <strong>Status:</strong> {{ note.Status }}
              </div>
              <div class="text-body2" data-test="note-created">
                <strong>Created At:</strong>
                {{ new Date(note.CreatedAt).toLocaleString() }}
              </div>
              <div class="text-body2" data-test="note-updated">
                <strong>Updated At:</strong>
                {{ new Date(note.UpdatedAt).toLocaleString() }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      notes: [], // Developer notes data
    };
  },
  methods: {
    fetchNotes() {
      axios
        .get("https://upsidedown-api.onrender.com/api/developer-notes")
        .then((response) => {
          this.notes = response.data;
        })
        .catch((error) => {
          console.error("Error fetching developer notes:", error);
        });
    },
  },
  mounted() {
    this.fetchNotes();
  },
};
</script>

<style scoped>
/* Semi-transparent background for the main container */
.transparent-bg {
  background: rgba(0, 0, 0, 0.8); /* Black with 80% opacity */
  color: #fff; /* White text for visibility */
  border-radius: 8px; /* Optional rounded corners */
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */
  padding: 20px; /* Additional padding for spacing */
}

/* Developer Notes Container */
.dev-notes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Space between cards */
  justify-content: center; /* Center the cards */
}

/* Developer Note Card */
.dev-note-card {
  width: 400px; /* Card width */
  transition: transform 0.3s, box-shadow 0.3s;
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent dark background */
  color: #fff; /* White text color */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

/* Hover effect for cards */
.dev-note-card:hover {
  transform: translateY(-5px); /* Lift effect */
  box-shadow: 0px 4px 16px rgba(255, 165, 0, 0.8); /* Bright orange glow */
}

/* Styling for card sections */
.q-card-section {
  padding: 10px;
}
.pixel-text-bubble {
  border: 4px solid black;
  padding: 12px;
  font-family: "Press Start 2P", monospace;
  font-size: 14px;

  line-height: 1.5;
  image-rendering: pixelated;
}
</style>
