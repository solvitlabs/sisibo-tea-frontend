<template>
  <div>
    <div class="grid-margin stretch-card" id="login-page">
      <div class="col d-flex justify-content-center">
        <div class="card w-50">
          <form class="forms-sample shadow" @submit.prevent="login">
            <div class="text-white bg-danger w-full text-center">
              {{ error }}
            </div>
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
              <div class="form-group">
                <button type="submit" class="btn btn-success mr-2">
                  Login
                </button>
                <button class="btn btn-light">Cancel</button>
              </div>
              <div class="form-group">
                <div>
                  <router-link class="link" to="/signup">
                    Create new account
                  </router-link>
                </div>
                <div>
                  <router-link class="link" to="/forgotpassword">
                    Forgot your password?
                  </router-link>
                </div>
              </div>
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
import FooterSection from "../layout/FooterSection";

export default {
  name: "login",
  components: {
    FooterSection,
  },
  data() {
    return {
      error: "",
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
        localStorage.setItem("emailNotification", null)
      }
    },
    login() {
      fetch("http://localhost:3000/api/tokens", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const error = data;
          data =
            typeof data === "object" && data.employeeId && data.id
              ? data
              : false;
          if (data) {
            localStorage.setItem(
              "loginInfo",
              JSON.stringify({ logininfo: data })
            );
            this.$router.push("/dashboard");
          } else {
            throw error || "check your network then try again";
          }
        })
        .catch((err) => {
          this.error = err.Error || "check your network then try again";
        });
    },
  },
};
</script>

<style scoped>
</style>
