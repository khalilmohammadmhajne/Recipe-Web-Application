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

      <!-- Login Prompt Section (for unauthenticated users) -->
      <div v-if="!$root.store.username" class="login-section">
        <div class="box-overlay">
          <LoginPage class="login-window" />
        </div>
        <div>
          <RecipePreviewList title="Random Recipes" class="blur" />
        </div>
      </div>
      
      <!-- Explore Section -->
      <div v-if="$root.store.username" class="explore-section">
        <h3 class="section-title">Explore Our Recipes</h3>
        <RecipePreviewList title="Random Recipes" class="RandomRecipes" />
      </div>

      <!-- Last Watched Section -->
      <div v-if="$root.store.username" class="last-watched-section">
        <h3 class="section-title">Last Watched Recipes</h3>
        <RecipePreviewList title="Last Watched Recipes" />
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
  padding: 10px;
}

#SearhcBar {
  margin-left: 30%;
  margin-right: 30%;
  height: 3.75rem;
  margin-top: 1%;
  margin-bottom: 1%;
}

#mybutton {
  border: none;
  background-color: red;
  margin-left: 5px;
  border-radius: 3px;
  color: white;
  background-color: #162a5f;
}

#mysearch {
  text-align: center;
  font-family: "Gill Sans";
  color: #ffffff;
  background-color: #162a5f;
  border-radius: 5px ;
}
input::placeholder {
  color: #ffffff9c; // Set the placeholder color
  opacity: 1; // Optional: Ensure full opacity (default is 0.5 in some browsers)
}

a {
  margin-right: 16px;
  color: #000000;
  font-weight: 900;
  font: bold 0.75rem/.75rem "Renner", sans-serif;
}

a:hover {
  color: #162a5f;
}


// .last-watched-section {
//   // padding: 20px;
// }

.explore-section {
  display: flex;
  flex-direction: column; /* Arrange children vertically */
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  text-align: center;
}


.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center; 
  color: #162a5f;
}



.box-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 40%; 
  height: 40%; 
  opacity: 0.7;
  display: flex; 
  justify-content: center;
  align-items: center;
  z-index: 15;
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

</style>
