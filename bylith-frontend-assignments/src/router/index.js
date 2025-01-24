import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '../views/ProductsPage.vue'
import ProductPage from '../views/ProductPage.vue'
// import ProductPageTest from '../components/ProductPageTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductsPage,
    },
    // {
    //   path: '/test',
    //   name: 'products',
    //   component: ProductPageTest,
    // },
    {
      path: '/product/:productId', // Dynamic route with :id
      name: 'product',
      component: ProductPage,
      props: true,
      beforeEnter: (to, from, next) => {
        // Ensure the `id` is an integer
        const productId = parseInt(to.params.id, 10)
        if (productId <= 0) {
          // Redirect to home or an error page if the ID is invalid
          return next('/')
        }
        // Proceed to the product page if the ID is valid
        next()
      },
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'home', component: ProductsPage },
    },
  ],
})

export default router
