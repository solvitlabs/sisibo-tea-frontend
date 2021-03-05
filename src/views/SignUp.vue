<template>
  <div class="col-md-6 grid-margin stretch-card">
    <div class="card">
      <form class="forms-sample" @submit.prevent="signUp">
        <div class="card-body">
          <h4 class="card-title">Sign Up</h4>
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
          <button type="submit" class="btn btn-success mr-2">Sign Up</button>
          <button class="btn btn-light">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "sign-up",
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
        fetch("/api/users", {
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
            this.$router.push("/login");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
