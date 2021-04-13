<template>
  <div>
    <Navbar />
    <div class="grid-margin stretch-card" id="reset">
      <div class="col d-flex justify-content-center">
        <form class="forms-sample shadow" @submit.prevent>
          <div class="card-body">
            <h3>Forgot Password</h3>
            <div class="form-group">
              <label>Email address</label>
              <input type="email" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-success mr-2">
              Reset password
            </button>
          </div>
        </form>
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
