<template>
  <q-page padding class="bg-dark text-white">
    <!-- Admin toggle -->
    <q-toggle 
      v-model="isAdmin" 
      label="Admin mode" 
      class="q-mb-md text-white"
      color="white"
      keep-color
      @update:model-value="checkPin"
    />

    <!-- Dodavanje novog proizvoda (samo admin) -->
    <div v-if="isAdmin" class="q-mb-md">
      <q-input v-model="newProduct.name" label="Naziv proizvoda" dense bg-color="white" input-class="text-black q-mb-sm"/>
      <q-input v-model="newProduct.description" label="Opis proizvoda" dense bg-color="white" input-class="text-black q-mb-sm"/>
      <q-input v-model="newProduct.price" type="number" label="Cijena" dense bg-color="white" input-class="text-black q-mb-sm"/>
      <q-input v-model="newProduct.image" label="URL slike" dense bg-color="white" input-class="text-black q-mb-sm"/>
      <q-btn label="Dodaj proizvod" color="primary" class="q-mt-sm" @click="addProduct"/>
    </div>

    <!-- Lista proizvoda -->
    <div class="row q-gutter-md">
      <div v-for="(product, index) in products" :key="index" class="col-12 col-md-4">
        <q-card class="bg-dark text-white">
          <q-img :src="product.image" :alt="product.name" height="200px"/>
          <q-card-section>
            <div class="text-h6">
              <span v-if="!isEditing[index]">{{ product.name }}</span>
              <q-input v-else v-model="product.name" dense bg-color="white" input-class="text-black" @blur="saveProducts"/>
            </div>
            <div>
              <span v-if="!isEditing[index]">{{ product.description }}</span>
              <q-input v-else v-model="product.description" dense bg-color="white" input-class="text-black" @blur="saveProducts"/>
            </div>
            <div>
              <span v-if="!isEditing[index]">{{ product.price }} €</span>
              <q-input v-else v-model="product.price" type="number" dense bg-color="white" input-class="text-black" @blur="saveProducts"/>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn v-if="isAdmin && !isEditing[index]" label="Uredi" color="secondary" text-color="white" @click="isEditing[index]=true"/>
            <q-btn v-if="isAdmin && isEditing[index]" label="Spremi" color="primary" text-color="white" @click="finishEdit(index)"/>
            <q-btn v-if="isAdmin" label="Obriši" color="negative" text-color="white" @click="deleteProduct(index)"/>
            <q-btn v-if="!isAdmin" label="Dodaj u košaricu" color="primary" text-color="white" @click="addToCart(product)"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Košarica -->
    <div class="q-mt-xl">
      <h5 class="text-white">🛒 Košarica</h5>
      <div v-if="cart.length === 0" class="text-white">Košarica je prazna.</div>

      <q-list bordered class="rounded-borders bg-dark" v-else>
        <q-item v-for="(item, index) in cart" :key="index" class="text-white">
          <q-item-section>
            <q-item-label class="text-white">{{ item.name }}</q-item-label>
            <q-item-label caption class="text-white">
              {{ item.price }} € x {{ item.quantity }} = {{ item.price * item.quantity }} €
            </q-item-label>
          </q-item-section>
          <q-item-section side class="row items-center q-gutter-xs">
            <q-btn dense flat icon="remove" color="white" @click="decreaseQuantity(index)"/>
            <q-btn dense flat icon="add" color="white" @click="increaseQuantity(index)"/>
            <q-btn dense flat icon="delete" color="white" @click="removeFromCart(index)"/>
          </q-item-section>
        </q-item>
      </q-list>

      <div v-if="cart.length > 0" class="q-mt-md">
        <div class="text-h6 text-white">Ukupno: {{ totalPrice }} €</div>
        <q-btn label="Kupi" color="positive" text-color="white" @click="buyCart"/>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const isAdmin = ref(false)

// Lista proizvoda
const products = reactive([])
const isEditing = reactive([])
const newProduct = reactive({ name: '', description: '', price: 0, image: '' })

// Košarica
const cart = reactive([])

const totalPrice = computed(() => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// Ucitaj iz localStorage na pocetku
onMounted(() => {
  const saved = localStorage.getItem('products')
  if (saved) {
    const parsed = JSON.parse(saved)
    parsed.forEach(p => products.push(p))
    parsed.forEach(() => isEditing.push(false))
  } else {
    const defaults = [
      { name: 'Majica', price: 20, image: 'https://www.halloweenshirtcompany.com/cdn/shop/files/IMG-4298_1024x.jpg?v=1700193295', description: 'Cool majica' },
      { name: 'Hoodie', price: 35, image: 'hoodie.jpg', description: 'Top hoodie' }
    ]
    defaults.forEach(p => products.push(p))
    defaults.forEach(() => isEditing.push(false))
    saveProducts()
  }

  // ucitaj kosaricu
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart)
    parsedCart.forEach(p => cart.push(p))
  }
})

// Funkcija za spremanje proizvoda
function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products))
}

// Dodavanje proizvoda
function addProduct() {
  if (!newProduct.name) return
  products.push({ ...newProduct })
  isEditing.push(false)
  saveProducts()
  newProduct.name = ''
  newProduct.description = ''
  newProduct.price = 0
  newProduct.image = ''
}

// Brisanje proizvoda
function deleteProduct(index) {
  products.splice(index, 1)
  isEditing.splice(index, 1)
  saveProducts()
}

// Uređivanje proizvoda
function finishEdit(index) {
  isEditing[index] = false
  saveProducts()
}

// Dodavanje u košaricu
function addToCart(product) {
  const existing = cart.find(p => p.name === product.name)
  if (existing) {
    existing.quantity++
  } else {
    cart.push({ ...product, quantity: 1 })
  }
  saveCart()
}

// Uklanjanje iz košarice
function removeFromCart(index) {
  cart.splice(index, 1)
  saveCart()
}

// Povećaj količinu
function increaseQuantity(index) {
  cart[index].quantity++
  saveCart()
}

// Smanji količinu
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--
  } else {
    cart.splice(index, 1)
  }
  saveCart()
}

// Kupovina (brisanje kosarice)
function buyCart() {
  alert('Hvala na kupnji! 🛒')
  cart.splice(0, cart.length)
  saveCart()
}

// Spremi kosaricu
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart))
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
