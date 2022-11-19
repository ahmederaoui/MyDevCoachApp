<template>
  <div class="search-container">
    <form @submit.prevent="search">
      <input type="text" placeholder="Search.." name="search" v-model.trim="searchVal">
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      searchVal:''
    }
  },
  methods:{
    search(){
      if(this.searchVal==''){
        console.log(this.searchVal)
        return;
      }
      console.log(this.searchVal)
      this.$emit('searchCoaches',this.searchVal);
    }
  }
}
</script>
<style scoped>

.search-container {
  float: right;
}
form{
  display: flex;
}

.search-container button {
  border-radius: 50px;
  padding: 6px 10px;
  margin-right: 16px;
  font-size: 17px;
  border: none;
  cursor: pointer;
}
input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  border-radius: 5px;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

.search-container button:hover {
  background: #ccc;
  
  background: #ddd;
}

@media screen and (max-width: 600px) {
  .search-container {
    float: none;
  }
   a, input[type=text], .search-container button {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  input[type=text] {
    border: 1px solid #ccc;  
  }
}
</style>