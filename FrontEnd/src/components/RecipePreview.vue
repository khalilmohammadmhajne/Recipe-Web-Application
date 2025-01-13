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
      <div class="recipe-hover">
        <span class="hover-text">{{ recipe.title }}</span>
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
      imageSrc: '',
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
  overflow: hidden;
  border-radius: 8px; 
  text-decoration: none; 
}

.recipe-body {
  width: 100%;
  position: relative;
  aspect-ratio: 16 / 9; 
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
  background-color: #d1caca; 
}

.recipe-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.recipe-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hover-text {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.recipe-preview:hover .recipe-hover {
  opacity: 1;
}

.recipe-preview:hover .recipe-image {
  opacity: 0.7;
}
</style>
