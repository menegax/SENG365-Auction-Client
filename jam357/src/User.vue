<template>
  <div>
    <h1>Display all users</h1>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <div v-if="$route.params.userId">
      <div id="user">
        <router-link :to="{ name: 'users' }">Back to Users</router-link>

        <br /><br />

        <table>
          <tr>
            <td>User ID</td>
          </tr>
          <tr>
            <td>{{ $route.params.userId }}</td>
          </tr>
        </table>

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
        this.$http.get('http://localhost:4941/api/v1/users/' + this.$route.params.auctionId).then(function(response){
          this.auctions = [response.data];
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      }
    }
  }
</script>
