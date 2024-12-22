<template>
    <h1>Login</h1>
    <div class="container">
    <form @submit.prevent="login">
        <div class="login-form-item">
            <label for="username">Username</label>
            <input v-model="user.username" id="username"/>
        </div>
        <div class="login-form-item">
            <label for="password">Password</label>
            <input v-model="user.password" type="password" id="password"/>
        </div>
        <button type="submit" class="button">Login</button>
        <p v-if="error" class="error">Please fill in all fields</p>
    </form>
   
</div>
</template>

<script setup>

import { ref } from 'vue';
import { useSession } from '../store/user';
import axios from 'axios';
import router from '@/router/index';

const userPinia = useSession();
const user = ref({
    username: '',
    password: ''
});
const error = ref(false);

const login = async () => {
    console.log(user.value);
    if (user.value.username === '' || user.value.password === '') {
        error.value = true;
        return;
    }
    


    //const headers = { authorization: userPinia.getToken };

    await axios.post('http://127.0.0.1:8000/auth/login/', user.value).then((response) => {
        console.log(response);
        if (response.status === 200) {
        //if (response) {
            userPinia.setUserData(response);
            console.log(response);
            
            router.push('/');
        }
    });
    
}




</script>

<style scoped lang="scss">
// Each form item with an input
.login-form-item {
  margin-bottom: 20px;
}

// Label for the input
.login-form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

// Inputs
.login-form-item input,
.login-form-item select,
.login-form-item textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}


</style>