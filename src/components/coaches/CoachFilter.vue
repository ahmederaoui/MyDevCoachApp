<template>
    <base-card>
        <h2>Find Your Coach</h2>
        <div class="filter">
            <span>
            <input type="checkbox" id="frontend" checked @change="setFilter">
            <label for="frontend">Frontend</label>
            <input type="checkbox" id="backend" checked @change="setFilter">
            <label for="backend">Backend</label>
            <input type="checkbox" id="career" checked @change="setFilter">
            <label for="frontend">Career</label>
        </span>
        <the-search @searchCoaches="search(searchVal)"></the-search>
        </div>
    </base-card>
</template>
<script>
import TheSearch from '../layout/TheSearch.vue'
export default {
    components:{
        TheSearch
    },
    emits: ['change-filter'],
    data(){
        return {
            filters: {
                frontend : true,
                backend : true,
                career : true
            }
        }
    },
    methods: {
        setFilter(event){
            const inputId = event.target.id;
            const isActive =  event.target.checked;
            console.log(isActive)
            console.log(inputId)
            const updatedFilters = {
                ...this.filters,
                [inputId]:isActive
            };
            console.log(updatedFilters)
            console.log("setFilers1");
            this.filters = updatedFilters;
            this.$emit('change-filter',updatedFilters);
        },
        search(searchVal){
            this.$emit('searchCoaches',searchVal);
        }
    }
}
</script>
<style scoped>
.filter{
    display: flex;
    justify-content: space-between;
}
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>