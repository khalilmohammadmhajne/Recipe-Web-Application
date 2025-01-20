<template>
    <div class="my-accordion">
        <!-- Using value -->
        <div class="Category">
        <b-button v-b-toggle="'collapse-1'" class="m-1">Cusine</b-button>
        <b-button v-b-toggle="'collapse-2'" class="m-1">Diet</b-button>
        <b-button v-b-toggle="'collapse-3'" class="m-1">Intolerance</b-button>
        <label>SortBy:</label>
        <select id="sel">
            <option value="Default" selected>Default</option>
            <option value="Prepare Time">Prepare Time</option>
            <option value="Stars"> Stars</option>
        </select>

        </div>

        <!-- Element to collapse -->
        <b-collapse id="collapse-1" accordion="my-accordion">
        <div class="filter-content">
            <span class="checkbox" v-for="x in types" :key="x">
            <input type="checkbox" @click="cusSelected(x)" :id="x" />
            <label style="color:black" :for="x">{{ x }}</label>
            </span>
        </div>
        </b-collapse>

        <b-collapse id="collapse-2" accordion="my-accordion">
        <div class="filter-content">
            <span class="checkbox" v-for="x in diet" :key="x">
            <input name="diet" type="radio" @click="dietSelected(x)" :id="x" />
            <label :for="x" style="color:black">{{ x }}</label>
            </span>
        </div>
        </b-collapse>

        <b-collapse id="collapse-3" accordion="my-accordion">
        <div class="filter-content">
            <span class="checkbox" v-for="x in intol" :key="x">
            <input type="checkbox" @click="intoSelected(x)" :id="x" />
            <label style="color:black" :for="x">{{ x }}</label>
            </span>
        </div>
        </b-collapse>
    </div>
</template>
  
<script>
import cuisine from '../assets/cuisine';
import diet from '../assets/diet';
import intolerance from '../assets/intolerance';

export default {
name: "MyFilter",
data() {
    return {
    types: cuisine,
    diet: diet,
    intol: intolerance,
    selectedCusine: [],
    selectedDiet: "",
    selectedIntol: []
    };
},
methods: {
    getFilters() {
        let res = [];
        res.push(this.selectedCusine);
        res.push(this.selectedDiet);
        res.push(this.selectedIntol);
        res.push(this.$el.querySelector("#sel").value);
        return res;
    },
    cusSelected(x) {
        if (this.selectedCusine.includes(x)) {
            let index = this.selectedCusine.indexOf(x);
            this.selectedCusine.splice(index, 1);
        } else {
            this.selectedCusine.push(x);
        }
    },
    dietSelected(x) {
        this.selectedDiet = x;  
    },
    intoSelected(x) {
        if (this.selectedIntol.includes(x)) {
            let index = this.selectedIntol.indexOf(x);
            this.selectedIntol.splice(index, 1);
        } else {
            this.selectedIntol.push(x);
        }
    }
}
};
</script>
  
<style scoped>
.filter-content {
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 15px;
    background: #9192947e;
}

.checkbox {
    margin: 0;
    padding: 5px 0;
}

.filter-content > span {
    min-width: calc(100% / 6 - 15px);
    margin-left: 15px;
    margin-bottom: 5px;
}

button {
    background-color: #162a5f;
}

label {
    font-size: 15px;
    display: inline-block;
    padding: 5px;
    margin-bottom: 5px;
    font-weight: 700;
    color: #142249;
}

select {
    text-align: center;
    color: white;
    border-radius: 10px;
    font-size: 15px;
    background-color: #162a5f;
    font-weight: 600;
    border: none;
}

.m-1 {
    background-color: #162a5f;
    letter-spacing: 0.2em;
    border-color: #162a5f;
}

.Category {
    padding: 10;
}

.checkbox input[type="checkbox"] + label:before,
.checkbox input[type="radio"] + label:before {
left: auto;
right: 0;
}
</style>
