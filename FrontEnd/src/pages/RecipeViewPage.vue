<template>
  <b-container style="min-height: 100vh;">
    <b-row class="justify-content-center w-100">
      <b-col md="8" class="recipe-details">
          
        <!-- Recipe Title -->
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        

        <img 
          :src="imageSrc" 
          class="recipe-image" 
          alt="Recipe image" 
          />
        

        
        <!-- Ingredients Section -->
        <div class="ingredients">
          <p><strong>Ingredients</strong></p>
          <ul>
            <li v-for="ingredient in ingredientsToDisplay" :key="ingredient.id">
              {{ ingredient.original || ingredient.ingrediant }}
            </li>
          </ul>
        </div>
        
        <!-- Instructions Section -->
        <div class="instructions">
          <p><strong>Instructions</strong></p>
          
          <!-- Show list for Private or Family Recipes -->
          <ul v-if="title === 'Private Recipes' || title === 'Family Recipes'">
            <li v-for="instruction in recipe.instructions" :key="instruction.id">
              {{ instruction.instruction }}
            </li>
          </ul>
          
          <!-- Show a single paragraph for other recipes -->
          <p v-else v-html="recipe.instructions"></p>
        </div>

        <div>
          <p class="more-reipes">More {{title}}</p>
          <RecipePreviewList title="Random Recipes" class="RandomRecipes" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>


  
<script>
import axios from "axios";
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  name: "RecipeViewPage",
  components:{
    RecipePreviewList
  },
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
/* General container styling */
.recipe-details {
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 4px 12px #162a5f;
  text-align: left; /* Align content to the left globally */
  max-width: 900px;
  margin: 5%;
}

/* Recipe title styling */
.recipe-title {
  font-size: 6rem;
  font-weight: bold;
  color: #162a5f;
  margin-bottom: 25px;
  display: block; /* Ensures it behaves like a block element */
  text-align: center; /* Centers the text within the element */
  margin-left: auto; /* Centers the block horizontally */
  margin-right: auto; /* Centers the block horizontally */
}


/* Recipe info section with grid layout */
.recipe-info {
  margin-bottom: 30px;
  font-size: 1.1rem;
  color: #555;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; /* Four equal columns layout */
  text-align: center;
  align-items: center;
  justify-items: start;
}

.info-item {
  display: flex;
  flex-direction: column;
  width: 90%; /* Ensure it takes full width of the grid */
  background-color: #162a5f77;
  padding: 10px 10px;
  border-radius: 10px; /* Rounded corners */
  text-align: center;
  box-shadow: 0 2px 4px #162a5fa1; 
}

.info-title {
  font-size: 15px;
  color: rgb(5, 23, 82);
  font-weight: bold;
}

.info-value {
  color: #ffffff;
  font-size: 1rem;
}

/* Styling for ingredient and instruction lists */
.ingredients,
.instructions {
  text-align: left; /* Align text to the left */
  margin: 20px auto;
  width: 100%; /* Ensure they take up the full width */
}

.ingredients ul,
.instructions ul {
  list-style-type: disc; /* Bullet points */
  padding-left: 40px; /* Indent from the left */
  margin: 0; /* Remove auto margins */
}

.ingredients li,
.instructions li {
  font-size: 1.6rem; /* Adjust font size */
  color: #162a5f;
  margin-bottom: 10px;
}

.ingredients p,
.instructions p {
  font-size: 1.8rem; /* Adjust font size */
  color: #162a5f;
  margin-bottom: 15px;
  line-height: 1.6; /* Improve readability */
}

/* Image styling */
.recipe-image {
  width: 50%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 25px;

  /* Center the image */
  display: block; /* Makes it a block element */
  margin-left: auto;
  margin-right: auto;
}

/* More recipes styling */
.more-reipes {
  margin-top: 5%;
  display: flex;
  color: #162a5f;
  font-weight: bold;
}
</style>

