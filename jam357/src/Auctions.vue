<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<template>

  <div>

    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <div align="center" style="margin-bottom: 10px">
      <h1><font size="6">Search auctions</font></h1>
      <form>
        <input v-model="searchAuctions" align="center"/>
        <router-link :to="{ name: 'searched', params: { status: '0' } }" @click.native="reset('10'); getAuctionsSearch()" style="color:WHITE"><font size="4">Search</font></router-link>
      </form>
      <br>
    </div>

    <div class="d-flex" style="margin-bottom: 10px">
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

    </div>




    <div class="d-flex" style="margin-bottom: 10px">
      <div class="btn-group">
        <button type="button" class="btn btn-secondary btn dropdown-toggle" id="categories" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categories
        </button>
        <div class="dropdown-menu" aria-labelledby="categories" style="background-color: rgb(128,128,128)">
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'apparel', params: { category: '1' } }" style="color:white" @click.native="reset('1'); show('apparelLabel')">Apparel</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'equipment', params: { category: '2' } }" style="color:white" @click.native="reset('2'); show('equipmentLabel')">Equipment</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'vehicle', params: { category: '3' } }" style="color:white" @click.native="reset('3'); show('vehicleLabel')">Vehicles</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'property', params: { category: '4' } }" style="color:white" @click.native="reset('4'); show('propertyLabel')">Property</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'other', params: { category: '5' } }" style="color:white" @click.native="reset('5'); show('otherLabel')">Other</router-link></a>
        </div>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-secondary btn dropdown-toggle" id="status" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Status
        </button>
        <div class="dropdown-menu" aria-labelledby="status" style="background-color: rgb(128,128,128)">
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'allAuctions', params: { status: '1' } }" style="color:white" @click.native="reset('8'); show('allLabel')">All</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'active' }" style="color:white" @click.native="reset('6'); show('activeLabel')">Active</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'expired', params: { status: '2' } }" style="color:white" @click.native="reset('7'); show('expiredLabel')">Expired</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'upcoming', params: { status: '3' } }" style="color:white" @click.native="reset('9'); show('upcomingLabel')">Upcoming</router-link></a>
        </div>
      </div>
      <div class="btn-group" id="myTrade365">
        <button type="button" class="btn btn-secondary btn dropdown-toggle" id="myTrade" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          MyTrade365
        </button>
        <div class="dropdown-menu dropdown-menu" aria-labelledby="myTrade" style="background-color: rgb(128,128,128)">
          <a class="dropdown-item" style="color: rgb(117, 57, 141)">Buying</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'inProgress', params: { status: '5', userId: this.userId } }" style="color:white" @click.native="reset('12'); getBidderAuctions()">In Progress,</router-link></a>
          <a class="dropdown-item" style="color: white" id="wonLink"><router-link :to="{ name: 'won', params: { status: '4' } }" style="color:white" @click.native="reset('11'); wonAuctions()"> Won</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: rgb(117, 57, 141)">Selling</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'seller' }" style="color:white" @click.native="getMyAuctions()">My Auctions</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: rgb(117, 57, 141)">Profiles</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'user', params: { userId: this.userId } }" style="color:white">My Profile</router-link></a>
        </div>
      </div>
    </div>

    <div v-if="$route.params.category === '1'">
      <div id="apparel">
        <div v-for="auction in auctionsCategories" v-if="auction.categoryId === 1" id="auctionsApparel">
          <br />
          <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
          <br />
          <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.category === '2'">
      <div id="equipment">
        <div v-for="auction in auctionsCategories">
          <div v-if="auction.categoryId === 2" id="auctionsEquipment">
            <br />
            <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
            <br />
            <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.category === '3'">
      <div id="vehicle">
        <div v-for="auction in auctionsCategories">
          <div v-if="auction.categoryId === 3" id="auctionsVehicle">
            <br />
            <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
            <br />
            <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.category === '4'">
      <div id="property">
        <div v-for="auction in auctionsCategories">
          <div v-if="auction.categoryId === 4" id="auctionsProperty">
            <br />
            <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
            <br />
            <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.category === '5'">
      <div id="other">
        <div v-for="auction in auctionsCategories">
          <div v-if="auction.categoryId === 5" id="auctionsOther">
            <br />
            <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
            <br />
            <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '0'">
      <div id="searched">
        <div v-for="auction in auctionsWithSearch" id="auctionsSearched">
          <br />
          <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
          <br />
          <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '1'">
      <div id="allAuctions">
        <div id="auctions" v-for="auction in auctions">
          <br />
          <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
          <br />
          <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '2'">
      <div id="expired">
        <div v-for="auction in expiredAuctions">
          <div v-if="auction.endDateTime <= new Date()" id="auctionsExpired">
            <br />
            <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
            <br />
            <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '3'">
      <div id="upcoming">
        <div v-for="auction in upcomingAuctions">
          <div v-if="auction.startDateTime >= new Date()" id="auctionsUpcoming">
            <br />
            <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
            <br />
            <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '4'">
      <div id="won">
        <div v-for="auction in auctionsWon">
          <div v-if="auction.endDateTime <= new Date()" id="auctionsWon">
            <br />
            <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
            <br />
            <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '5'">
      <div id="inProgress">
        <div v-for="auction in auctionsBidOn">
          <div v-if="auction.endDateTime >= new Date()" id="auctionsBid">
            <br />
            <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
            <br />
            <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="$route.params.status === '6'">
      <div id="seller">
        <div v-for="auction in auctionsMine" id="auctionsMine">
          <br />
          <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
          <br />
          <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
        </div>
      </div>
    </div>

    <div v-else>
      <div id="active">
        <div v-for="auction in activeAuctions">
          <div v-if="auction.endDateTime >= new Date() && auction.startDateTime <= new Date()" id="auctionsActive">
            <br />
            <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
            <br />
            <p><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
          </div>
        </div>
      </div>
    </div>

    <button id="pageback" type="button" class="btn btn-secondary btn" style="margin-bottom: 20px" v-on:click="back()">Back</button>
    <button id="pageNext" type="button" class="btn btn-secondary btn" style="margin-bottom: 20px" v-on:click="next()">Next</button>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        error: "",
        errorFlag: false,
        globalAuctions: [],
        auctions: [],
        activeAuctions: [],
        expiredAuctions: [],
        upcomingAuctions: [],
        auctionsWon: [],
        auctionsCategories: [],
        auctionsWithSearch: [],
        auctionsBidOn: [],
        auctionsMine: [],
        auction: null,
        searchAuctions: "",
        startIndex: 0,
        userId: localStorage.getItem("userId"),
        label: 'activeLabel',
        token: localStorage.getItem("token"),
        count: 3,
        currentId: "1"
      }
    },
    mounted: function() {
      this.getActiveAuctions();
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
      this.hide("myAuctionsLabel");
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
      getAuctions: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions').then(function(response){
          this.auctions = response.data.slice(this.startIndex, this.count);
          this.globalAuctions = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getActiveAuctions: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions?status=active').then(function(response){
          this.activeAuctions = response.data.slice(this.startIndex, this.count);
          this.globalAuctions = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getExpiredAuctions: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions?status=expired').then(function(response){
          console.log(response.data.length);
          this.expiredAuctions = response.data.slice(this.startIndex, this.count);
          this.globalAuctions = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getUpcomingAuctions: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions?status=upcoming').then(function(response){
          this.upcomingAuctions = response.data.slice(this.startIndex, this.count);
          this.globalAuctions = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getCategory: function(id) {
        this.$http.get('http://localhost:4941/api/v1/auctions?category-id='+id).then(function(response){
          this.auctionsCategories = response.data.slice(this.startIndex, this.count);
          this.globalAuctions = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      wonAuctions: function() {
        this.show("wonLabel");
        this.$http.get('http://localhost:4941/api/v1/my_won_auctions', {
          headers: {
            'X-Authorization': localStorage.getItem("token")
          }
        }).then(function(response){
          this.auctionsWon = response.data.slice(this.startIndex, this.count);
          this.globalAuctions = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getAuctionsSearch: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions?q=' + this.searchAuctions).then(function(response){
          this.globalAuctions = response.data;
          this.auctionsWithSearch = response.data.slice(this.startIndex, this.count);
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getBidderAuctions: function() {
        this.show("progressLabel");
        this.$http.get('http://localhost:4941/api/v1/auctions?bidder=' + this.userId).then(function(response){
          this.auctionsBidOn = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getMyAuctions: function() {
        this.show("progressLabel");
        this.$http.get('http://localhost:4941/api/v1/auctions?seller=' + this.userId).then(function(response){
          this.auctionsMine = response.data;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      initialise: function() {
        if (localStorage.getItem("token") == undefined) {
          this.hide('myTrade');
        }
      },
      next: function() {
        if (this.globalAuctions.length > this.count) {
          this.startIndex += 3;
          this.count += 3;
          if (this.currentId === '1' || this.currentId === '2' || this.currentId === '3' || this.currentId === '4' || this.currentId === '5') {
            this.getCategory(this.currentId);
          }
          if (this.currentId === '6') {this.getActiveAuctions();}
          if (this.currentId === '7') {this.getExpiredAuctions();}
          if (this.currentId === '8') {this.getAuctions();}
          if (this.currentId === '9') {this.getUpcomingAuctions();}
          if (this.currentId === '10') {
            this.getAuctionsSearch();
          }
          if (this.currentId === '11') {
            this.wonAuctions();
          }
          if (this.currentId === '12') {
            this.getBidderAuctions();
          }
        }
      },
      back: function() {
      this.startIndex -= 3;
      this.count -= 3;
        if (this.startIndex <= 0) {
          this.startIndex = 0;
          this.count = 3;
        }
        if (this.currentId === '1' || this.currentId === '2' || this.currentId === '3' || this.currentId === '4' || this.currentId === '5') {
          this.getCategory(this.currentId);
        }
        if (this.currentId === '6') {this.getActiveAuctions();}
        if (this.currentId === '7') {this.getExpiredAuctions();}
        if (this.currentId === '8') {this.getAuctions();}
        if (this.currentId === '9') {this.getUpcomingAuctions();}
        if (this.currentId === '10') {
          this.getAuctionsSearch();
        }
        if (this.currentId === '11') {
          this.wonAuctions();
        }
        if (this.currentId === '12') {
          this.getBidderAuctions();
        }
      },
      reset: function(id) {
        this.startIndex = 0;
        this.count = 3;
        this.currentId = id;
        if (id === '1' || id === '2' || id === '3' || id === '4' || id === '5') {
          this.getCategory(id)
        } else if (id === '6') {
          this.getActiveAuctions();
        } else if (id === '7') {
          this.getExpiredAuctions();
        } else if (id === '8') {
          this.getAuctions();
        } else if (id === '9') {
          this.getUpcomingAuctions();
        } else if (id === '10') {
          this.getAuctionsSearch();
        } else if (id === '11') {
          this.wonAuctions();
        } else if (id === '12') {
          this.getBidderAuctions();
        }
      }
    }
  }
</script>

<style>
  #auctions, #auctionsApparel, #auctionsEquipment, #auctionsVehicle, #auctionsProperty, #auctionsOther, #auctionsActive,
  #auctionsExpired, #auctionsUpcoming, #auctionsWon, #auctionsSearched, #auctionsBid, #auctionsMine {
    background-color: rgba(255, 255, 255, 0.5);
    height: 240px;
    width: 1405px;
    margin: auto auto 20px auto;
    font-family: "Lato", sans-serif;
    border-radius: 5px;
  }

  #auctions:hover, #auctionsApparel:hover, #auctionsEquipment:hover, #auctionsVehicle:hover, #auctionsProperty:hover,
  #auctionsOther:hover, #auctionsActive:hover, #auctionsExpired:hover, #auctionsUpcoming:hover, #auctionsWon:hover,
  #auctionsSearched:hover, #auctionsBid:hover, #auctionsMine:hover {
    box-shadow: 0 8px 16px 0 rgba(133, 133, 133, 0.37);
  }
</style>
