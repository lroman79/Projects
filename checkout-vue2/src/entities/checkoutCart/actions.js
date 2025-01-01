import apiRequest from "@/integration/api.js";

const fetchCart = async () => {
  return await apiRequest({ method: "get", url: "/Cart" });
};

const fetchAddress = async () => {
  return await apiRequest({ method: "get", url: "/Address" });
};

const fetchPaymentMethods = async () => {
  return await apiRequest({ method: "get", url: "/Payment/options" });
};

const fetchSavedCreditCards = async () => {
  return await apiRequest({ method: "get", url: "/Payment/creditcards" });
};

const updateOrderAddres = async (id) => {
  return await apiRequest({ method: "put", url: `/Address/select/${id}` });
};

const saveNewAddress = async (data) => {
  try {
    const result = await apiRequest({ method: "post", url: "/Address", data });
    console.log(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const setCreditCardAsPaymentMethod = async (id) => {
  try {
    const result = await apiRequest({
      method: "put",
      url: `Payment/creditcards/${id}`,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addCoupon = async (code) => {
  try {
    return await apiRequest({
      method: "post",
      url: "Cart/coupon",
      params: { couponCode: code },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  fetchCart,
  updateOrderAddres,
  fetchAddress,
  fetchPaymentMethods,
  fetchSavedCreditCards,
  saveNewAddress,
  setCreditCardAsPaymentMethod,
  addCoupon,
};
