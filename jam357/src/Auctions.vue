<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <div align="center">
      <h1><font size="3">Search auctions</font></h1>
      <form>
        <input v-model="searchAuctions" placeholder="Search" align="center"/>
        <input type="submit" value="Search" style="background-color: rgba(128, 128, 128, 0.65)"/>
      </form>
      <br>
    </div>

    <div v-for="auction in auctions">
      <div id="auctions">
        <p align="right"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
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
        auction: null,
        searchAuctions: ""
      }
    },
    mounted: function() {
      this.getAuctions();
    },
    methods: {
      getAuctions: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions').then(function(response){
          this.auctions = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      }
    }
  }
</script>s

<style>
  #auctions {
    float: left;
    background-color: rgba(128, 128, 128, 0.5);
    height: 200px;
    width: 1164px;
    margin-bottom: 10px;
  }

</style>
