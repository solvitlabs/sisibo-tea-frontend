<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm"
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
          <li>
            <a class="nav-link bg-white px-lg-3 mt-1" href="#top">Snapshots</a>
          </li>
          <li>
            <a class="nav-link bg-white px-lg-3 mt-1" href="#temperature"
              >Temperature</a
            >
          </li>
          <li>
            <a class="nav-link bg-white px-lg-3 mt-1" href="#humidity"
              >Humidity</a
            >
          </li>
          <li>
            <a class="nav-link bg-white px-lg-3 mt-1" href="#rgb">RGB</a>
          </li>
          <li>
            <button class="nav-link bg-white px-lg-3 mt-1 border-0" @click="sisiboReport()">
            Report
            </button>
          </li>
        </ul>
        <div class="link my-2 my-sm-0" type="submit" @click="logout()">
          Logout
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {bus} from '@/main'
export default {
  name: "navbar",
  data() {
    return {
      isSidebarCollapsed: true,
    };
  },
  methods: {
    sisiboReport(){
      bus.$emit('GenerateReport', false)
    },
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
