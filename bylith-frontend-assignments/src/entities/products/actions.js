import apiRequest from '@/integrations/api.js'
import store from './store.js'

const fetchProducts = async () => {
  const { data } = await apiRequest({
    method: 'get',
    url: '/catalog/getAll',
  })
  store.methods.setProducts(data)
  console.log('from store', data)
}

const getProduct = async (id) => {
  const { data } = await apiRequest({
    method: 'get',
    url: `/catalog/get?id=${id}`,
  })
  return data
}

export default { fetchProducts, getProduct }
