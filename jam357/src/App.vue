<template>
  <div id="app">
    <img src="./assets/365logo.png" class="center" align="left">
    <h1>
      <router-link :to="{ name: 'auctions' }" style="color:WHITE"><font size="7">Trade365</font></router-link>
    </h1>
    <br/>

    <div class="d-flex" id="navigation" style="margin-bottom: 30px">
      <div class="btn-group">
        <button type="button" class="btn btn-secondary btn-lg dropdown-toggle" id="categories" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categories
        </button>
        <div class="dropdown-menu" aria-labelledby="categories" style="background-color: rgb(128,128,128)">
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'apparel' }" style="color:white">Apparel</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'equipment' }" style="color:white">Equipment</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'vehicle' }" style="color:white">Vehicles</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'property' }" style="color:white">Property</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'other' }" style="color:white">Other</router-link></a>
        </div>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-secondary btn-lg dropdown-toggle" id="myTrade" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          MyTrade365
        </button>
        <div class="dropdown-menu dropdown-menu" aria-labelledby="myTrade" style="background-color: rgb(128,128,128)">
          <a class="dropdown-item" style="color: rgb(117, 57, 141)">Buying</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'auctions' }" style="color:white">Won</router-link></a>
          <a class="dropdown-item" style="color: white">, </a>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'auctions' }" style="color:white">In Progress</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: rgb(117, 57, 141)">Selling</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'auctions' }" style="color:white">My Auctions</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: rgb(117, 57, 141)">Profiles</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="color: white"><router-link :to="{ name: 'auctions' }" style="color:white">My Profile</router-link></a>
        </div>
      </div>

      <button id="register" type="button" class="btn btn-secondary btn-lg" data-toggle="modal" data-target="#createUserModal">Register</button>
      <button id="login" type="button" class="btn btn-secondary btn-lg" data-toggle="modal" data-target="#loginUserModal">Login</button>
      <button id="logout" type="button" class="btn btn-secondary btn-lg" data-toggle="modal" data-target="#logoutUserModal">Logout</button>
    </div>

    <div>
      <div class="modal fade" id="createUserModal" tabindex="-1" role="dialog" aria-labelledby="createUserModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createUserModalLabel"><font size="5">Register</font></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-2">Given Name:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" placeholder="e.g. John">
                    <p class="text-warning" id="registrationGivenNameInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Family Name:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" placeholder="e.g. Bloggs">
                    <p class="text-warning" id="registrationFamilyNameInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Username:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" placeholder="e.g. abc123">
                    <p class="text-warning" id="registrationUsernameInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Email:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" placeholder="e.g. email@example.com" type="email">
                    <p class="text-warning" id="registrationEmailInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Password:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" placeholder="Enter Password" type="password">
                    <p class="text-warning" id="registrationPasswordInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="register()">
                Register
              </button>
            </div>
          </div>
        </div>
    </div>

    <div>
      <div class="modal fade" id="loginUserModal" tabindex="-1" role="dialog" aria-labelledby="loginUserModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="loginUserModalLabel"><font size="5">Login</font></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-2">Username:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" id="username" v-model="username">
                    <p class="text-warning" id="loginUsernameInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Password:</label>
                  <div class="col-sm-9">
                    <input class="col-lg-10" type="password" id="password" v-model="password">
                    <p class="text-warning" id="loginPasswordInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="login()">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="modal fade" id="logoutUserModal" tabindex="-1" role="dialog" aria-labelledby="logoutUserModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="logoutUserModalLabel"><font size="5">Logout of session</font></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure that you want to log out?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="logout()">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        error: "",
        errorFlag: false,
        loggedIn: false,
        userId: 0,
        token: "",
        username: "",
        password: ""
      }
    },
    mounted: function() {
      this.hide("logout");
      this.hide("registrationGivenNameInvalid");
      this.hide("registrationFamilyNameInvalid");
      this.hide("registrationUsernameInvalid");
      this.hide("registrationEmailInvalid");
      this.hide("registrationPasswordInvalid");
      this.hide("loginUsernameInvalid");
      this.hide("loginPasswordInvalid");
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
      register: function() {
        this.$http.put('http://localhost:4941/api/v1/users').then(function(response){
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      login: function() {
        this.hide("register");
        this.hide("login");
        this.show("logout");
        this.$http.put('http://localhost:4941/api/v1/users/login', JSON.stringify({
          "username": this.username,
          "password": this.password
        })).then(function(response) {
          this.userId = response.data.id;
          this.token = response.data.token;
          this.username = "";
          this.password = "";
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      logout: function() {
        this.hide("logout");
        this.show("register");
        this.show("login");
        this.$http.put('http://localhost:4941/api/v1/users/logout').then(function(response) {
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #f8f8ff;
    /*margin-top: 60px;*/
  }

  body {
    margin-left: 250px;
    margin-right: 250px;
    background-color: rgb(117, 57, 141);
  }

  h1, h2 {
    font-weight: normal;
    margin-right: auto;
    margin-left: auto;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  table {
    padding: 700px;
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }

  th {
    background-color: #f8f8ff;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  tr:nth-child(odd) {
    background-color: #f8f8ff;
  }

  tr:hover {
    background-color: rgba(147, 112, 219, 0.44);
  }

  button {
    background-color: rgba(128, 128, 128, 0.65);
  }

  input {
    color: rgb(81, 81, 81);
  }

  .modal-header {
    background-color: rgba(128, 128, 128, 0.65);
  }

  .modal-body {
    color: rgb(81, 81, 81);
  }
</style>
