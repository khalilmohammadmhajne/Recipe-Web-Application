<template>
  <div id="app">
    <nav id="nav">
      <!-- Logo and Navigation Links -->
      <div id="logo">
        <router-link :to="{ name: 'main' }" class="nav-link">Wasfa Recipes</router-link>
      </div>
      
      <!-- User Profile Section -->
      <div id="user">
        <span v-if="!$root.store.username">
          <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
          <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link> 
        </span>
        <span v-else>
          {{ $root.store.username }}
          <b-dropdown id="dropdown-1" text="Profile" variant="info" class="profile-dropdown">
            <b-dropdown-item href="#/users/favorites">Saved Recipes</b-dropdown-item>
            <b-dropdown-item href="#/users/privates">Private Recipes</b-dropdown-item>
            <b-dropdown-item href="#/users/familyrecipes">Family Recipes</b-dropdown-item>
            <b-dropdown-item-button @click="Logout" class="logout-button">Logout</b-dropdown-item-button>
          </b-dropdown>
        </span>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      try {
        this.$root.store.logout();
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      } catch (error) {
        this.$root.toast("Error", "Logout failed. Please try again.", "danger");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/form-style.scss";

// General App Styles
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  background-color: #2c3e50;
  min-height: 100vh;
}

// Navbar Styles
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #35495e;
  padding: 15px 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

#logo {
  flex: 1;
  text-align: center;
}

#logo .nav-link {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

#logo .nav-link:hover {
  color: #42b983;
}

// Navigation Links Styles
.nav-link {
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
  padding: 10px;
  font-weight: 600;
  border-radius: 5px;
  transition: color 0.3s ease, background-color 0.3s ease;
  display: inline-flex;
  gap: 10px;
}

.nav-link:hover {
  color: #42b983;
  background-color: rgba(255, 255, 255, 0.1);
}

// User Section
#user {
  display: flex;
  align-items: left;
  gap: 15px;
}

.profile-dropdown {
  width: 10rem;
}
</style>
