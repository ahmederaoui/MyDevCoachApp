<template>
  <form @submit.prevent="submitForm">
    <div :class="{invalid : !firstName.isValid}" class="form-control" >
      <label for="firstName">FirstName</label>
      <input type="text" id="firstName" v-model.trim="firstName.val" @blur="clearValidity('firstName')" />
      <p v-if="!firstName.isValid">FirstName must contain more than three letters. </p>
    </div>
    <div :class="{invalid: !lastName.isValid}" class="form-control">
      <label for="lastName">LastName</label>
      <input type="text" id="lastName" v-model.trim="lastName.val"   @blur="clearValidity('lastName')"/>
      <p v-if="!lastName.isValid">LastName must contain more than three letters. </p>
    </div>
    <div :class="{invalid: !description.isValid}" class="form-control">
      <label for="description">Desription</label>
      <textarea id="description" rows="5" v-model.trim="description.val"   @blur="clearValidity('description')"></textarea>
      <p v-if="!description.isValid">Description must contain more than three letters. </p>
    </div>
    <div :class="{invalid: !rate.isValid}" class="form-control">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate.val"   @blur="clearValidity('rate')"/>
      <p v-if="!rate.isValid">Hourly rate must be greater than 0 and not empty.</p>
    </div>
    <div class="form-control">
      <label for="photo">Hourly Rate</label>
      <input type="file" id="photo" @change="setPhoto($event.target.name, $event.target.files)"   />
    </div>
    <div :class="{invalid: !areas.isValid}" class="form-control">
        <h3>Areas of Expertise</h3>
        <div>
            <input type="checkbox" id="frontend" value="frontend" v-model="areas.val"  @blur="clearValidity('areas')">
            <label for="frontend">Frontend Development</label>
        </div>
        <div>
            <input type="checkbox" id="backend" value="backend" v-model="areas.val"   @blur="clearValidity('areas')">
            <label for="frontend">Backend Development</label>
        </div>
        <div>
            <input type="checkbox" id="career" value="career" v-model="areas.val"   @blur="clearValidity('areas')">
            <label for="career">Career Advisory</label>
        </div>
        <p v-if="!areas.isValid">Chose one or more domain.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>
<script>
export default {
    emits :['save-data'],
    data(){
        return {
            firstName : {
                val : '',
                isValid : true
            },
            lastName : {
                val : '',
                isValid : true
            },
            description : {
                val : '',
                isValid : true
            },
            rate : {
                val : null,
                isValid : true
            },
            areas : {
                val : [],
                isValid : true
            },
            formIsValid : true
        }
    },
    methods:{
        clearValidity(input){
            if(input =='firstName' && this[input].val.length >3){
                this[input].isValid = true;
            }
            if(input =='lastName' && this[input].val.length >3){
                this[input].isValid = true;
            }
            if(input =='description' && this[input].val.length >3){
                this[input].isValid = true;
            }
            if(input =='rate' &&  this[input].val!=null || this.rate.val>0){
                this[input].isValid = true;
            }
            if(input =='areas' && this[input].val.length > 0){
                this[input].isValid = true;
            }
        },
        validateForm(){
            this.formIsValid = true;
            if(this.firstName.val.length <3){
                this.firstName.isValid = false;
                this.formIsValid = false;
            }
            if(this.lastName.val.length <3){
                this.lastName.isValid = false;
                this.formIsValid = false;
            }
            if(this.description.val.length <3){
                this.description.isValid = false;
                this.formIsValid = false;
            }
            if(this.rate.val===null || this.rate.val<0){
                this.rate.isValid = false;
                this.formIsValid = false;
            }
            if(this.areas.val.length === 0){
                this.firstName.isValid = false;
                this.formIsValid = false;
            }
        },
        submitForm(){
            this.validateForm();
            if(!this.formIsValid){
                return;
            }
            const formData = {
                first : this.firstName.val,
                last : this.lastName.val,
                desc : this.description.val,
                rate : this.rate.val,
                areas : this.areas.val
            };
            this.$emit('save-data',formData);
        }
    }
}
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  border-radius: 5px;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>