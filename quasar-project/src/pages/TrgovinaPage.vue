<template>
  <q-page padding>
    <q-toggle 
      v-model="isAdmin" 
      label="Admin mode" 
      class="q-mb-md"
      @update:model-value="checkPin"
    />

    <!-- Dodavanje novog proizvoda (samo admin) -->
    <div v-if="isAdmin" class="q-mb-md">
      <q-input 
        v-model="newProduct.name" 
        label="Naziv proizvoda" 
        dense 
        bg-color="white" 
        input-class="text-black q-mb-sm"
      />
      <q-input 
        v-model="newProduct.description" 
        label="Opis proizvoda" 
        dense 
        bg-color="white" 
        input-class="text-black q-mb-sm"
      />
      <q-input 
        v-model="newProduct.price" 
        type="number" 
        label="Cijena" 
        dense 
        bg-color="white" 
        input-class="text-black q-mb-sm"
      />
      <q-input 
        v-model="newProduct.image" 
        label="URL slike" 
        dense 
        bg-color="white" 
        input-class="text-black q-mb-sm"
      />
      <q-btn label="Dodaj proizvod" color="primary" @click="addProduct"/>
    </div>

    <!-- Lista proizvoda -->
    <div class="row q-gutter-md">
      <div v-for="(product, index) in products" :key="index" class="col-12 col-md-4">
        <q-card>
          <q-img :src="product.image" :alt="product.name" height="200px"/>
          <q-card-section>
            <div class="text-h6">
              <span v-if="!isEditing[index]">{{ product.name }}</span>
              <q-input
                v-else
                v-model="product.name"
                dense
                bg-color="white"
                input-class="text-black"
                @blur="saveProducts"
              />
            </div>
            <div>
              <span v-if="!isEditing[index]">{{ product.description }}</span>
              <q-input
                v-else
                v-model="product.description"
                dense
                bg-color="white"
                input-class="text-black"
                @blur="saveProducts"
              />
            </div>
            <div>
              <span v-if="!isEditing[index]">{{ product.price }} €</span>
              <q-input
                v-else
                v-model="product.price"
                type="number"
                dense
                bg-color="white"
                input-class="text-black"
                @blur="saveProducts"
              />
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn v-if="isAdmin && !isEditing[index]" label="Uredi" color="secondary" @click="isEditing[index]=true"/>
            <q-btn v-if="isAdmin && isEditing[index]" label="Spremi" color="primary" @click="finishEdit(index)"/>
            <q-btn v-if="isAdmin" label="Obriši" color="negative" @click="deleteProduct(index)"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const isAdmin = ref(false)

// Lista proizvoda (prazna, punimo iz localStorage ili default)
const products = reactive([])

// Edit mod za svaki proizvod
const isEditing = reactive([])

// Novi proizvod
const newProduct = reactive({ name: '', description: '', price: 0, image: '' })

// Ucitaj iz localStorage na pocetku
onMounted(() => {
  const saved = localStorage.getItem('products')
  if (saved) {
    const parsed = JSON.parse(saved)
    parsed.forEach(p => products.push(p))
    parsed.forEach(() => isEditing.push(false))
  } else {
    // ako nema spremljenih, stavi default proizvode
    const defaults = [
      { name: 'Majica', price: 20, image: 'https://www.halloweenshirtcompany.com/cdn/shop/files/IMG-4298_1024x.jpg?v=1700193295', description: 'Cool majica' },
      { name: 'Hoodie', price: 35, image: 'hoodie.jpg', description: 'Top hoodie' }
    ]
    defaults.forEach(p => products.push(p))
    defaults.forEach(() => isEditing.push(false))
    saveProducts()
  }
})

// Funkcija za spremanje u localStorage
function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products))
}

function addProduct() {
  if (!newProduct.name) return
  products.push({ ...newProduct })
  isEditing.push(false)
  saveProducts()
  // reset inputa
  newProduct.name = ''
  newProduct.description = ''
  newProduct.price = 0
  newProduct.image = ''
}

function deleteProduct(index) {
  products.splice(index, 1)
  isEditing.splice(index, 1)
  saveProducts()
}

function finishEdit(index) {
  isEditing[index] = false
  saveProducts()
}

// PIN zaštita
function checkPin(value) {
  if (value) {
    const pin = prompt('Unesi admin PIN:')
    if (pin !== '1805') {
      alert('Pogresan PIN! Vracam te na trgovinu.')
      isAdmin.value = false
    }
  }
}
</script>
