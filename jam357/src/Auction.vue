<template>
    <div id="auction">
      <h1>
        <router-link :to="{ name: 'auctions' }" style="color:#111111"><font size="5">Back to auctions</font></router-link>
      </h1>

      <br /><br />

      <table>
        <tr>
          <th>Category</th>
          <th>Auction Title</th>
          <th>Description</th>
          <th>Reserve Price</th>
          <th>Starting Date</th>
          <th>Ending Date</th>
        </tr>
        <tr v-for="auction in auctions">
          <td>{{ auction.categoryTitle }}</td>
          <td>{{ auction.title }}</td>
          <td>{{ auction.description }}</td>
          <td>{{ auction.reservePrice }}</td>
          <td>{{ new Date(auction.startDateTime).toLocaleDateString() }}</td>
          <td>{{ new Date(auction.endDateTime).toLocaleDateString() }}</td>
        </tr>
      </table>

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
</style>
