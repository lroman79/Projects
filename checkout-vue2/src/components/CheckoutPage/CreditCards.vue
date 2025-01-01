<template>
  <div>
    <div align="left">Credit Cards:</div>
    <div v-if="creditCards.length">
      <div
        v-for="(card, index) in creditCards"
        :key="card.id"
        :class="[$style['card'], { [$style['active']]: index === activeCard }]"
        @click="onCard(card.id, index)"
      >
        <span style="font-weight: bold"> VISA: </span>
        {{ card.cardNumber }} {{ card.cardHolderName }}
      </div>
    </div>
    <div v-else>Add credit card</div>
  </div>
</template>

<script>
import {
  fetchSavedCreditCards,
  setCreditCardAsPaymentMethod,
} from "@/entities/checkoutCart/actions.js";

import checkoutState from "@/state/checkout.js";

export default {
  data() {
    return {
      creditCards: [],
      activeCard: null,
    };
  },
  methods: {
    onCard(id, index) {
      this.activeCard = index;
      if (checkoutState.state.order.paymentInfoId !== id) {
        setCreditCardAsPaymentMethod(id);
        checkoutState.state.order.paymentInfoId = id;
      }
    },
  },
  async created() {
    const creditCards = await fetchSavedCreditCards();
    this.creditCards = creditCards;
    console.log("creditCards:", creditCards);
  },
};
</script>

<style module>
.card {
  cursor: pointer;
  border: solid 1px #e7e7e7;
  background-color: aliceblue;
}

.active {
  background-color: #98c4ea;
}
</style>
