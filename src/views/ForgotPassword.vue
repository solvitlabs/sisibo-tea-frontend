<template>
  <div class="grid-margin stretch-card" id="reset">
    <div class="col d-flex justify-content-center">
      <form class="forms-sample shadow" @submit.prevent>
        <div class="card-body">
          <h3>Forgot Password</h3>
            <div class="form-group">
              <label>Email address</label>
              <input type="email" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-success mr-2">Reset password</button>
        </div>
      </form>
    </div>


  </div>
</template>

<script>
export default {
    name: "password-reset"
};
</script>

<style scoped>
</style>
