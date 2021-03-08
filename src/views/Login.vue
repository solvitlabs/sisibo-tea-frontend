<template>
  <div>
    <Navbar />
    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <form class="forms-sample" @submit.prevent="login">
          <div class="card-body">
            <h4 class="card-title">Login</h4>
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
</template>

<script>
import Navbar from "../layout/Navbar";

export default {
  name: "login",
  components: {
    Navbar,
  },
  data() {
    return {
      email: null,
      password: null,
      showPasswordError: false,
    };
  },
  methods: {
    login() {
      fetch("http://localhost:3000/tokens", {
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
