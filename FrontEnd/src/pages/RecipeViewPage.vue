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
          <div class="info-item">
            <span class="info-title">Ready in</span>
            <span class="info-value">{{ recipe.readyInMinutes }} minutes</span>
          </div>
          
          <!-- Dietary Preferences -->
          <div class="info-item">
            <span class="info-title">For Vegan</span>
            <span class="info-value">{{ recipe.vegan ? 'Yes' : 'No' }}</span>
          </div>
          <div class="info-item" >
            <span class="info-title">For Vegetarian</span>
            <span class="info-value">{{ recipe.vegetarian ? 'Yes' : 'No' }}</span>
          </div>
          <div class="info-item">
            <span class="info-title">Gluten-Free</span>
            <span class="info-value">{{ recipe.glutenFree ? 'Yes' : 'No' }}</span>
          </div>
          
          <!-- Owner and Custom Time -->
          <div class="info-item" v-if="recipe.owner">
            <span class="info-title">Owner</span>
            <span class="info-value">{{ recipe.owner }}</span>
          </div>
          <div class="info-item" v-if="recipe.custom_time">
            <span class="info-title">Custom Time</span>
            <span class="info-value">{{ recipe.custom_time }}</span>
          </div>
        </div>
        
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
/* General container styling */
.recipe-details {
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

/* Recipe title styling */
.recipe-title {
  font-size: 2.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  line-height: 1.3;
}

/* Recipe info section with grid layout */
.recipe-info {
  margin-bottom: 30px;
  font-size: 1.1rem;
  color: #555;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; /* Four equal columns layout */
  /* gap: 15px; */
  text-align: center;
  align-items: center;
  justify-items: start;
}


.info-item {
  display: flex;
  flex-direction: column;
  width: 100%; /* Ensure it takes full width of the grid */
  background-color: #e3f2fd; /* Light blue background */
  padding: 10px 15px;
  border-radius: 10px; /* Rounded corners */
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.info-title {
  font-weight: 600;
  color: #1565c0;
  margin-bottom: 5px;
}

.info-value {
  color: #555;
  font-size: 1rem;
}

/* Styling for ingredient and instruction lists */
.ingredients ul,
.instructions ul {
  list-style-type: disc;
  padding-left: 25px;
  text-align: left;
  margin: 20px auto;
  width: fit-content;
}

.ingredients li,
.instructions li {
  font-size: 1.15rem;
  color: #444;
  margin-bottom: 12px;
}

/* Styling for paragraphs in ingredients and instructions */
.ingredients p,
.instructions p {
  font-size: 1.15rem;
  color: #444;
  margin-bottom: 15px;
  line-height: 1.6;
}

/* Image styling */
.recipe-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 25px;
}

/* Flexbox utility classes */
.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.align-items-center {
  align-items: center;
}

/* Media Queries for responsiveness */
@media only screen and (max-width: 768px) {
  .recipe-details {
    padding: 20px;
  }

  .recipe-title {
    font-size: 2.2rem;
  }

  .recipe-info {
    grid-template-columns: 1fr; /* Switch to one column layout on small screens */
    font-size: 1rem;
  }

  .ingredients li,
  .instructions li,
  .ingredients p,
  .instructions p {
    font-size: 1rem;
  }
  
  .recipe-image {
    max-width: 100%;
  }
}
</style>
