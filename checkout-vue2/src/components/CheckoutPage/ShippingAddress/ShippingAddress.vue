<template>
  <div>
    Shipping Address
    <AddressBook :address-book="addressBook" />
    <br />
    <div align="left">
      <button v-if="!showForm" @click="addAddress">Add new address +</button>
    </div>
    <br />

    <div v-if="showForm">
      Add new address:
      <NewAddressForm @closeForm="showForm = false" />
    </div>
  </div>
</template>

<script>
import { fetchAddress } from "@/entities/checkoutCart/actions.js";
import checkoutState from "@/state/checkout.js";

import AddressBook from "./AddressBook.vue";
import NewAddressForm from "./NewAddressForm.vue";

export default {
  components: {
    AddressBook,
    NewAddressForm,
  },
  data() {
    return {
      showForm: false,
    };
  },
  computed: {
    addressBook() {
      return checkoutState.state.addressBook;
    },
  },
  methods: {
    addAddress() {
      this.showForm = true;
    },
  },
  async created() {
    await fetchAddress();
  },
};
</script>
