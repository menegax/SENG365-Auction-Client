<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <div align="center" style="margin-bottom: 10px">
      <h1><font size="6">Search auctions</font></h1>
      <form>
        <input v-model="searchAuctions" placeholder="Search" align="center"/>
        <input class="btn btn-secondary btn"type="submit" value="Search" style="background-color: rgba(128, 128, 128, 0.65); color: WHITE"/>
      </form>
      <br>
    </div>

    <div class="d-flex" style="margin-bottom: 10px">
      <button id="all" type="button" class="btn-secondary btn">All</button>
      <button id="active" type="button" class="btn-secondary btn">Active</button>
      <button id="expired" type="button" class="btn-secondary btn">Expired</button>
      <button id="upcoming" type="button" class="btn-secondary btn">Upcoming</button>
    </div>

    <div id="equipment">
      <div v-for="auction in auctions">
        <div v-if="auction.categoryId === 2" id="auctionsEquipment">
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
</script>

<style>
  #auctionsEquipment {
    float: left;
    background-color: rgba(128, 128, 128, 0.5);
    height: 200px;
    width: 1164px;
    margin-bottom: 10px;
  }

</style>
