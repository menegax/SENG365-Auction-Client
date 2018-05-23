<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="errorFlag" style="color: red;"><font size="5">
      Please log in, go back to the home page and then try view profile again
    </font>
    </div>

    <div v-if="$route.params.userId === this.userId">
      <div id="user" v-for="user in users">
        <br>

        <p><font size="5">{{ "Username: " + user.username }}</font></p>
        <p><font size="5">{{ "Given Name: " + user.givenName }}</font></p>
        <p><font size="5">{{ "Family Name: " + user.familyName }}</font></p>
        <p><font size="5">{{ "Email: " + user.email }}</font></p>
        <p><font size="5">{{ "Account Balance: $" + user.accountBalance }}</font></p>

        <button id="edit" type="button" class="btn btn-secondary btn-lg" data-toggle="modal" data-target="#editUserModal"
                style="background-color: rgba(255, 255, 255, 0)"><font size="6">Edit User</font></button>
      </div>
    </div>

    <div v-else>
      <div id="otherUser" v-for="user in users">
        <p><font size="5">{{ "Username: " + user.username }}</font></p>
        <p><font size="5">{{ "Given Name: " + user.givenName }}</font></p>
        <p><font size="5">{{ "Family Name: " + user.familyName }}</font></p>
      </div>
    </div>

    <div>
      <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editUserModalLabel"><font size="5">Login</font></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-sm-2">Given Name:</label>
                  <div class="col-sm-9">
                    <input v-model="editGivenName" class="col-lg-10">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Family Name:</label>
                  <div class="col-sm-9">
                    <input v-model="editFamilyName" class="col-lg-10">
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="getUser()">
                Close
              </button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="editUser()">
                Edit
              </button>
            </div>
          </div>
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
        users: [],
        editGivenName: "",
        editFamilyName: "",
        userId: localStorage.getItem('userId')
      }
    },
    mounted: function() {
      this.getUser();
    },
    methods: {
      getUser: function(){
        console.log(localStorage.getItem("userId"));
        this.$http({method: "get", url:'http://localhost:4941/api/v1/users/' + this.$route.params.userId, headers: { "X-Authorization": localStorage.getItem("token") } }).then(function(response){
          this.users = [response.data];
          this.editGivenName = response.data.givenName;
          this.editFamilyName = response.data.familyName;
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        });
      },
      editUser:function(){
        this.$http({method: "patch", url:'http://localhost:4941/api/v1/users/' + this.$route.params.userId, headers: { "X-Authorization": localStorage.getItem("token") }, body: JSON.stringify({
          givenName: this.editGivenName,
          familyName: this.editFamilyName
        })}).then(function(response){
          this.getUser();
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        })
      }
    }
  }
</script>

<style>
  #user {
    background-color: rgba(128, 128, 128, 0.5);
    height: 310px;
    width: 1164px;
    margin: 0 auto 30px auto;
    border-radius: 5px;
  }

  #otherUser {
    background-color: rgba(128, 128, 128, 0.5);
    width: 500px;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 5px;
  }
</style>
