<template>
  <div class="container">
    <!-- Search Bar Section -->
    <div
      id="SearhcBar"
      :class="{ blur: !$root.store.username }"
      style="text-align:center"
    >
      <input
        type="text"
        id="mysearch"
        placeholder="Find a Recipe"
        v-model="data"
        :disabled="!$root.store.username"
      />
      <button
        style="margin: 0"
        id="mybutton"
        @click="Search"
        :disabled="!$root.store.username"
      >
        Search
      </button>
      <br />
      <a
        href="#/search"
        :class="{ 'disabled-link': !$root.store.username }"
        :disabled="!$root.store.username"
      >
        Advanced Search
      </a>
    </div>

    <div class="sections">
      <!-- Explore Section -->
      <div v-if="$root.store.username" class="explore-section">
        <h3 class="section-title">Explore Recipes</h3>
        <RecipePreviewList title="Random Recipes" class="RandomRecipes" />
      </div>

      <!-- Last Watched Section -->
      <div v-if="$root.store.username" class="last-watched-section">
        <h3 class="section-title">Last Watched Recipes</h3>
        <RecipePreviewList title="Last Watched Recipes" />
      </div>

      <!-- Login Prompt Section (for unauthenticated users) -->
      <div v-if="!$root.store.username" class="login-section">
        <div class="box-overlay">
          <LoginPage class="login-window" />
        </div>
        <div>
          <RecipePreviewList title="Random Recipes" class="blur" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";

export default {
  components: {
    RecipePreviewList,
    LoginPage,
  },
  data() {
    return {
      data: "",
    };
  },
  methods: {
    Search() {
      this.$router.push({ name: "search", params: { query: this.data } });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-width: 100%;
  margin: 0;
  padding: 15px;
}

#SearhcBar {
  margin-left: 20%;
  margin-right: 30%;
  height: 3.75rem;
  margin-bottom: 3%;
  margin-top: 2%;
}

#mybutton {
  border: none;
  height: 3.4rem;
  background-color: red;
  margin: 0;
  color: white;
  font-size: 18px;
  letter-spacing: 0.1em;
  background-color: #66a992;
}

#mysearch {
  text-align: center;
  height: 3.5rem;
  width: 26rem;
  font-weight: bold;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

a {
  margin-right: 16px;
  color: rgb(245, 245, 245);
  font-weight: 900;
  font: bold 0.75rem/.75rem "Renner", sans-serif;
}

a:hover {
  color: white;
}


.last-watched-section {
  padding: 20px;
}

.explore-section {
  display: flex;
  flex-direction: column; /* Arrange children vertically */
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  padding: 2rem; /* Add some space around the content */
  text-align: center;
}


.section-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center; /* Ensures the heading itself is centered */
}

.login-section {
  position: relative;
  height: 100vh;
}

.box-overlay {
  width: 40%;
  height: 40%;
  position: absolute;
  top: 40%;
  left: 50%;
  margin-top: -25%;  /* Adjust half of the height to center vertically */
  margin-left: -20%; /* Adjust half of the width to center horizontally */
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  background: rgb(15, 15, 15);
}

.blur {
  -webkit-filter: blur(5px);
  filter: blur(4px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

#SearhcBar.blur {
  pointer-events: none;
}

#SearhcBar.blur input,
#SearhcBar.blur button {
  cursor: not-allowed;
}

#SearhcBar.blur a {
  pointer-events: none;
  cursor: not-allowed;
}

.disabled-link {
  pointer-events: none;
  cursor: not-allowed;
  color: grey;  /* Optional: You can change the link color when disabled */
}

/* Adjust layout for smaller screens */
@media only screen and (max-width: 768px) {
  #SearhcBar {
    margin-left: 10%;
    margin-right: 10%;
  }

  .container {
    padding: 10px;
  }
}
</style>
