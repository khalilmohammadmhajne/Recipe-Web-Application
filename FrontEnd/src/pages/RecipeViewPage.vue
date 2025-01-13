<template>
  <b-container class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <b-row class="justify-content-center w-100">
      <b-col md="8" class="recipe-details">
          <img 
          :src="imageSrc" 
          class="recipe-image" 
          alt="Recipe image" 
        />
        <!-- Recipe Title -->
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        
        <!-- Recipe Information -->
        <div class="recipe-info">
          <p><strong>Preparation Time:</strong> {{ recipe.readyInMinutes }} minutes</p>
          
          <!-- Dietary Preferences -->
          <p v-if="recipe.vegan">For Vegan</p>
          <p v-if="recipe.vegetarian">For Vegetarian</p>
          <p v-if="recipe.glutenFree">Gluten-Free</p>
          
          <!-- Owner and Custom Time -->
          <p v-if="recipe.owner"><strong>Owner:</strong> {{ recipe.owner }}</p>
          <p v-if="recipe.custom_time"><strong>Custom Time:</strong> {{ recipe.custom_time }}</p>
        </div>
        
        <!-- Ingredients Section -->
        <div class="ingredients">
          <p><strong>Ingredients:</strong></p>
          <ul>
            <li v-for="ingredient in ingredientsToDisplay" :key="ingredient.id">
              {{ ingredient.original || ingredient.ingrediant }}
            </li>
          </ul>
        </div>
        
        <!-- Instructions Section -->
        <div class="instructions">
          <p><strong>Instructions:</strong></p>
          
          <!-- Show list for Private or Family Recipes -->
          <ul v-if="title === 'Private Recipes' || title === 'Family Recipes'">
            <li v-for="instruction in recipe.instructions" :key="instruction.id">
              {{ instruction.instruction }}
            </li>
          </ul>
          
          <!-- Show a single paragraph for other recipes -->
          <p v-else v-html="recipe.instructions"></p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>


  
<script>
import axios from "axios";

export default {
  name: "RecipeViewPage",
  data() {
    return {
      recipe: {},
      title: "",
      imageSrc: "",
    };
  },
  created() {
    this.fetchRecipeDetails();
  },
  methods: {
    async fetchRecipeDetails() {
      const recipeId = this.$route.params.recipeId; // Extract the recipeId from the URL
      this.title = this.$route.params.title;
      try {
        if (this.title === "Private Recipes") {
          const response = await axios.get(`http://127.0.0.1:80/users/private_recipe_info/${recipeId}`);
          this.recipe = response.data;
        } else if (this.title === "Family Recipes") {
          const response = await axios.get(`http://127.0.0.1:80/users/family_recipe_info/${recipeId}`);
          this.recipe = response.data;
        } else {
          const response = await axios.get(`http://127.0.0.1:80/recipes/fullinfo/${recipeId}`); // Fetch recipe details
          this.recipe = response.data;
        }

        // Update imageSrc after fetching recipe details
        if (this.title === "Private Recipes" || this.title === "Family Recipes") {
          this.imageSrc = 'http://127.0.0.1:80' + this.recipe.image;
        } else {
          this.imageSrc = this.recipe.image;
          
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    },
  },
  computed: {
    ingredientsToDisplay() {
      if (this.title === "Private Recipes" || this.title === "Family Recipes") {
        return this.recipe.ingredients || [];
      }
      return this.recipe.extendedIngredients || [];
    },
  },
};
</script>

 <style scoped>
  .recipe-details {
    padding: 30px;
    background-color: #ced7db;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center; /* Centers the text inside the recipe details */
  }

  .recipe-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #1c1a1a;
  }

  .recipe-info {
    margin-bottom: 20px;
    font-size: 1.2rem;
    color: #262525;
    text-align: center; /* Center align the text */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center align the elements within the container */
  }


  .ingredients ul,
  .instructions ul {
    list-style-type: disc; 
    padding-left: 20px; 
    text-align: left; 
    margin: 0 auto;
    display: block; 
    width: fit-content; 
  }

  .ingredients li,
  .instructions li {
    font-size: 1.1rem;
    color: #191919;
    margin-bottom: 10px;
  }

  .ingredients p,
  .instructions p {
    font-size: 1.1rem;
    color: #191919;
    margin-bottom: 10px;
  }

  

  /* Ensure the container is at least 100vh to cover the full height of the screen */
  .d-flex {
    display: flex;
  }
  
  /* For centering the content vertically and horizontally */
  .justify-content-center {
    justify-content: center;
  }

  .align-items-center {
    align-items: center;
  }

  /* Responsive Design */
  @media only screen and (max-width: 768px) {
    .recipe-details {
      padding: 20px;
    }

    .recipe-title {
      font-size: 2rem;
    }

    .recipe-info,
    .ingredients li,
    .instructions p {
      font-size: 1rem;
    }
  }
</style>
