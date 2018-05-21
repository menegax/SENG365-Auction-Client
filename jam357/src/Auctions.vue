<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <div align="center" style="margin-bottom: 10px">
      <h1><font size="6">Search auctions</font></h1>
      <form>
        <input v-model="searchAuctions" placeholder="Search" align="center"/>
        <!--<input class="btn btn-secondary btn"type="submit" value="Search" style="background-color: rgba(128, 128, 128, 0.65); color: WHITE"/>-->
      </form>
      <br>
    </div>

    <h1><font size="6">Auctions</font></h1>

    <div class="d-flex" style="margin-bottom: 10px">
      <div class="btn-group">
        <button type="button" class="btn btn-secondary btn dropdown-toggle" id="categories" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categories
        </button>
        <div class="dropdown-menu" aria-labelledby="categories" style="background-color: rgb(128,128,128)">
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'apparel', params: { category: '1' } }" style="color:white">Apparel</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'equipment', params: { category: '2' } }" style="color:white">Equipment</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'vehicle', params: { category: '3' } }" style="color:white">Vehicles</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'property', params: { category: '4' } }" style="color:white">Property</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'other', params: { category: '5' } }" style="color:white">Other</router-link></a>
        </div>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-secondary btn dropdown-toggle" id="status" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Status
        </button>
        <div class="dropdown-menu" aria-labelledby="status" style="background-color: rgb(128,128,128)">
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'allAuctions' }" style="color:white">All</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'active', params: { status: '1' } }" style="color:white">Active</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'expired', params: { status: '2' } }" style="color:white">Expired</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'upcoming', params: { status: '3' } }" style="color:white">Upcoming</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white" id="wonLink"><router-link :to="{ name: 'won', params: { status: '4' } }" style="color:white">Won</router-link></a>
        </div>
      </div>
    </div>

    <div v-if="$route.params.category === '1'">
      <div id="apparel">
        <div v-for="auction in auctions" v-if="auction.categoryId === 1" id="auctionsApparel">
          <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.category === '2'">
      <div id="equipment">
        <div v-for="auction in auctions">
          <div v-if="auction.categoryId === 2" id="auctionsEquipment">
            <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.category === '3'">
      <div id="vehicle">
        <div v-for="auction in auctions">
          <div v-if="auction.categoryId === 3" id="auctionsVehicle">
            <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.category === '4'">
      <div id="property">
        <div v-for="auction in auctions">
          <div v-if="auction.categoryId === 4" id="auctionsProperty">
            <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.category === '5'">
      <div id="other">
        <div v-for="auction in auctions">
          <div v-if="auction.categoryId === 5" id="auctionsOther">
            <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '1'">
      <div id="active">
        <div v-for="auction in auctions">
          <div v-if="auction.endDateTime >= new Date() && auction.startDateTime <= new Date()" id="auctionsActive">
            <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '2'">
      <div id="expired">
        <div v-for="auction in auctions">
          <div v-if="auction.endDateTime <= new Date()" id="auctionsExpired">
            <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '3'">
      <div id="upcoming">
        <div v-for="auction in auctions">
          <div v-if="auction.startDateTime >= new Date()" id="auctionsUpcoming">
            <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '4'">
      <div id="won">
        <div v-for="auction in auctions">
          <div v-if="auction.endDateTime <= new Date()" id="auctionsWon">
            <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div id="allAuctions">
        <!--<div v-if="searchAuctions === ''">-->
          <div id="auctions" v-for="auction in auctions">
            <p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        <!--</div>-->
        <!--<div v-else>-->
          <!--<div v-for="auction in auctions">-->
            <!--<div id="auctionsSearched" v-if="auction.title.toLowerCase().includes(searchauctions.toLowerCase())">-->
              <!--<p align="left"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
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
      this.hide("wonLink");
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
        var z = document.getElementById(element);
        if (z.style.display === "block") {
          z.style.display = "none";
        } else {
          z.style.display = "inline";
        }
      },
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
  #auctions, #auctionsApparel, #auctionsEquipment, #auctionsVehicle, #auctionsProperty, #auctionsOther, #auctionsActive,
  #auctionsExpired, #auctionsUpcoming, #auctionsWon, #auctionsSearched {
    float: left;
    background-color: rgba(128, 128, 128, 0.5);
    height: 200px;
    width: 1164px;
    margin-bottom: 10px;
  }

</style>
