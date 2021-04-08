<template>
  <div>
    <Navbar />
    <div class="grid-margin stretch-card" id="signup-page">
      <div class="col d-flex justify-content-center">
        <div class="card w-50">
          <form class="forms-sample shadow" @submit.prevent="signUp">
            <div class="card-body">
              <h4>Sign up</h4>
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
                Sign Up
              </button>
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
import Navbar from "../layout/Navbar";
import FooterSection from "../layout/FooterSection";

export default {
  name: "sign-up",
  components: {
    Navbar,
    FooterSection,
  },
  data() {
    return {
      email: null,
      firstPassword: null,
      secondPassword: null,
      showPasswordError: false,
    };
  },
  methods: {
    signUp() {
      if (this.firstPassword != this.secondPassword) {
        this.showPasswordError = true;
      } else {
        fetch("http://localhost:3000/api/users", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
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
