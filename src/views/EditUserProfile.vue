<template>
    <div class="edit-user-info container">
        <h1>Edit User Info</h1>
        <form @submit.prevent="updateUserInfo">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="editUsername" class="form-control" />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="editEmail" class="form-control" />
            </div>
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="editFirstName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="editLastName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="editPassword" class="form-control" />
            </div>
            <div class="form-group">
                <label for="profilePicture">Profile Picture:</label>
                <input type="file" id="profilePicture" class="form-control" @change="handleFileUpload" />
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSession } from "../store/user";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { serverUrl } from '@/global';

const userPinia = useSession();
const router = useRouter();
const editUsername = ref(userPinia.username);
const editEmail = ref(userPinia.email);
const editPassword = ref(userPinia.password); 
const editLastName = ref(userPinia.lastName);
const editFirstName = ref(userPinia.firstName);
const uploadUserAvatar = ref(null);

function handleFileUpload(event) {
    uploadUserAvatar.value = event.target.files[0];
    
}

async function updateUserInfo() {
    const user_id = userPinia.userId; // Assuming you have the person's ID stored in Pinia
    const headers = { Authorization: "Bearer " + userPinia.getToken };
    /*const updatedData = {
        username: editUsername.value,
        email: editEmail.value,
        first_Name: editFirstName.value,
        last_Name: editLastName.value,
        password: editPassword.value,
        user_avatar: uploadUserAvatar.value

    };*/

    const formData = new FormData();
    formData.append('username', editUsername.value);
    formData.append('email', editEmail.value);
    formData.append('first_name', editFirstName.value);
    formData.append('last_name', editLastName.value);
    if (editPassword.value){
        formData.append('password', editPassword.value);
    }
    
    if (uploadUserAvatar.value) {
        formData.append('user_avatar', uploadUserAvatar.value);
    }



    try {
        await axios.put(`${serverUrl}/person/${user_id}/`, formData, { headers });
        userPinia.username = editUsername.value;
        userPinia.email = editEmail.value;
        userPinia.firstName = editFirstName.value;
        userPinia.lastName = editLastName.value;
        if (editPassword.value){
            userPinia.password = editPassword.value;
        }
        if (uploadUserAvatar.value){
            userPinia.userAvatar = uploadUserAvatar.value;
        }
        

        // Update other user info as needed
        router.push('/'); // Redirect to home or another page after saving
    } catch (error) {
        console.error('Error updating user info:', error);
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
}

.btn-primary {
    background-color: #007bff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #0056b3;
}
</style>