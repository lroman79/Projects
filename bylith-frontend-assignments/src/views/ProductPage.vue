<template>
  <ProductPage :productId="productId" />
</template>

<script setup>
import ProductPage from '@/components/ProductPage/ProductPage.vue'

defineProps({
  productId: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.product-page {
  /* Add your styles here */
}
</style>
