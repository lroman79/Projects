<template>
  <div :class="$style['payment-methods-wrp']">
    Payment methods:

    <div v-if="!isPaymentComponentChoosen">
      <div v-if="paymentMethodsNames.length" :class="$style['payment-methods']">
        <div
          v-for="(method, index) in paymentMethodsNames"
          :key="index"
          @click="onClickMethod(paymentMethods[method].component)"
          :class="$style['payment-method']"
        >
          {{ paymentMethods[method].title }}
        </div>
      </div>
      <div v-else>No saved payment methods</div>
    </div>

    <component
      v-if="currentComponent && isPaymentComponentChoosen"
      :is="currentComponent"
    />

    <div :class="$style['cancel-btn']">
      <button
        v-if="isPaymentComponentChoosen"
        type="button"
        @click="isPaymentComponentChoosen = false"
      >
        cancel
      </button>
    </div>
  </div>
</template>

<script>
import { fetchPaymentMethods } from "@/entities/checkoutCart/actions.js";

export default {
  data() {
    return {
      paymentMethodsNames: [],
      isPaymentComponentChoosen: false,
      currentComponent: null,
      paymentMethods: {
        CreditCard: {
          title: "Credit Card",
          component: "CreditCards",
        },
        PurchaseOrder: {
          title: "Purchase Order",
          component: "PurchaseOrder",
        },
      },
    };
  },
  methods: {
    onClickMethod(method) {
      this.currentComponent = () => import(`./${method}.vue`);
      this.isPaymentComponentChoosen = true;
    },
  },
  async created() {
    const paymentMethods = await fetchPaymentMethods();
    this.paymentMethodsNames = paymentMethods;
  },
};
</script>

<style module>
.payment-methods {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 20px 0;
}

.payment-method {
  background-color: blueviolet;
  color: #ffffff;
  padding: 5px;
  cursor: pointer;
  width: 140px;
  border-radius: 5px;
}

.cancel-btn {
  margin: 10px 0;
}
</style>
