<template>
  <div class="container">
    <!-- Search Bar Section -->
    <div id="SearhcBar" style="text-align:center">
      <input type="text" id="mysearch" placeholder="Find a Recipe" v-model="data" />
      <button style="margin: 0" id="mybutton" @click="Search">Search</button>
      <br />
      <a href="#/search">Advanced Search</a>
    </div>

    <div class="sections">
      <!-- Explore Section -->
      <div class="explore-section">
        <h3>Explore this Recipes</h3>
        <RecipePreviewList title="Random Recipes" class="RandomRecipes" />
      </div>

      <!-- Last Watched Section -->
      <div v-if="$root.store.username" class="last-watched-section">
        <h3>Last Watched Recipes</h3>
        <RecipePreviewList title="Last Watched Recipes" />
      </div>

      <!-- Login Prompt Section (for unauthenticated users) -->
      <div v-if="!$root.store.username" class="login-section">
        <div class="box overlay">
          <LoginPage />
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

.explore-section,
.last-watched-section {
  padding: 20px;
}

.explore-section {
  margin-bottom: 20px;
}

.login-section {
  position: relative;
}

.box {
  width: 100%;
  height: 50%;
  position: absolute;
  opacity: 0.7;
}

.overlay {
  z-index: 9;
  background: rgba(42, 43, 42, 0.9);
}

.blur {
  -webkit-filter: blur(5px);
  filter: blur(4px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
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
