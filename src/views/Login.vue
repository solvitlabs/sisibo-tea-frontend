<template>
  <div>
    <Navbar />
    <div class="grid-margin stretch-card" id="login-page">
      <div class="col d-flex justify-content-center">
        <div class="card w-50">
          <form class="forms-sample shadow" @submit.prevent="login">
            <div class="card-body">
              <h4>Login</h4>
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  required
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <label for="firstPassword">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="firstPassword"
                  minlength="8"
                  required
                  v-model="password"
                />
              </div>
              <button type="submit" class="btn btn-success mr-2">Login</button>
              <button class="btn btn-light">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import "sweetalert2/dist/sweetalert2.min.css";
import Navbar from "../layout/Navbar";
import FooterSection from "../layout/FooterSection";

export default {
  name: "login",
  components: {
    Navbar,
    FooterSection,
  },
  data() {
    return {
      email: null,
      password: null,
      showPasswordError: false,
    };
  },
  mounted() {
    this.showEmailNotification();
  },
  methods: {
    showEmailNotification() {
      const emailNotificationStored = JSON.parse(
        localStorage.getItem("emailNotification")
      );
      var emailNotification =
        emailNotificationStored == null
          ? 0
          : emailNotificationStored.emailnotification;
      if (emailNotification === 1) {
        Swal.fire(
          "Verify Email",
          "To Login, verify your email address",
          "success"
        );
      }
    },
    login() {
      fetch("/api/tokens", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      }).then((response) => {
        if (response.status === 200) {
          localStorage.setItem(
            "loginInfo",
            JSON.stringify({ logininfo: response.body })
          );
          this.$router.push("/dashboard");
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
