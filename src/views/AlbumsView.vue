<template>
    <div class="albums">
        <h1>User Albums</h1>
        <RouterLink to="/createAlbum" class="btn btn-primary">Create Album</RouterLink>
        
        <div class="albums-list" v-if="albums.length > 0">
            <RouterLink v-for="album in albums" :key="album.id" :to="'/albumContent/' + album.id" class="album-card">
                <div class="album-info">
                    <h2>{{ album.name }}</h2>
                    <p>{{ album.description }}</p>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSession } from "../store/user";
import axios from 'axios';
import { serverUrl } from '@/global';
import { RouterLink } from 'vue-router';

const userPinia = useSession();
const albums = ref([]);

async function fetchAlbums() {
    const headers = { Authorization: "Bearer " + userPinia.getToken };
    try {
        const response = await axios.get(`${serverUrl}/albums/`, { headers });
        albums.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching albums:', error);
    }
}

onMounted(() => {
    fetchAlbums();
});
</script>

<style scoped>
.albums {
    padding: 20px;
}
.albums h1 {
    font-size: 24px;
    margin-bottom: 20px;
}
.albums ul {
    list-style-type: none;
    padding: 0;
}
.albums li {
    margin-bottom: 20px;
}
.albums h2 {
    font-size: 20px;
    margin: 0;
}
.albums p {
    margin: 5px 0 0;
}


.albums-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 50px;
}

.album-card {
    width: 300px;
    height: 200px;
    border: 1px solid #ddd;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.album-info {
    text-align: center;
}



</style>