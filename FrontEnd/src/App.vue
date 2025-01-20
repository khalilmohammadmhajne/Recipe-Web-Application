<template>
  <div id="app">
    <nav id="nav">
      <div id="username">
          <h3>Hi {{ $root.store.username }}</h3>
      </div>

      <!-- Logo and Navigation Links -->
      <div id="logo">
        <router-link :to="{ name: 'main' }" class="nav-link" id="logo">Wasfa Recipes</router-link>
      </div>
      
      <!-- User Profile Section -->
      <div id="user">
        <span v-if="!$root.store.username">
          <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
          <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link> 
        </span>
        <span v-else>
          
          <b-dropdown text="Profile" class="profile-dropdown">
            <b-dropdown-item href="#/users/favorites">Saved Recipes</b-dropdown-item>
            <b-dropdown-item href="#/users/privates">Private Recipes</b-dropdown-item>
            <b-dropdown-item href="#/users/familyrecipes">Family Recipes</b-dropdown-item>
            <b-dropdown-item-button @click="Logout">Logout</b-dropdown-item-button>
          </b-dropdown>
        </span>
      </div>
    </nav>
    <router-view />
    <footer id="footer">
      <div class="footer-links">
        <router-link :to="{ name: 'about-us' }" class="footer-link">About Us</router-link>
        <router-link :to="{ name: 'contact' }" class="footer-link">Contact</router-link>
        <router-link :to="{ name: 'privacy-policy' }" class="footer-link">Privacy Policy</router-link>
      </div>
    </footer>
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
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* This ensures footer stays at the bottom */
}

// Navbar Styles
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #898e94;
  padding: 10px 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

#logo {
  flex: 1;
  text-align: center;
}

#username {
  font-size: 24px;
  font-weight: bold;
  color: #041952;
  text-decoration: none;
  transition: color 0.3s ease;
}

#logo .nav-link {
  font-size: 24px;
  font-weight: bold;
  color: #041952;
  text-decoration: none;
  transition: color 0.3s ease;
}

#logo .nav-link:hover {
  color: #fdfdfd;
}

// Navigation Links Styles
.nav-link {
  font-size: 16px;
  color: #041952;
  text-decoration: none;
  padding: 10px;
  font-weight: 600;
  border-radius: 5px;
  transition: color 0.3s ease, background-color 0.3s ease;
  display: inline-flex;
}

.nav-link:hover {
  color: #ffffff;
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
  color: #041952;
}

/* Footer Styles */
#footer {
  background-color: #898e94;
  padding: 15px 30px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  margin-top: auto; /* Push the footer to the bottom */
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-link {
  font-size: 16px;
  color: #041952;
  text-decoration: none;
  padding: 10px;
  font-weight: 600;
  border-radius: 5px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.footer-link:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>

