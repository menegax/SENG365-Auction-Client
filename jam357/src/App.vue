<template>
  <div id="app">
    <ul>
      <img src="./assets/365logo.png" class="center" align="left">
      <li><router-link :to="{ name: 'active' }"><font size="4">Trade365</font></router-link></li>
      <li id="register"><a data-toggle="modal" data-target="#createUserModal"><font size="4">Register</font></a></li>
      <li id="login"><a data-toggle="modal" data-target="#loginUserModal"><font size="4">Login</font></a></li>
      <li id="logout"><a data-toggle="modal" data-target="#logoutUserModal"><font size="4">Logout</font></a></li>
    </ul>

    <div v-if="errorFlagLogin" style="color: red;">
      Incorrect user credentials
    </div>

    <div v-if="errorFlagLogout" style="color: red;">
      Failed to logout
    </div>
    <div v-if="errorFlagRegistration" style="color: red;">
      Invalid fields, could not register user
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
                    <input v-model="registrationGivenName" class="col-lg-10" placeholder="e.g. John">
                    <p class="text-warning" id="registrationGivenNameInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Family Name:</label>
                  <div class="col-sm-9">
                    <input v-model="registrationFamilyName" class="col-lg-10" placeholder="e.g. Bloggs">
                    <p class="text-warning" id="registrationFamilyNameInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Username:</label>
                  <div class="col-sm-9">
                    <input v-model="registrationUsername" class="col-lg-10" placeholder="e.g. abc123">
                    <p class="text-warning" id="registrationUsernameInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Email:</label>
                  <div class="col-sm-9">
                    <input v-model="registrationEmail" class="col-lg-10" placeholder="e.g. email@example.com" type="email">
                    <p class="text-warning" id="registrationEmailInvalid" align="center">*INVALID*</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Password:</label>
                  <div class="col-sm-9">
                    <input v-model="registrationPassword" class="col-lg-10" placeholder="Enter Password" type="password">
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
                  <label class="control-label col-sm-2">User/Email:</label>
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
        errorFlagRegistration: false,
        errorFlagLogin: false,
        errorFlagLogout: false,
        loggedIn: false,
        userId: "",
        token: "",
        username: "",
        email: "",
        password: "",
        registrationGivenName: "",
        registrationFamilyName: "",
        registrationUsername: "",
        registrationEmail: "",
        registrationPassword: ""
      }
    },
    mounted: function() {
      this.hide("registrationGivenNameInvalid");
      this.hide("registrationFamilyNameInvalid");
      this.hide("registrationUsernameInvalid");
      this.hide("registrationEmailInvalid");
      this.hide("registrationPasswordInvalid");
      this.hide("loginUsernameInvalid");
      this.hide("loginPasswordInvalid");
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
        var z = document.getElementById(element);
        if (z.style.display === "block") {
          z.style.display = "none";
        } else {
          z.style.display = "inline";
        }
      },
      register: function() {
        this.$http.post('http://localhost:4941/api/v1/users', JSON.stringify({
          username: this.registrationUsername,
          givenName: this.registrationGivenName,
          familyName: this.registrationFamilyName,
          email: this.registrationEmail,
          password: this.registrationPassword
        })).then(function(response){
          this.username = this.registrationUsername;
          this.password = this.registrationPassword;
          this.login();
          this.registrationUsername = "";
          this.registrationGivenName = "";
          this.registrationFamilyName = "";
          this.registrationEmail = "";
          this.registrationPassword = "";
        }, function(error) {
          this.error = error;
          this.errorFlagRegistration = true;
          this.errorFlag = false;
          this.errorFlagLogin = false;
          this.errorFlagLogout = false;
        });
      },
      login: function() {
        if (this.username.indexOf('@') > -1) {
          this.email = this.username;
          this.username = "";
        }
        this.$http.post('http://localhost:4941/api/v1/users/login', JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password
        })).then(function(response) {
          this.userId = response.data.id;
          this.hide("register");
          this.hide("login");
          this.show("logout");
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("token", response.data.token);
          this.token = response.data.token;
          this.username = "";
          this.password = "";
          this.email = "";
          this.reload();
        }, function(error) {
          this.error = error;
          this.errorFlagLogin = true;
          this.errorFlag = false;
          this.errorFlagLogout = false;
          this.errorFlagRegistration = false;
        });
      },
      logout: function() {
        this.hide("logout");
        this.show("register");
        this.show("login");
        this.$http({method: 'post', url: 'http://localhost:4941/api/v1/users/logout', headers: { "X-Authorization": localStorage.getItem("token") } }).then(function(response) {
          // localStorage.setItem("token", "0");
          localStorage.removeItem("token");
          localStorage.setItem("userId", "0");
          this.reload();
        }, function(error) {
          this.error = error;
          this.errorFlagLogout = true;
          this.errorFlag = false;
          this.errorFlagLogin = false;
          this.errorFlagRegistration = false;
        });
      },
      initialise: function() {
        // this.token = localStorage.getItem("token");
        // this.token.length <= 1
        if (localStorage.getItem("token") == undefined) {
          this.hide("logout");
          this.show("login");
          this.show("register");
        } else {
          this.show("logout");
          this.hide("login");
          this.hide("register");
        }
      },
      reload: function() {
        location.reload();
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
  }

  body {
    background-color: BLACK;
    font-family: "Lato", sans-serif;
  }

  h1, h2 {
    font-weight: normal;
    margin-right: auto;
    margin-left: auto;
    font-family: "Lato", sans-serif;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #767676;
    font-family: "Lato", sans-serif;
  }

  li {
    font-family: "Lato", sans-serif;
    float: left;
  }

  li a {
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-family: "Lato", sans-serif;
  }

  li a:hover {
    background-color: #111;
  }

  button {
    color: BLACK;
    font-family: "Lato", sans-serif;
  }

  input {
    color: rgb(81, 81, 81);
    font-family: "Lato", sans-serif;
  }

  .modal-header {
    background-color: rgba(128, 128, 128, 0.65);
    font-family: "Lato", sans-serif;
  }

  .modal-body {
    color: rgb(81, 81, 81);
    font-family: "Lato", sans-serif;
  }
</style>
