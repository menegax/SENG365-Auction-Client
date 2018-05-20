import Vue from 'vue';
import App from './App.vue';
import Auctions from './Auctions.vue';
import Auction from './Auction.vue';
import Apparel from './Apparel.vue';
import Equipment from './Equipment.vue';
import Vehicle from './Vehicle.vue';
import Property from './Property.vue';
import Other from './Other.vue';

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
    path: "/auctions/:auctionId",
    name: "auction",
    component: Auction
  },
  {
    path: "/apparel",
    name: "apparel",
    component: Apparel
  },
  {
    path: "/equipment",
    name: "equipment",
    component: Equipment
  },
  {
    path: "/vehicle",
    name: "vehicle",
    component: Vehicle
  },
  {
    path: "/property",
    name: "property",
    component: Property
  },
  {
    path: "/other",
    name: "other",
    component: Other
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
