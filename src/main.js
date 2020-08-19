import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import routes from './router/routes'
import i18n from './i18n'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
