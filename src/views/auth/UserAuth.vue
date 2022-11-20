<template>
  <base-card>
    <div class="logo">
      <h1>My<br />Dev Coach</h1>
      <h5>...{{ submitButtonCaption }}...</h5>
    </div>
    <base-dialog :show="!!error" title="An error accurred" @close="handleError">
        <p>{{error}}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
        <base-spinner></base-spinner>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{
        switchModeButtonCaption
      }}</base-button>
      <p v-if="!formIsValid">
        Please enter a valid email and password (must be at least 6 characters
        long).
      </p>
    </form>
  </base-card>
</template>
<script>
import BaseDialog from '@/components/ui/BaseDialog.vue';
export default {
  components: { BaseDialog },
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode === "login") {
            await this.$store.dispatch('login',{
            email: this.email,
            password: this.password,
          })
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
        const url = '/' + (this.$route.query.red || 'coaches');
        this.$router.replace(url);
      } catch (error) {
        this.error = error.message || "Failed to authenticate, try later.";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },handleError(){
        this.error = null;
    }
  },
};
</script>
<style scoped>
.logo {
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
  color: #3d008d;
  text-shadow: 01px 1px 2px #3a0061, 0 4.5px #3a006144, 0 0 6px #3a006123;
}
.logo h5 {
  color: rgb(145, 145, 145);
  text-shadow: none;
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
