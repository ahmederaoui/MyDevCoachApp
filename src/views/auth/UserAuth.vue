<template>
    <div class="logo">
        <h1>My<br/>Dev Coach</h1>
    </div>
    <base-card>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="email">E-mail</label>
                <input type="email" id="email" v-model.trim="email"/>            
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password"/>    
            </div>
            <base-button>{{submitButtonCaption}}</base-button>
            <base-button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
            <p v-if="!formIsValid"> Please enter a valid email and password (must be at least 6 characters long).</p>
        </form>
    </base-card>
</template>
<script>
export default {
    data(){
        return{
            email :'',
            password : '',
            formIsValid : true,
            mode : 'login'
        }
    },
    computed:{
        submitButtonCaption(){
            if(this.mode === 'login'){
                return 'Login'
            }else{
                return 'Signup'
            }
        },
        switchModeButtonCaption(){
            if(this.mode === 'login'){
                return 'signup instead';
            }else {
                return 'Login instead'
            }
        }
    },
    methods:{
        submitForm(){
            this.formIsValid=true;
            if(this.email ==='' || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false;
                return
            }
            if(this.mode === 'login'){

            }else{
                this.$store.dispatch('signup',{
                    email:this.email,
                    password : this.password
                });
            }
        },
        switchAuthMode(){
            if(this.mode === 'login'){
                this.mode='signup';
            }else{
                this.mode = 'login';
            }
        },
    }
}
</script>
<style scoped>
.logo{
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
  color: #3d008d;
  text-shadow:  01px 1px 2px #3a0061, 0 4.5px #3a006144, 0 0 6px #3a006123;
}

form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  margin-bottom: 1rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>