<template>
  <div class="container">
    <h1 class="title">Favorite Recipes </h1>
    <RecipePreviewList title="Favorite Recipes"/>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin: 0;
  padding-top: 20px;
}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
