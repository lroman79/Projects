<template>
  <div id="app">
    <CheckoutMain />
  </div>
</template>

<script>
import CheckoutMain from "./components/CheckoutPage/CheckoutMain.vue";

export default {
  name: "App",
  components: {
    CheckoutMain,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  box-sizing: border-box;
  overflow-y: hidden;
}

html {
  height: 100%;
}

body {
  overflow-y: hidden;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
