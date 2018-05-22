<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

      <p style="color:WHITE" id="apparelLabel"><font size="6">Auction category: Apparel</font></p>
      <p style="color:WHITE" id="equipmentLabel"><font size="6">Auction category: Equipment</font></p>
      <p style="color:WHITE" id="vehicleLabel"><font size="6">Auction category: Vehicle</font></p>
      <p style="color:WHITE" id="propertyLabel"><font size="6">Auction category: Property</font></p>
      <p style="color:WHITE" id="otherLabel"><font size="6">Auction category: Other</font></p>

      <p style="color:WHITE" id="allLabel"><font size="6">All Auctions</font></p>
      <p style="color:WHITE" id="activeLabel"><font size="6">Active Auctions</font></p>
      <p style="color:WHITE" id="expiredLabel"><font size="6">Expired Auctions</font></p>
      <p style="color:WHITE" id="upcomingLabel"><font size="6">Upcoming Auctions</font></p>

      <p style="color:WHITE" id="progressLabel"><font size="6">Your auctions: In Progress</font></p>
      <p style="color:WHITE" id="wonLabel"><font size="6">Your auctions: Won</font></p>
      <p style="color:WHITE" id="myAuctionsLabel"><font size="6">Your Auctions: Selling</font></p>


    <div class="d-flex" style="margin-bottom: 10px">
      <router-link :to="{ name: 'seller'}" style="color:white"><font size="5">All</font></router-link>
      <router-link :to="{ name: 'seller'}" style="color:white"><font size="5">All</font></router-link>
    </div>

    <div id="seller">
      <div v-for="auction in auctionsMine">
        <div id="auctionsMine">
          <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
        </div>
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
        auctionsMine: [],
        userId: localStorage.getItem("userId"),
        label: localStorage.getItem("label"),
        token: localStorage.getItem("token"),
      }
    },
    mounted: function() {
      this.hide("apparelLabel");
      this.hide("equipmentLabel");
      this.hide("vehicleLabel");
      this.hide("propertyLabel");
      this.hide("otherLabel");
      this.hide("allLabel");
      this.hide("expiredLabel");
      this.hide("upcomingLabel");
      this.hide("progressLabel");
      this.hide("wonLabel");
      this.hide("activeLabel");
      this.getMyAuctions();
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
      getMyAuctions: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions?seller=' + this.userId).then(function(response){
          this.auctionsMine = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      }
    }
  }
</script>

<style>
  #auctionsMine {
    float: left;
    background-color: rgba(128, 128, 128, 0.5);
    height: 200px;
    width: 1164px;
    margin-bottom: 10px;
  }
</style>
