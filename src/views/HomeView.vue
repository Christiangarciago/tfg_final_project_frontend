<template>
    <div>
        <h1>Photo Gallery</h1>
        <!--<div v-if="loading">Loading...</div>
        <div v-else>
            <div v-if="photoList.length === 0">Not photos updated</div>
            <div v-else class="photo-gallery">
                <div v-for="photo in photoList" :key="photo.id" class="photo-item">
                  <RouterLink :to="'/photoDetail/' + photo.id">  
                  <img :src="serverUrl + photo.image" :alt="photo.title"/>
                  </RouterLink>
                </div>
            </div>
        </div>-->
        <PhotoGallery :loading="loading" :photoList="photoList" :serverUrl="serverUrl" />
    </div>
</template>

<script setup>
//import { RouterLink } from "vue-router";
//import api from "../services/api";
import { ref, onMounted } from "vue";
import { useSession } from "../store/user";
import axios from 'axios';
import { serverUrl } from "@/global";
import PhotoGallery from "@/components/PhotoGallery.vue";

const userPinia = useSession();
const photoList = ref([]);
const loading = ref(true);


  async function fetchPhotos() {
    //const headers = { "Authorization": userPinia.getToken };
    //console.log(headers);
    try {
      let response = await axios.get("http://127.0.0.1:8000/photos/", {
        headers: {
          Authorization: "Bearer " + userPinia.getToken
        },
      }); 
      console.log(response);
      photoList.value = response.data;
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    fetchPhotos();
});

</script>

<style>

</style>
