<template>
  <div>
    <Navbar />
    <div class="grid-margin stretch-card" id="forgotpassword-page">
      <div class="col d-flex justify-content-center">
        <div class="card w-50">
          <form class="forms-sample shadow" @submit.prevent="forgotPassword">
            <div class="card-body">
              <h4>Forgot Password</h4>
              <div class="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  class="form-control"
                  required
                  v-model="email"
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
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import "sweetalert2/dist/sweetalert2.min.css";
import Navbar from "../layout/Navbar";
import FooterSection from "../layout/FooterSection";

export default {
  name: "forgot-password",
  components: {
    Navbar,
    FooterSection,
  },
  methods: {
    forgotPassword() {
      if (email != null) {
        fetch("http://localhost:3000/api/users", {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
          }),
        }).then((response) => {
          if (response.status === 200) {
            Swal.fire(
              "Check Email",
              "To Reset Password, check your email address for a link",
              "success"
            );
          }
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
