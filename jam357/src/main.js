import Vue from 'vue';
import App from './App.vue';
import Auctions from './Auctions.vue';
import Auction from './Auction.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

const routes = [
  {
    path: "/",
    name: "auctions",
    component: Auctions
  },
  {
    path: "/:auctionId",
    name: "auction",
    component: Auction
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
