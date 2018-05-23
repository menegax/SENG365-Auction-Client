<template>
    <div id="auction">
      <h1>
        <router-link :to="{ name: 'active' }" style="color:WHITE"><font size="6">Back to auctions</font></router-link>
      </h1>
      <br />

      <div v-if="errorFlagBid" style="color: red;">
        Invalid bid, your bid must increase current bid
      </div>

      <button id="bid" type="button" class="btn btn-secondary btn" data-toggle="modal" data-target="#createBidModal">Bid on this auction</button>
      <br /><br />

      <div>
        <div class="modal fade" id="createBidModal" tabindex="-1" role="dialog" aria-labelledby="createBidModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="createBidModalLabel" v-for="auction in auctions"><font size="5">{{ "Bid on auction: " + auction.title }}</font></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label col-sm-3">Amount:</label>
                    <div class="col-sm-9">
                      <input class="col-lg-10" id="amount" v-model="amount">
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="createBid()">
                  Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="imageAndText" v-for="auction in auctions">

          <br />
          <p style="float:left; margin-left: 20px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + $route.params.auctionId + '/photos'" width="400px" height="400px"></p>
          <br />

          <div id="text">
            <p><font size="5">{{ "Category title: " + auction.categoryTitle }}</font></p>
            <p><router-link :to="{ name: 'otherUser', params: { userId: auction.seller.id } }" style="color:WHITE"><font size="5">{{ "Auction seller: " + auction.seller.username }}</font></router-link></p>
            <p><font size="5">{{ "Auction title: " + auction.title }}</font></p>
            <p><font size="5">{{ "Description: " + auction.description }}</font></p>
            <p><font size="5">{{ "Auction starting date time: " + new Date(auction.startDateTime).toLocaleDateString() + " " + new Date(auction.startDateTime).toLocaleTimeString() }}</font></p>
            <p><font size="5">{{ "Auction ending date time: " + new Date(auction.endDateTime).toLocaleDateString() + " " + new Date(auction.endDateTime).toLocaleTimeString() }}</font></p>
            <p><font size="5">{{ "Reserve price: $" + auction.reservePrice }}</font></p>
            <p><font size="5">{{ "Current bid: $" + auction.currentBid }}</font></p>
          </div>
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
        errorFlagBid: false,
        auctions: [],
        bids: [],
        amount: "",
        token: localStorage.getItem("token"),
        sellerId: 0
      }
    },
    mounted: function() {
      this.getAuction();
      this.getBids();
      this.initialise();
    },
    methods: {
      hide: function (element) {
        var x = document.getElementById(element);
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      },
      show: function(element) {
        this.hide(this.label);
        var z = document.getElementById(element);
        this.label = element;
        if (z.style.display === "block") {
          z.style.display = "none";
        } else {
          z.style.display = "inline";
        }
      },
      getAuction: function(){
        this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId).then(function(response){
          this.auctions = [response.data];
          if (localStorage.getItem("userId") === response.data.seller.id.toString()) {
            this.hide('bid');
          }
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getBids: function(){
        this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/bids').then(function(response){
          this.bids = response.data;
          this.bids.reverse();
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      createBid: function() {
        this.$http({method: 'post', url: 'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/bids?amount=' + this.amount, headers: { "X-Authorization": localStorage.getItem("token") } }).then(function(response){
          this.getBids();
          this.getAuction();
          this.errorFlagBid = false;
        }, function(error) {
          this.error = error;
          this.errorFlagBid = true;
        });
      },
      initialise: function() {
        if (localStorage.getItem("token") === undefined) {
          this.hide('bid');
        }
      }
    }
  }
</script>

<style>
  #imageAndText {
    background-color: rgba(255, 255, 255, 0.5);
    height: 440px;
    width: 1100px;
    margin: 0 auto 30px auto;
  }

  #bids {
    background-color: rgba(255, 255, 255, 0.5);
    width: 500px;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
  }

</style>
