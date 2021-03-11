<template>
  <div>
    <nav class="navbar navbar-light bg-white shadow">
      <router-link class="navbar-brand" to="/">SISIBO TEA FACTORY</router-link>
      <button
        class="navbar-toggler collapsed"
        id="navbarBtn"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSidebar"
        aria-controls="navbarSidebar"
        aria-label="Toggle navigation"
        @click="toggleSidebar()"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarSidebar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/signup">Sign Up</router-link>
            <router-link class="nav-link" to="/">Login</router-link>
            <router-link class="nav-link" to="/dashboard"
              >Dashboard</router-link
            >
          </li>
        </ul>
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
  },
};
</script>

<style scoped>
</style>
