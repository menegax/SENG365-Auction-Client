<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <div v-if="$route.params.userId">
      <div id="user">

        <div id="userProfile" v-for="user in users">
          <p align="center"><router-link :to="{ name: 'allAuctions' }" style="color:white"><font size="5">{{ "Username: " + user.username }}</font></router-link></p>
          <p align="center"><router-link :to="{ name: 'allAuctions' }" style="color:white"><font size="5">{{ "Given Name: " + user.givenName }}</font></router-link></p>
          <p align="center"><router-link :to="{ name: 'allAuctions' }" style="color:white"><font size="5">{{ "Family Name: " + user.familyName }}</font></router-link></p>
          <p align="center"><router-link :to="{ name: 'allAuctions' }" style="color:white"><font size="5">{{ "Email: " + user.email }}</font></router-link></p>
          <p align="center"><router-link :to="{ name: 'allAuctions' }" style="color:white"><font size="5">{{ "Account Balance: " + user.accountBalance }}</font></router-link></p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        error: "",
        errorFlag: false,
        users: []
      }
    },
    mounted: function() {
      this.getUser();
    },
    methods: {
      getUser: function(){
        this.$http({method: "get", url:'http://localhost:4941/api/v1/users/' + this.$route.params.userId, headers: { "X-Authorization": localStorage.getItem("token") } }).then(function(response){
          this.users = [response.data];
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      }
    }
  }
</script>

<style>
  #user {
    float: left;
    background-color: rgba(128, 128, 128, 0.5);
    height: 220px;
    width: 1164px;
    margin-bottom: 10px;
  }
</style>
