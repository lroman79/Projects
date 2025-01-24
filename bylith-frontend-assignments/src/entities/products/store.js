import { reactive } from 'vue'

const state = reactive({
  products: [],
})

const methods = {
  setProducts: (products) => {
    state.products = products
  },
}

export default { state, methods }
