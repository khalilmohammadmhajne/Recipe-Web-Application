<template>
  <b-container v-if="renderComponent">
    <!-- Alert for Favorite Recipe Addition -->
    <b-alert
      id="alert"
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      Recipe was added to favorite list successfully.
    </b-alert>

    <!-- Recipes Section -->
    <b-row>
      <!-- Display message if no results found -->
      <div v-if="emptyResult" class="empty-result">No Results Found</div>

      <!-- Render Recipe Cards -->
      <b-col
        v-for="recipe in recipes"
        :key="recipe.id"
        cols="12" md="3" lg="3"
        class="d-flex justify-content-center mb-4"
      >
        <div class="card">
          <RecipePreview class="" :recipe="recipe" :title="title" />
          <div class="card-actions">
            <!-- Delete Recipe Icon -->
            <template v-if="['Family Recipes', 'Favorite Recipes', 'Private Recipes'].includes(title)">
              <img
                v-b-modal.modal-1
                src="../assets/garbage.png"
                alt="Delete Recipe"
                class="delete-icon"
                @click="setDelete(recipe.id)"
              />
              <img
                v-b-modal.modal-1
                src="../assets/editing.png"
                alt="Delete Recipe"
                class="delete-icon"
              />
            </template>
          </div>
        </div>
      </b-col>
    </b-row>

    <!-- Randomize Button -->
    <b-row v-if="title === 'Random Recipes'" class="randomize-row">
      <button class="randomize-button" @click="getRandomRecipes">Randomize</button>
    </b-row>

    <!-- Delete Confirmation Modal -->
    <b-modal id="modal-1" title="Confirmation" @ok="handleOk">
      <p>Are you sure you want to remove this recipe from your favorites?</p>
    </b-modal>
  </b-container>
</template>


<script>
import RecipePreview from "./RecipePreview.vue";
import axios from "axios";

// Configure Axios base URL
axios.defaults.baseURL = "http://127.0.0.1:80";

export default {
  name: "RecipePreviewList",
  components: { RecipePreview },
  props: {
    title: { type: String, required: true },
    vertical: { type: Boolean, default: false },
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
    const handlers = {
      "Random Recipes": this.getRandomRecipes,
      "Last Watched Recipes": this.getLastWatchedRecipes,
      "Favorite Recipes": this.getFavoriteRecipes,
      "Private Recipes": this.getPrivateRecipes,
      "Family Recipes": this.getFamilyRecipes,
    };
    handlers[this.title]?.();
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    async handleOk(){
        if (this.title == 'Random Recipes'){
          this.deleteFavoriteRecipes(this.toDelete)
          this.getFavoriteRecipes()
        }
        if (this.title == 'Private Recipes'){
          await this.deletePrivateRecipes(this.toDelete)
          await this.getPrivateRecipes()
        }
        if (this.title == 'Favorite Recipes'){
          await this.deleteFavoriteRecipes(this.toDelete)
          await this.getFavoriteRecipes()
        }
        if (this.title == 'Family Recipes'){
          await this.deleteFamilyRecipes(this.toDelete)
          await this.getFamilyRecipes()
        }
        await this.forceRerender()
        
    },
    setDelete(recipeId) {
      this.toDelete = recipeId;
    },
    async forceRerender() {
      this.renderComponent = false;
      this.renderComponent = true;
    },
    handleFavorite(recipeId) {
      this.postFavoriteRecipes(recipeId);
      this.showAlert();
    },
    async postFavoriteRecipes(recipeId) {
      try {
        await axios.post("/users/favorites", { recipeId });
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
        const { data } = await axios.get("/users/watched");
        this.recipes = data || [];
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFavoriteRecipes(recipeId) {
      try {
        await axios.delete(`/users/favorite/${recipeId}`);
      } catch (error) {
        console.error(error);
      }
    },
    async deletePrivateRecipes(recipeId) {
      try {
        await axios.delete(`/users/private/${recipeId}`);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFamilyRecipes(recipeId) {
      try {
        await axios.delete(`/users/family/${recipeId}`);
      } catch (error) {
        console.error(error);
      }
    },
    async searchQuery(query,cusine,diet,intol,num,sortFilter)
    {
      this.emptyResult=false

      this.recipes=[]
      let res=[]
      if(cusine=="ALL")
      {
       cusine=undefined
      }
       if(diet=="None")
       {
       diet=undefined
      }
       if(intol=="None")
       {
       intol=undefined
       }
      
      try {
        const response = await this.axios.get(
           "/recipes/search/",
          {params:{query:query,cusine:cusine,intolerance:intol,diet:diet,number:num}},
        );

      if(response.data.length!=0)
      {
        for(let i=0;i<response.data.length;i++)
        {
          res.push(response.data[i])

        }
      }
      else{
        
        this.emptyResult=true

      }



      if(sortFilter=="Default"){
        
      }
      else if(sortFilter=="Prepare Time"){
      res.sort((a, b) => parseInt(a.readyInMinutes) - parseInt(b.readyInMinutes));
      }
      else // Stars
      {
      res.sort((a, b) => parseFloat(a.popularity) - parseFloat(b.popularity));
      }

      
      this.recipes=res
      return
  
       
      } catch (error) {
        console.log(error);
      }

    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  border-radius: 0;
}

.card {
  background-color: #010f35a6;
  border: none;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px; 
}

.recipe-preview {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
  border-radius: 8px; 
  background-color: #f9f9f9; 
  margin-bottom: 10px;
}

.recipe-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.add-fav-icon {
  font-size: 20px;
  color: gray;
  cursor: pointer;
  transition: color 0.3s ease;
}

.add-fav-icon:hover {
  color: orange;
}

.delete-icon {
  width: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.delete-icon:hover {
  transform: scale(1.1);
}

.empty-result {
  text-align: center;
  font-size: 16px;
  color: gray;
  margin-top: 20px;
}

.randomize-button {
  background-color: #010f35a6;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  letter-spacing: 0.2em;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 14px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.randomize-button:hover {
  background-color: #55987a;
}

.randomize-row {
  text-align: center;
  justify-content: center;
}
</style>


