<template>
  <div>
    Items:
    <div :class="$style['items-wrp']">
      <div
        v-for="{ product, id } in items"
        :key="id"
        :class="$style['items-row']"
      >
        <div>
          <img :src="product.imageUrl" alt="" width="60" />
        </div>
        <div>
          <div align="left">{{ product.name }}</div>
          <div>price: {{ product.price }}$</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { items: { type: Array, default: () => [] } },
};
</script>

<style module>
.items-wrp {
  border: solid 1px #e7e7e7;
  border-radius: 3px;
  padding: 5px;
  box-sizing: border-box;
}

.items-row {
  display: flex;
  gap: 10px;
}
</style>
