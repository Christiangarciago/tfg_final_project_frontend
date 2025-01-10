<template>
    <div class="create-album container">
        <h1>Create Album</h1>
        <form @submit.prevent="createAlbum">
            <div class="form-group">
                <label for="albumName">Name:</label>
                <input type="text" id="albumName" v-model="newAlbumName" class="form-control" required />
                <label for="albumName">Description:</label>
                <input type="text" id="albumDescription" v-model="newAlbumDescription" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Create Album</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useSession } from "../store/user";
import { serverUrl } from '@/global';

const userPinia = useSession();
const router = useRouter();
const newAlbumName = ref('');
const newAlbumDescription = ref('');

async function createAlbum() {
    const headers = { Authorization: "Bearer " + userPinia.getToken };
    const newAlbum = {
        name: newAlbumName.value,
        description: newAlbumDescription.value
    };

    try {
        const response = await axios.post(`${serverUrl}/albums/`, newAlbum, { headers });
        console.log('Album created successfully:', response.data);
        newAlbumName.value = ''; // Clear the input field
        newAlbumDescription.value = '';
        router.push('/albums'); // Redirect to the albums view after creating the album
    } catch (error) {
        console.error('Error creating album:', error);
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
    color: white;
    text-decoration: none;
}

.btn-primary:hover {
    background-color: #0056b3;
}
</style>