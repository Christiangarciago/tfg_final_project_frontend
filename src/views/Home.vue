<template>
    <div>
        <h1>Photo Gallery</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-if="photoList.length === 0">Not photos updated</div>
            <div v-else class="photo-gallery">
                <div v-for="photo in photoList" :key="photo.id" class="photo-item">
                    <img :src="photo.thumbnailUrl" :alt="photo.title">
                    <p>{{ photo.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import { RouterLink } from "vue-router";
//import api from "../services/api";
import { useSession } from "../store/user";
import axios from 'axios';


export default {
  name: "HomeHome",
  data() {
    return {
        photoList: [],
        loading: true,
    };
  },
  async created() {
    const userPinia = useSession();
    //const headers = { "Authorization": userPinia.getToken };
    //console.log(headers);
    try {
      let response = await axios.get("http://127.0.0.1:8000/photos/", {
        headers: {
          Authorization: "Bearer " + userPinia.getToken
        },
      }); 
      console.log(response);
      this.photoList = response.data;
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
.photo-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.photo-item {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}
</style>