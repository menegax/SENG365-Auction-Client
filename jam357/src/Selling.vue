<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      <h3>Sorry your fields you entered were invalid</h3>
    </div>

    <div v-if="errorFlagCreate" style="color: red;">
      <h3>Sorry your fields you entered were invalid</h3>
    </div>

    <div v-if="errorFlagPostPhoto" style="color: red;">
      <h3>Please attempt to upload a .png or .jpeg</h3>
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

      <p style="color:WHITE" id="progressLabel"><font size="6">My auctions in progress</font></p>
      <p style="color:WHITE" id="wonLabel"><font size="6">My auctions won</font></p>
      <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'seller' }" style="color:white" @click.native="getMyAuctions()"><font size="7">My auctions</font></router-link></a>

    <div class="d-flex" style="margin-bottom: 10px; margin-left: 255px">
      <div class="btn-group pull-left" id="filterSelling">
        <button type="button" class="btn btn-secondary btn-lg dropdown-toggle" id="filter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Filter
        </button>
        <div id="dropdown" class="dropdown-menu dropdown-menu" aria-labelledby="filter" style="background-color: rgb(128,128,128)">
          <input class="form-check-input" type="radio" value="" id="expired" @click="check()" name="radio">
          <label class="form-check-label" for="expired">
            Expired auctions without a winner
          </label>
          <br>
          <input class="form-check-input" type="radio" value="" id="winner" @click="check()" name="radio">
          <label class="form-check-label" for="winner">
            Auctions with a winner
          </label>
          <br>
          <input class="form-check-input" type="radio" value="" id="inProgress" @click="check()" name="radio">
          <label class="form-check-label" for="inProgress">
            Auctions still in progress
          </label>
        </div>
      </div>

      <button id="bid" type="button" class="btn btn-secondary btn-lg pull-right" data-toggle="modal" data-target="#createAuctionModal" style="margin-right: 255px">+</button>
      <br />
      <br />
    </div>

    <div>
      <div class="modal fade" id="createAuctionModal" tabindex="-1" role="dialog" aria-labelledby="createAuctionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createAuctionModalLabel"><font size="5">Create new auction</font></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-3">Auction title:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" id="title" placeholder="Enter Title" v-model="title">
                  </div>
                </div>
              </form>
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-3">Auction description:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" id="description" placeholder="Enter description" v-model="description">
                  </div>
                </div>
              </form>
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-3">Auction start date:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" type="datetime-local" id="startDate" v-model="startDate">
                  </div>
                </div>
              </form>
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-3">Auction end date:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" type="datetime-local" id="endDate" v-model="endDate">
                  </div>
                </div>
              </form>
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-3">Auction category:</label>
                  <div class="col-sm-9">
                    <select name="categoryId" id="categoryId">
                      <option value="1">1. Apparel</option>
                      <option value="2">2. Equipment</option>
                      <option value="3">3. Vehicles</option>
                      <option value="4">4. Property</option>
                      <option value="5">5. Other</option>
                    </select>
                  </div>
                </div>
              </form>
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-3">Auction reserve price:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" id="reservePrice" placeholder="Enter reserve price" v-model="reservePrice">
                  </div>
                </div>
              </form>
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-3">Auction starting bid:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" id="startingBid" placeholder="Enter starting price" v-model="startingBid">
                  </div>
                </div>
              </form>
              <form class="form-inline">
                <div class="form-group">
                  <label for="postPhoto" class="control-label col-3">Choose .png or .jpeg file: </label>
                  <input class="form-control" type="file" id="postPhoto" style="width: 540px; margin-left: 25px; margin-right: 80px">
                </div>
              </form>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="createAuction()">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="seller">
      <div v-for="auction in auctionsMine">
        <div id="auctionsMine">
          <br />
          <p style="float:left; margin-left: 10px"><img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos'" width="200px" height="200px"></p>
          <br />
          <p style="margin-top: 50px"><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}" style="color:white"><font size="5">{{ auction.title }}</font></router-link></p>
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
        errorFlagCreate: false,
        errorFlagPostPhoto: false,
        auctionsMine: [],
        userId: localStorage.getItem("userId"),
        label: localStorage.getItem("label"),
        token: localStorage.getItem("token"),
        title: "",
        description: "",
        startDate: new Date().toISOString().substr(0,16),
        endDate: new Date().toISOString().substr(0,16),
        categoryId: "",
        reservePrice: "0",
        startingBid: "0",
        auctionId: 0,
        startIndex: 0,
        count: 3,
        currentId: '0',
        globalAuctions: []
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
          document.getElementById("inProgress").checked = false;
          document.getElementById("winner").checked = false;
          document.getElementById("expired").checked = false;
          this.globalAuctions = response.data;
          this.auctionsMine = response.data.slice(this.startIndex, this.count);
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getMyAuctionsExpired: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions?status=expired&seller=' + this.userId).then(function(response){
          this.auctionsMine = [];
          this.globalAuctions = response.data;
          this.auctionsMine = response.data.slice(this.startIndex, this.count);        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getMyAuctionsOnlyWon: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions?status=won&seller=' + this.userId).then(function(response){
          this.auctionsMine = [];
          this.globalAuctions = response.data;
          this.auctionsMine = response.data.slice(this.startIndex, this.count);        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getMyAuctionsInProgress: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions?status=active&seller=' + this.userId).then(function(response){
          this.auctionsMine = [];
          this.globalAuctions = response.data;
          this.auctionsMine = response.data.slice(this.startIndex, this.count);        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      createAuction: function(){
        this.$http({method: 'post', url: 'http://localhost:4941/api/v1/auctions', headers: { 'X-Authorization': localStorage.getItem("token") }, body: JSON.stringify({
          categoryId: parseInt(document.getElementById("categoryId").options[document.getElementById("categoryId").selectedIndex].value),
          title: this.title,
          description: this.description,
          startDateTime: new Date(this.startDate).getTime(),
          endDateTime: new Date(this.endDate).getTime(),
          reservePrice: parseInt(this.reservePrice),
          startingBid: parseInt(this.startingBid)
        })}).then(function(response){
          this.auctionId = response.data.id;
          if (document.getElementById("postPhoto").files[0] !== undefined) {
            this.postAphoto();
          }
          this.errorFlagCreate = false;
          this.errorFlag = false;
          this.errorFlagPostPhoto = false;
        }, function(error) {
          this.error = error;
          this.errorFlagCreate = true;
          this.errorFlag = false;
          this.errorFlagPostPhoto = false;
        })
      },
      postAphoto: function() {
        let files = document.getElementById("postPhoto").files;
        this.$http.post('http://localhost:4941/api/v1/auctions/' + this.auctionId + '/photos', files[0], {
          headers: {
          'X-Authorization': localStorage.getItem("token"),
          'Content-type': files[0].type
          }
        }).then(function(response) {
          this.errorFlagCreate = false;
          this.errorFlag = false;
          this.errorFlagPostPhoto = false;
        }, function(error) {
          this.error = error;
          this.errorFlagPostPhoto = true;
          this.errorFlag = false;
          this.errorFlagCreate = false;
        })
      },
      check: function() {
        this.startIndex = 0;
        this.count = 3;
        if (document.getElementById("winner").checked) {
          this.getMyAuctionsOnlyWon();
          this.currentId = '3';
        }
        else if (document.getElementById("expired").checked) {
          this.getMyAuctionsExpired();
          this.currentId = '2';
        } else if (document.getElementById("inProgress").checked) {
          this.currentId = '1';
          this.getMyAuctionsInProgress();
        } else {
          this.currentId = '0';
          this.getMyAuctions();
        }
      },
      next: function() {
        if (this.globalAuctions.length > this.count) {
          this.startIndex += 3;
          this.count += 3;
          console.log(this.startIndex);
          console.log(this.count);
          console.log(this.currentId);
          if (this.currentId === '0') {
            this.getMyAuctions();
          } else if (this.currentId === '1') {
            this.getMyAuctionsInProgress();
          } else if (this.currentId === '2') {
            this.getMyAuctionsExpired();
          } else if (this.currentId === '3') {
            this.getMyAuctionsOnlyWon();
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
        console.log(this.startIndex);
        console.log(this.count);
        if (this.currentId === '0') {
          this.getMyAuctions();
        } else if (this.curentId === '1') {
          this.getMyAuctionsInProgress();
        } else if (this.curentId === '2') {
          this.getMyAuctionsExpired();
        } else if (this.curentId === '3') {
          this.getMyAuctionsOnlyWon();
        }
      }
    }
  }
</script>

<style>
  #auctionsMine {
    background-color: rgba(255, 255, 255, 0.5);
    height: 240px;
    width: 1405px;
    margin: auto auto 20px auto;
    border-radius: 5px;
  }

  #auctionsMine:hover{
    box-shadow: 0 8px 16px 0 rgba(133, 133, 133, 0.37);
  }

  #dropdown {
    width: 250px;
  }

  #categoryId {
    width: 535px;
    margin-right: 140px
  }

  /*.d-flex {*/
    /*margin: 0 auto 40px auto;*/
  /*}*/
</style>
