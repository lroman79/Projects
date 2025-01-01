import Vue from "vue";

const state = Vue.observable({
  order: {
    cartId: "",
    addressId: "",
    paymentMethod: "",
    paymentInfoId: "",
    purchaseOrderNumber: "",
    couponCode: "",
    termsAndConditionsAccepted: true,
  },
  paymentMethod: null,
});

const methods = {
  updateOrder: (data) => {
    state.order.assign(data);
  },
  setPaymentMethod: (method) => {
    if (!method) return;
    state.paymentMethod = method;
  },
};

export default { state, ...methods };
