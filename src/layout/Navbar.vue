<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm"
    >
      <router-link class="navbar-brand" to="/">SISIBO TEA FACTORY</router-link>
      <button
        class="navbar-toggler"
        id="navbarBtn"
        @click="toggleSidebar()"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSidebar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link bg-light px-lg-3 mt-1" href="#top">captures</a>
          </li>
          <li class="nav-item">
            <a class="nav-link bg-light px-lg-3 mt-1" href="#temperature"
              >temperature</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link bg-light px-lg-3 mt-1" href="#humidity"
              >humidity</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link bg-light px-lg-3 mt-1" href="#rgb">rgb</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" @submit.prevent="logout()">
          <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">
            Logout
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      isSidebarCollapsed: true,
    };
  },
  methods: {
    toggleSidebar() {
      if (this.isSidebarCollapsed) {
        document.querySelector("#navbarSidebar").classList.add("show");
        document.querySelector("#navbarBtn").classList.remove("collapsed");
        this.isSidebarCollapsed = false;
      } else {
        document.querySelector("#navbarSidebar").classList.remove("show");
        document.querySelector("#navbarBtn").classList.add("collapsed");
        this.isSidebarCollapsed = true;
      }
    },
    logout() {
      let token = JSON.parse(localStorage.getItem("loginInfo"));
      token = token.logininfo;
      token = token.id;
      fetch(`http://localhost:3000/api/tokens/${token}`, {
        method: "delete",
      })
        .then((response) => {
          console.log("session terminated", response.status);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped>
</style>
