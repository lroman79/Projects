<template>
  <div>
    <h3>Summary</h3>
    <div>
      <div>Subtotal: {{ summary.subtotal }}</div>
      <div>
        <div>
          Tax: <span>{{ summary.tax }}</span>
        </div>
        Shiping:
        <span>
          {{ summary.shipping }}
        </span>
        <CoupunApplicable />
      </div>
      <hr />
      <div>
        Total:
        <span>
          {{ summary.total }}
        </span>
      </div>
      <hr />
      <div :class="$style['order-wrp']">
        <h3>Order details:</h3>
        <div v-for="(value, key) in getOrder" :key="key">
          <div>{{ key }}:</div>
          <div>{{ value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkoutState from "@/state/checkout.js";
import CoupunApplicable from "./CoupunApplicable.vue";

export default {
  components: {
    CoupunApplicable,
  },
  props: { data: { type: Object, default: () => {} } },
  data() {
    return {};
  },
  computed: {
    summary() {
      return {
        subtotal: this.data.subtotal,
        tax: this.data.tax,
        total: this.data.total,
        shipping: this.data.shipping,
      };
    },
    getPaymentMethod() {
      return checkoutState.state.paymentMethod;
    },
    getOrder() {
      return checkoutState.state.order;
    },
  },
  created() {
    console.log(checkoutState.state.paymentMethod);
  },
};
</script>

<style module>
.order-wrp {
  border: solid 1px #e7e7e7;
  border-radius: 3px;
  margin: 5px;
}
</style>
