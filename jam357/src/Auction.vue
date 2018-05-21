<template>
    <div id="auction">
      <h1>
        <router-link :to="{ name: 'active' }" style="color:WHITE"><font size="6">Back to auctions</font></router-link>
      </h1>

      <br /><br />

      <div id="auctionView" v-for="auction in auctions">
        <p><font size="5">{{ "Category title: " + auction.categoryTitle }}</font></p>
        <p><font size="5">{{ "Auction seller: " + auction.seller.username }}</font></p>
        <p><font size="5">{{ "Auction title: " + auction.title }}</font></p>
        <p><font size="5">{{ "Description: " + auction.description }}</font></p>
        <p><font size="5">{{ "Auction starting date time: " + new Date(auction.startDateTime).toLocaleDateString() + " " + new Date(auction.startDateTime).toLocaleTimeString() }}</font></p>
        <p><font size="5">{{ "Auction ending date time: " + new Date(auction.endDateTime).toLocaleDateString() + " " + new Date(auction.endDateTime).toLocaleTimeString() }}</font></p>
        <p><font size="5">{{ "Reserve price: $" + auction.reservePrice }}</font></p>
        <p><font size="5">{{ "Current bid: $" + auction.currentBid }}</font></p>
      </div>

      <div v-if="bids.length>0" style="margin-bottom: 80px">
        <h3 style="margin-bottom: 30px"><font size="6">Previous Bids</font></h3>
        <div id="bids" v-for="bid in bids">
          <p><font size="5">{{ "Bid date: " + new Date(bid.datetime).toLocaleDateString() + " " + new Date(bid.datetime).toLocaleTimeString() }}</font></p>
          <p><font size="5">{{ "Buyer username: " + bid.buyerUsername }}</font></p>
          <p><font size="5">{{ "Amount: $" + bid.amount }}</font></p>
        </div>
      </div>

  </div>
</template>


<script>
  export default {
    data () {
      return {
        error: "",
        errorFlag: false,
        auctions: [],
        bids: []
      }
    },
    mounted: function() {
      this.getAuction();
      this.getBids();
    },
    methods: {
      getAuction: function(){
        this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId).then(function(response){
          this.auctions = [response.data];
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getBids: function(){
        this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/bids').then(function(response){
          this.bids = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      }
    }
  }
</script>

<style>
  #auctionView {
    float: left;
    background-color: rgba(128, 128, 128, 0.5);
    height: 650px;
    width: 1164px;
    margin-bottom: 30px;
  }

  #bids {
    background-color: rgba(128, 128, 128, 0.5);
    width: 500px;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
  }
</style>
