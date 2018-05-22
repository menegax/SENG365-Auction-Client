import Vue from 'vue';
import App from './App.vue';
import Auctions from './Auctions.vue';
import Auction from './Auction.vue';
import VueRouter from 'vue-router';
import User from './User.vue';
import Selling from './Selling.vue';

Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

const routes = [
  {
    path: "/:status",
    name: "allAuctions",
    component: Auctions
  },
  {
    path: "/",
    name: "active",
    component: Auctions
  },
  {
    path: "/:status",
    name: "expired",
    component: Auctions
  },
  {
    path: "/:status",
    name: "upcoming",
    component: Auctions
  },
  {
    path: "/:status",
    name: "won",
    component: Auctions
  },
  {
    path: "/:status",
    name: "searched",
    component: Auctions
  },
  {
    path: "/:status",
    name: "inProgress",
    component: Auctions
  },
  {
    path: "/myAuction",
    name: "seller",
    component: Selling
  },
  {
    path: "/myAuction/:status",
    name: "sellerExpired",
    component: Selling
  },
  {
    path: "/:category",
    name: "apparel",
    component: Auctions
  },
  {
    path: "/:category",
    name: "equipment",
    component: Auctions
  },
  {
    path: "/:category",
    name: "vehicle",
    component: Auctions
  },
  {
    path: "/:category",
    name: "property",
    component: Auctions
  },
  {
    path: "/:category",
    name: "other",
    component: Auctions
  },
  {
    path: "/auctions/:auctionId",
    name: "auction",
    component: Auction
  },
  {
    path: "/user/:userId",
    name: "user",
    component: User
  },
  {
    path: "/user/:userId",
    name: "otherUser",
    component: User
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
