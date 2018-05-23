<template>
    <div id="auction">
      <h1>
        <router-link :to="{ name: 'active' }" style="color:WHITE"><font size="6">Back to auctions</font></router-link>
      </h1>
      <br />

      <div v-if="errorFlagBid" style="color: red;">
        Invalid bid, your bid must increase current bid
      </div>

      <div v-if="errorFlagEdit" style="color: red;">
        Invalid edit fields
      </div>

      <div class="d-flex" id="navigation" style="margin-bottom: 30px">
        <button id="bid" type="button" class="btn btn-secondary btn" data-toggle="modal" data-target="#createBidModal">Bid on this auction</button>
        <button id="edit" type="button" class="btn btn-secondary btn" data-toggle="modal" data-target="#editAuctionModal">Edit</button>
      </div>


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

      <div>
        <div class="modal fade" id="editAuctionModal" tabindex="-1" role="dialog" aria-labelledby="editAuctionModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content" v-for="auction in auctions">
              <div class="modal-header">
                <h5 class="modal-title" id="editAuctionModalLabel"><font size="5">{{ "Edit auction: " +  auction.title }}</font></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label col-sm-3">Title:</label>
                    <div class="col-sm-9">
                      <input class="col-lg-10" id="title" placeholder="Enter Title" v-model="title">
                    </div>
                  </div>
                </form>
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label col-sm-3">Description:</label>
                    <div class="col-sm-9">
                      <input class="col-lg-10" id="description" placeholder="Enter description" v-model="description">
                    </div>
                  </div>
                </form>
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label col-sm-3">Start date:</label>
                    <div class="col-sm-9">
                      <input class="col-lg-10" type="datetime-local" id="startDate" v-model="startDate">
                    </div>
                  </div>
                </form>
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label col-sm-3">End date:</label>
                    <div class="col-sm-9">
                      <input class="col-lg-10" type="datetime-local" id="endDate" v-model="endDate">
                    </div>
                  </div>
                </form>
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label col-sm-3">Category:</label>
                    <div class="col-sm-9" style="width: 350px">
                      <select name="categoryIdEdit" id="categoryIdEdit" v-model="categoryy">
                        <option value="1" id="apparel" selected>1. Apparel</option>
                        <option value="2" id="equipment">2. Equipment</option>
                        <option value="3" id="vehicles">3. Vehicles</option>
                        <option value="4" id="property">4. Property</option>
                        <option value="5" id="other">5. Other</option>
                      </select>
                    </div>
                  </div>
                </form>
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label col-sm-3">Reserve price:</label>
                    <div class="col-sm-9">
                      <input class="col-lg-10" id="reservePrice" placeholder="Enter reserve price" v-model="reservePrice">
                    </div>
                  </div>
                </form>
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label col-sm-3">Starting bid:</label>
                    <div class="col-sm-9">
                      <input class="col-lg-10" id="startingBid" placeholder="Enter starting price" v-model="startingBid">
                    </div>
                  </div>
                </form>
                <form class="form-inline">
                  <div class="form-group">
                    <label for="postPhoto" class="control-label col-3">.png/.jpeg: </label>
                    <input class="form-control" type="file" id="postPhoto" style="width: 350px; margin-left: 25px; margin-right: 20px">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="editAuction()">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="bids.length>0" style="margin-bottom: 80px">
        <button data-toggle="collapse" data-target="#bids" class="btn btn-secondary btn">Previous Bids</button>
        <div id="bids" class="accordion-body collapse" v-for="bid in bids">
          <p><font size="5">{{ "Bid date: " + new Date(bid.datetime).toLocaleDateString() + " " + new Date(bid.datetime).toLocaleTimeString() }}</font></p>
          <p><router-link :to="{ name: 'otherUser', params: { userId: bid.buyerId } }" style="color:WHITE"><font size="5">{{ "Buyer username: " + bid.buyerUsername }}</font></router-link></p>
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
        errorFlagEdit: false,
        errorFlagBid: false,
        auctions: [],
        bids: [],
        amount: "",
        token: localStorage.getItem("token"),
        sellerId: 0,
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        categoryId: "",
        reservePrice: "0",
        startingBid: "0",
        categoryy: 2
      }
    },
    mounted: function() {
      this.initialGetAuction();
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
          this.title = response.data.title;
          this.description = response.data.description;
          this.reservePrice = (response.data.reservePrice).toString();
          this.startingBid = (response.data.startingBid).toString();
          this.categoryy = response.data.categoryId;
          this.startDate = new Date(response.data.startDateTime).toISOString().substr(0,16);
          this.endDate = new Date(response.data.endDateTime).toISOString().substr(0,16);
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      initialGetAuction: function(){
        this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId).then(function(response){
          this.auctions = [response.data];
          this.title = response.data.title;
          this.description = response.data.description;
          this.reservePrice = (response.data.reservePrice).toString();
          this.startingBid = (response.data.startingBid).toString();
          this.categoryy = response.data.categoryId;
          this.startDate = new Date(response.data.startDateTime).toISOString().substr(0,16);
          this.endDate = new Date(response.data.endDateTime).toISOString().substr(0,16);
          if (localStorage.getItem("userId") === response.data.seller.id.toString() || response.data.endDateTime < new Date()) {
            this.hide('bid');
          }
          if (localStorage.getItem("userId") !== response.data.seller.id.toString() || response.data.bids.length > 0 || response.data.startDateTime < new Date()) {
            console.log("woops");
            this.hide('edit');
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
      editAuction: function() {
        this.$http({method: 'patch', url: 'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId, headers: { 'X-Authorization': localStorage.getItem("token") }, body: JSON.stringify({
            categoryId: this.categoryy,
            title: this.title,
            description: this.description,
            startDateTime: new Date(this.startDate).getTime(),
            endDateTime: new Date(this.endDate).getTime(),
            reservePrice: parseInt(this.reservePrice),
            startingBid: parseInt(this.startingBid)
          })}).then(function(response){
          this.auctionId = response.data.id;
          if (document.getElementById("postPhoto").files[0] !== undefined) {
            this.deletePhoto();
          }
          this.getAuction();
        }, function(error) {
          this.error = error;
          this.errorFlagEdit = true;
        })
      },
      deletePhoto: function() {
        this.$http.delete('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/photos', { headers: {
          'X-Authorization': localStorage.getItem("token")
          } }).then(function(response){
          this.postAphoto();
        }, function(error) {
            this.error = error;
            this.errorFlag = true;
        })
      },
      postAphoto: function() {
        let files = document.getElementById("postPhoto").files;
        this.$http.post('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/photos', files[0], {
          headers: {
            'X-Authorization': localStorage.getItem("token"),
            'Content-type': files[0].type
          }
        }).then(function(response) {
          this.getAuction();
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        })
      },
      initialise: function() {
        if (localStorage.getItem("token") === undefined || localStorage.getItem("token") === null) {
          this.hide('bid');
        }
      }
    }
  }
</script>

<style>
  #imageAndText {
    font-family: "Lato", sans-serif;
    background-color: rgba(255, 255, 255, 0.5);
    height: 450px;
    width: 1400px;
    margin: 0 auto 30px auto;
    border-radius: 5px;
  }

  #bids {
    font-family: "Lato", sans-serif;
    background-color: rgba(255, 255, 255, 0.5);
    width: 500px;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 5px;
  }

  #categoryIdEdit {
    width: 350px;
    margin-right: 140px
  }

</style>
