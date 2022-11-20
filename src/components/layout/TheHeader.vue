<template>
  <header>
    <nav>
      <h1><router-link to="/">   My <br/>Dev Coach</router-link></h1>
      <ul>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/requests">Requests</router-link></li>
        <li v-else>
            <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
            <base-button @click="logout">Logout</base-button>
        </li>
        <li v-if="isLoggedIn" class="user" @click="profile"><i class='fas fa-user-circle' style='font-size:24px;color:white'></i><p>{{email}}</p></li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {
   computed:{
    isLoggedIn(){
        return this.$store.getters.isAuthenticated;
    },
    email(){
      return this.$store.getters.getEmail;
    },
    
   },
   methods:{
    logout(){
        this.$store.dispatch('logout');
        this.$router.replace('/coaches');
    },
    profile(){
      const route = '/coaches/'+this.$store.getters.userId;
      console.log(this.$store.getters.userId)
      if(!this.$store.getters['coaches/isCoach']){
        return;
      }
      this.$router.replace(route)
    }
   }
};
</script>

<style scoped>
.user{
  margin: auto;
  text-align: center;
  cursor: pointer;
}
.user .fas{
  margin-top: 22px;
  padding-bottom: 0;
}
.user p{
  margin-top: 0;
  padding-top: 0;
  color: white;
}
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
  text-align: center;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
