<template>
  <div>
    <div>Coupon code:</div>
    <div :class="$style['input-wrp']">
      <input type="text" v-model="couponCode" placeholder="Enter coupon code" />
      <button @click="onClick">Apply</button>
    </div>
    <span v-if="errors.coupon" :class="$style['error-message']">{{
      errors.coupon
    }}</span>
    <span v-if="isSuccess" :class="$style['success']">Coupon applied</span>
  </div>
</template>

<script>
import { addCoupon } from "@/entities/checkoutCart/actions.js";

export default {
  data() {
    return {
      couponCode: null,
      isSuccess: false,
      errors: {
        coupon: null,
      },
    };
  },
  methods: {
    async onClick() {
      this.errors.coupon = null;
      this.isSuccess = false;
      try {
        const result = await addCoupon(this.couponCode);
        console.log(result);
        this.isSuccess = true;
      } catch (error) {
        console.log(error.response.data);
        this.errors.coupon = error.response.data;
      }
    },
  },
};
</script>

<style module>
.error-message {
  color: red;
}

.success {
  color: green;
}
</style>
