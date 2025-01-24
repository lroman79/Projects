<script setup>
import { products } from '@/entities/index.js'
import { onMounted, computed } from 'vue'

import Item from './Item.vue'

const allProducts = computed(() => products.store.state.products)

const init = () => {
  products.actions.fetchProducts()
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="outer-wrp">
    <h1 align="center">Products</h1>
    <div v-if="allProducts.length > 0" class="products-wrp">
      <Item v-for="product in allProducts" :key="product.id" :product="product" />
    </div>
    <div v-else>No products yet</div>
  </div>
</template>

<style scoped>
.outer-wrp {
  padding: 50px;
}
h1 {
  color: #333;
}

.products-wrp {
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid #333;
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
}
</style>
