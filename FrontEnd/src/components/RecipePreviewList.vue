<template>
  <b-container v-if="renderComponent">
    <b-alert id = "alert" :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        Recipe was added to favorite list successfully
    </b-alert>
    <b-row v-if="renderComponent" >
      <v-if v-if="emptyResult"> No Result Found</v-if>
      <b-col v-for="r in recipes" :key="r.id" class="card" >
        <RecipePreview class="recipePreview" :recipe="r" :title="title" />
        <div v-if="title == 'Random Recipes' || title=='Search Result'  || title=='Last Watched Recipes' " style="text-align:right;">
          <a @click="showAlert();">
            <b-icon class="addFav" 
            :icon="isFavorite ? 'star-fill' : 'star'"
            :style="{ color: isFavorite ? 'orange' : 'gray' }" 
            @click="postFavoriteRecipes(r.id);"></b-icon>
          </a>
        </div >
        <div v-else @click='setDelete(r.id)'  style="text-align:left;"> 
            <img v-b-modal.modal-1 src="../assets/garbage.png" style="width:20px;" />
        </div>
      </b-col>
      <b-col>
        <div>
          <b-modal id="modal-1" title="BootstrapVue" @ok = "handleOk">
            <p class="my-4">Are you sure you want to remove this Recipe from favorite?</p>
          </b-modal>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="title=='Random Recipes'"  @click="getRandomRecipes" >
    <button style="background-color:#66a992; border:none; color:white;border-radius:10px;margin-top: 10px;margin-left: 2px;letter-spacing: 0.2em;">Randomize</button>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import axios from "axios";

// Configure Axios base URL
axios.defaults.baseURL = "http://127.0.0.1:80"; // Change to your actual API base URL

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      recipes: [],
      dismissSecs: 2,
      dismissCountDown: 0,
      toDelete: "",
      renderComponent: true,
      emptyResult: false,
      isFavorite: false,
    };
  },
  mounted() {
    switch (this.title) {
      case "Random Recipes":
        this.getRandomRecipes();
        break;
      case "Last Watched Recipes":
        this.getLastWatchedRecipes();
        break;
      case "Favorite Recipes":
        this.getFavoriteRecipes();
        break;
      case "Private Recipes":
        this.getPrivateRecipes();
        break;
      case "Family Recipes":
        this.getFamilyRecipes();
        break;
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    async handleOk() {
      if (this.title.includes("Favorite")) {
        await this.deleteFavoriteRecipes(this.toDelete);
        await this.getFavoriteRecipes();
      } else if (this.title === "Private Recipes") {
        await this.deletePrivateRecipes(this.toDelete);
        await this.getPrivateRecipes();
      } else if (this.title === "Family Recipes") {
        await this.deleteFamilyRecipes(this.toDelete);
        await this.getFamilyRecipes();
      }
      await this.forceRerender();
    },
    setDelete(recipe_id) {
      this.toDelete = recipe_id;
    },
    async forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    async postFavoriteRecipes(Id) {
      try {
        await axios.post("http://127.0.0.1:80/users/favorites", { recipeId: Id });
        this.isFavorite = true;
      } catch (error) {
        console.error(error);
      }
    },
    async getRandomRecipes() {
      try {
        const { data } = await axios.get("/recipes/threeRandom");
        this.recipes = data || [];
      } catch (error) {
        console.error(error);
      }
    },
    async getFavoriteRecipes() {
      try {
        const { data } = await axios.get("/users/favorites");
        this.recipes = data || [];
      } catch (error) {
        console.error(error);
      }
    },
    async getPrivateRecipes() {
      try {
        const { data } = await axios.get("/users/privates");
        this.recipes = data || [];
      } catch (error) {
        console.error(error);
      }
    },
    async getFamilyRecipes() {
      try {
        const { data } = await axios.get("/users/familyrecipes");
        this.recipes = data || [];
      } catch (error) {
        console.error(error);
      }
    },
    async getLastWatchedRecipes() {
      try {
        const { data } = await axios.get("http://127.0.0.1:80/users/watched");
        this.recipes = data || [];
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFavoriteRecipes(Id) {
      try {
        await axios.delete(`/users/favorite/${Id}`);
      } catch (error) {
        console.error(error);
      }
    },
    async deletePrivateRecipes(Id) {
      try {
        await axios.delete(`/users/private/${Id}`);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFamilyRecipes(Id) {
      try {
        await axios.delete(`/users/family/${Id}`);
      } catch (error) {
        console.error(error);
      }
    },
    async searchQuery(query, cusine, diet, intol, num, sortFilter) {
      this.emptyResult = false;
      this.recipes = [];

      if (cusine === "ALL") cusine = undefined;
      if (diet === "None") diet = undefined;
      if (intol === "None") intol = undefined;

      try {
        const { data } = await axios.get("/recipes/search/", {
          params: { query, cusine, intolerance: intol, diet, number: num },
        });

        if (data.length) {
          this.recipes = data;

          if (sortFilter === "Prepare Time") {
            this.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
          } else if (sortFilter === "Stars") {
            this.recipes.sort((a, b) => b.popularity - a.popularity);
          }
        } else {
          this.emptyResult = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.alert{
    position:fixed; 
    top: 0px; 
    left: 0px; 
    width: 100%;
    z-index:9999; 
    border-radius:0px
}

.card{
  
  
  min-height: 380px;
  margin: 5px;
  background-color: rgb(255, 255, 255);
  padding-left: 0;
  padding-right: 0;
  border: none;
  max-width: 28%; 
  min-width:28%;
}

col{

  background-color: red;
}

.addFav{

    position: absolute;
        float:right;
        font-size: 50px;
        padding: 5px;
        top: 0;
        right:0;
        color:rgba(255, 215, 0);
}

[class*="card"] {
  min-width: 60%;
}

@media only screen 
and (min-device-width : 720px) 
 {
  .card{
    min-width: 27%;
    max-width: 27%;
   
  }
  
/* Styles */
}



</style>
