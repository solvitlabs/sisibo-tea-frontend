<template>
  <div>
    <Navbar />
    <div class="grid-margin stretch-card" id="passwordreset-page">
      <div class="col d-flex justify-content-center">
        <div class="card w-50">
          <form class="forms-sample shadow" @submit.prevent>
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
};
</script>

<style scoped>
</style>
