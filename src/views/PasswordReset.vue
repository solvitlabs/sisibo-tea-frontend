<template>
  <div>
    <Navbar />
    <div class="grid-margin stretch-card" id="passwordreset-page">
      <div class="col d-flex justify-content-center">
        <div class="card w-50">
          <form class="forms-sample shadow" @submit.prevent="resetPassword">
            <div class="card-body">
              <h4>Reset Password</h4>
              <div class="form-group">
                <label for="firstPassword">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="firstPassword"
                  minlength="8"
                  required
                  v-model="firstPassword"
                />
              </div>
              <div class="form-group">
                <label for="secondPassword">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="secondPassword"
                  minlength="8"
                  required
                  v-model="secondPassword"
                />
              </div>
              <div class="text-danger mb-2" v-show="showPasswordError">
                Passwords don't match
              </div>
              <button type="submit" class="btn btn-success mr-2">
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import Navbar from "../layout/Navbar";
import FooterSection from "../layout/FooterSection";

export default {
  name: "password-reset",
  components: {
    Navbar,
    FooterSection,
  },
  data() {
    return {
      showPasswordError: false,
    };
  },
  methods: {
    getLogininfo() {
      const loginInfoStored = JSON.parse(localStorage.getItem("loginInfo"));
      return loginInfoStored == null ? 0 : loginInfoStored.logininfo;
    },
    resetPassword() {
      if (this.firstPassword != this.secondPassword) {
        this.showPasswordError = true;
      } else {
        var loginInfo = this.getLogininfo();
        fetch("http://localhost:3000/api/resetpassword", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: loginInfo.employeeId,
            token: loginInfo.id,
            password: this.secondPassword,
          }),
        }).then((response) => {
          if (response.status === 200) {
            this.$router.push("/");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
