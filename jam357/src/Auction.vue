<template>
    <div id="auction">
      <h1>
        <router-link :to="{ name: 'auctions' }" style="color:#111111"><font size="5">Back to auctions</font></router-link>
      </h1>

      <br /><br />

      <div id="auctionView" v-for="auction in auctions">
        <label>{{ auction.categoryTitle }}</label>
        <a>{{ auction.title }}</a>
        <a>{{ auction.description }}</a>
        <a>{{ auction.reservePrice }}</a>
        <a>{{ new Date(auction.startDateTime).toLocaleDateString() }}</a>
        <a>{{ new Date(auction.endDateTime).toLocaleDateString() }}</a>
      </div>

      <div v-if="bids.length>0">
        <h3>Previous Bids</h3>
        <table>
          <tr>
            <th>Date</th>
            <th>Username</th>
            <th>Amount</th>
          </tr>
          <tr v-for="bid in bids">
            <td>{{ new Date(bid.datetime).toLocaleDateString() }}</td>
            <td>{{ bid.buyerUsername }}</td>
            <td>{{ '$' + bid.amount }}</td>
          </tr>
        </table>
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
    height: 500px;
    width: 1164px;
    margin-bottom: 10px;
  }
</style>
