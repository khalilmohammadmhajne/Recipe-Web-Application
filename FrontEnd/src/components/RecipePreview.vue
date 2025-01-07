<template>
  <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id, title: this.title } }" class="recipe-preview">
    <div class="recipe-body">
      <img 
        v-if="title === 'Private Recipes' || title === 'Family Recipes'" 
        :src="imageSrc" 
        class="recipe-image" 
        alt="Recipe image" 
      />
      <img 
        v-else-if="imageLoaded" 
        :src="recipe.image" 
        class="recipe-image" 
        alt="Recipe image" 
      />
    </div>
    <div class="recipe-footer">
      <strong class="recipe-label">Recipe</strong>
      <div :title="recipe.title" class="recipe-title">{{ recipe.title }}</div>
      <div class="footer-details">
        <ul class="recipe-overview">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <div v-if="title !== 'Family Recipes'" class="recipe-popularity">
            <span class="popularity-count">{{ recipe.popularity }}</span>
            <p class="like-text">likes</p>
          </div>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    if (this.title === "Private Recipes" || this.title === "Family Recipes") {
      this.imageSrc = 'http://127.0.0.1:80' + this.recipe.image;
    } else {
      this.imageLoaded = true;
    }
  },
  data() {
    return {
      imageLoaded: false,
      imageSrc: 'data:image/png;base64,' + this.recipe.image,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 100%;
  position: relative;
  padding: 0;
}

.recipe-body {
  width: 100%;
  position: relative;
}

.recipe-image {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
  object-fit: cover;
}

.recipe-footer {
  width: 100%;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  overflow: hidden;
}

.recipe-label {
  color: #f93f23;
  font-size: 0.875rem;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.recipe-title {
  color: rgb(60, 59, 59);
  font: bold 1.25rem/1.5rem "Source Serif Pro", serif;
  padding: 0;
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-details {
  margin-top: 15px;
}

.recipe-overview {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.recipe-overview li {
  font-size: 1rem;
  text-align: left;
  color: #555;
}

.recipe-popularity {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #f93f23;
}

.popularity-count {
  font-weight: bold;
  margin-right: 5px;
}

.like-text {
  color: rgb(104, 104, 104);
  font-size: 0.875rem;
  margin-left: 5px;
}

a,
u {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .recipe-footer {
    padding: 8px;
  }

  .recipe-title {
    font-size: 1.25rem;
  }

  .recipe-overview li {
    font-size: 0.875rem;
  }

  .recipe-label {
    font-size: 0.75rem;
  }
}
</style>
