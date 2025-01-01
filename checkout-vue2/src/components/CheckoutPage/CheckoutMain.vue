<template>
  <div :class="$style['checkout-wrp']">
    <div :class="$style['cart-wrp']">
      <div :class="$style['left-sec']">
        <ShippingAdress />
        <hr />
        <PaymentMethods />
        <hr />
        <CartItems
          v-if="cartData?.items.length"
          :items="cartData?.items"
          :class="$style['items']"
        />
      </div>
      <div :data="cartData" :class="$style['right-sec']">
        <Summary v-if="isDataLoaded" :data="cartData" />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCart } from "@/entities/checkoutCart/actions.js";
import checkoutState from "@/state/checkout.js";

import ShippingAdress from "./ShippingAddress/ShippingAddress.vue";
import PaymentMethods from "./PaymentMethods.vue";
import CartItems from "./CartItems.vue";
import Summary from "./Summary.vue";

export default {
  components: {
    CartItems,
    ShippingAdress,
    PaymentMethods,
    Summary,
  },
  data() {
    return {
      cartData: null,
      isDataLoaded: false,
    };
  },
  methods: {
    async init() {
      try {
        const result = await fetchCart();
        this.cartData = result;
        this.isDataLoaded = true;

        checkoutState.state.order.cartId = result.id;
        console.log("cartData:", result);
      } catch (error) {
        console.log("cart ERROR:", error);
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style module>
.checkout-wrp {
  height: 100%;
  background-color: #e7e7e7;
  padding: 5px;
  box-sizing: border-box;
}

.cart-wrp {
  display: flex;
  height: 100%;
  overflow-y: auto;
  gap: 10px;
}
.left-sec {
  width: 70%;
  padding: 10px;
  overflow-y: auto;
}

.right-sec {
  width: 30%;
  overflow-y: auto;
}

.left-sec,
.right-sec {
  background-color: #ffffff;
}
</style>
