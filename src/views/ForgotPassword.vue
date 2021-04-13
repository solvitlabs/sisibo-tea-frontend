<template>
  <div>
    <Navbar />
    <div class="grid-margin stretch-card" id="forgotpassword-page">
      <div class="col d-flex justify-content-center">
        <div class="card w-50">
          <form class="forms-sample shadow" @submit.prevent>
            <div class="card-body">
              <h4>Forgot Password</h4>
              <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" />
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
  name: "forgot-password",
  components: {
    Navbar,
    FooterSection,
  },
};
</script>

<style scoped>
</style>
