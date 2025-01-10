<template>
    <h1>Login</h1>
    <div class="container">
    <div>
        <form @submit.prevent="login">
            <div class="login-form-item">
                <!--<label for="username">Username</label>-->
                <input class="form-control" v-model="user.username" id="username" placeholder="Username" />
            </div>
            <div class="login-form-item">
                <!--<label for="password">Password</label>-->
                <input class="form-control" v-model="user.password" type="password" id="password" placeholder="Password"/>
            </div>
            <button type="submit" class="btn btn-success">Log in</button>
            
            

            </form>
    </div>
    <div v-if="error" class="alert alert-danger error-message">
        {{ errorMessage }}
    </div>
    <div>
        <p><br/> Or sign in to start using the application <br/></p>
    </div>
    <div class="signin-item">
        <RouterLink to="/createUser" class="btn btn-primary">Sign in</RouterLink>
    </div>
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
const errorMessage = ref('');


const login = async () => {
    if (user.value.username === '' || user.value.password === '') {
        error.value = true;
        errorMessage.value = 'The fields are required';
        return;
    }
    
    //const headers = { authorization: userPinia.getToken };
    try{
        const response = await axios.post('http://127.0.0.1:8000/auth/login/', user.value);
        if (response.status === 200) {
            userPinia.setUserData(response);
            router.push('/');
        }else{
            error.value = true;
            errorMessage.value = 'Login failed, please try again';

        }
    }catch(e){
        error.value = true;
        errorMessage.value = 'Login failed, please check your credentials and try again';
    }
    
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

.signin-item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.form-control{
    display: inline-block;
}

.error-message{
    margin-top: 25px;
}


</style>