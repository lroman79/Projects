<template>
  <div>
    <h4 align="left">Shoose shipping address:</h4>
    <div :class="$style['addresses-list']">
      <template v-if="addressBook.length">
        <div
          v-for="(address, index) in addressBook"
          :key="address.id"
          :class="[
            $style['address'],
            { [$style['active']]: index === activeAddress },
          ]"
          align="left"
          @click="onAddress(address.id, index)"
        >
          {{ index === 0 ? 1 : index + 1 }}. {{ address.addressLine1 }}
          {{ address.addressLine2 }}
          {{ address.country }}
          {{ address.city }}
          {{ address?.state }}
          {{ address?.zipCode }}
        </div>
      </template>
      <div v-else>No saved address</div>
    </div>
  </div>
</template>

<script>
import checkoutState from "@/state/checkout.js";
import { updateOrderAddres } from "@/entities/checkoutCart/actions.js";

export default {
  props: { addressBook: { type: Array, default: () => [] } },
  data() {
    return {
      activeAddress: null,
    };
  },
  methods: {
    async onAddress(id, index) {
      this.activeAddress = index;
      if (checkoutState.state.order.addressId !== id) {
        console.log("address clicked:", id);
        checkoutState.state.order.addressId = id;
        updateOrderAddres(id);
      }
    },
  },
};
</script>

<style module>
.address {
  cursor: pointer;
  background-color: aliceblue;
  border: solid 1px #e7e7e7;
  margin-bottom: 3px;
  padding-left: 5px;
}

.address:hover {
  background-color: #98c4ea;
}

.address.active {
  background-color: #98c4ea;
}
</style>
