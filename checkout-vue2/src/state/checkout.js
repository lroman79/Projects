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
  addressBook: [],
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
  addAddress: (address) => {
    state.addressBook.push(address);
  },
};

export default { state, ...methods };
