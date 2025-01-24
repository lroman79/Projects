<script setup>
const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
})

const imageSrc = `https://fedtest.bylith.com/api/imager.php?url=${props.product.images[0].url}&type=fit&width=1000&height=1000&quality=70`
</script>

<template>
  <router-link :to="'/product/' + product.id">
    <div class="item-wrp">
      <div class="item">
        <div class="item-img">
          <img :src="imageSrc" alt="product.name" width="220" height="220" />
        </div>
        <div class="item-content">
          <h3>{{ product.title }}</h3>
          <p>{{ product.min_price }}$</p>
          <p class="desc">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>
+
<style scope>
.item-wrp {
  width: 220px;
  height: 347px;
}

.item {
}

.desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-img img {
  border-radius: 15px;
}
</style>
