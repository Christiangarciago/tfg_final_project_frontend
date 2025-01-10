<template>
    <h1>{{ albumInfo.name }}</h1>
    <p>{{ albumInfo.description }}</p>

    <PhotoGallery :loading="loading" :photoList="photoList" :serverUrl="serverUrl" />


</template>




<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useSession } from "../store/user";
import { serverUrl } from '@/global';
import { useRoute } from 'vue-router';
import PhotoGallery from '@/components/PhotoGallery.vue';


const userPinia = useSession();
const photoList = ref([]);
const loading = ref(true);
const route = useRoute();
const albumInfo = ref({});

async function fetchPhotos() {
    const headers = { Authorization: "Bearer " + userPinia.getToken };
    const albumId = route.params.id;
    try {
        const response = await axios.get(`${serverUrl}/albums/${albumId}`, { headers });
        console.log(response.data);
        photoList.value = response.data.photos;
        albumInfo.value = response.data;
    } catch (error) {
        console.error('Error fetching photos:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchPhotos();
});

</script>

