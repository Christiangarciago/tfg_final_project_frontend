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
const editEmail = ref(''); // Assuming you have an email field in your user data

async function updateUserInfo() {
    const headers = { Authorization: "Bearer " + userPinia.getToken };
    const updatedData = {
        username: editUsername.value,
        email: editEmail.value
    };
    try {
        await axios.put(`${serverUrl}/user/update`, updatedData, { headers });
        userPinia.username = editUsername.value;
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