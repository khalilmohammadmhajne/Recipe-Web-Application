<template>
  <div class="MainPage">
    <div id="Search">
      <br>
      <table>
        <tr>
          <td >
            <input type="text" placeholder="Find a Recipe" id="SearchBar" v-model="query">
          </td>
          <td style="width:20%">
            <button id="searchButton" style="width:100%" @click="Search">Search</button>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <CustomeFilter ref="CustomFilter" />
        </tr>
      </table>
    </div>
    <RecipePreviewList ref="previewList" title="Search Result" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import CustomeFilter from "../components/CustomeFilter.vue";

export default {
  name: "SearchPage",
  components: {
    RecipePreviewList,
    CustomeFilter,
  },
  data() {
    return {
      query: "",
    };
  },
  props: {
    myQuery: {
      type: String,
      default: "none",
      require: false,
    },
  },
  mounted() {
    console.log(this.$route.params.query);
    let q = this.$route.params.query;

    if (q != undefined && q != "") {
      this.$refs.previewList.searchQuery(q, undefined, undefined, undefined, 5, 1);
    }
  },
  methods: {
    Hola() {
      console.log("hehe");
    },
    async Search() {
      let filters = this.$refs.CustomFilter.getFilters();
      console.log(filters);

      let cusineType = undefined;
      let dietType = undefined;
      let intoleranceType = undefined;
      if (filters[0].length != 0) {
        cusineType = String(filters[0]);
      }
      if (filters[1].length != 0) {
        dietType = filters[1];
      }
      if (filters[2].length != 0) {
        intoleranceType = String(filters[2]);
      }


      this.$refs.previewList.searchQuery(
        this.query,
        cusineType,
        dietType,
        intoleranceType,
        parseInt(filters[3]),
        filters[4]
      );
    },
  },
};
</script>

<style scoped>
.MainPage {
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

table {
  width: 50%;
  margin-left: 20%;
  margin-right: 20%;
}

#SearchBar {
  font-family: "Renner", sans-serif;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  padding: 4px;
  height: 40px;
  width: 100%;
  color:rgb(255, 255, 255);
  background-color: #142249;
  border-color: #142249;
  margin: 0;
}

input::placeholder {
  color: #ffffffb0; 
  opacity: 1; 
}

#searchButton {
  margin: 0;
  font-weight: bold;
  color: white;
  font-size: 19px;
  letter-spacing: 0.1em;
  background-color: #162a5f;
  height: 40px;
  border: none;
}
</style>
