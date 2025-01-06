<template>
    <div>
        <h1>Photo Gallery</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-if="photoList.length === 0">Not photos updated</div>
            <div v-else class="photo-gallery">
                <div v-for="photo in photoList" :key="photo.id" class="photo-item">
                  <RouterLink :to="'/photoDetail/' + photo.id">  
                  <img :src="serverUrl + photo.image" :alt="photo.title"/>
                  </RouterLink>
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
import { serverUrl } from "@/global";


export default {
  name: "HomeHome",
  data() {
    return {
        photoList: [],
        loading: true,
    };
  },
  computed: {
    serverUrl() {
      return serverUrl;
    },
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 10px;
  padding: 20px;
}

.photo-item {
  border: 1px solid #ccc;
  text-align: center;
  overflow: hidden;
  border: 1px solid #ddd;
  
}

img {
  /*max-width: 50%;
  height: auto;*/
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.image-item {

}
.image-item img {
  
}


</style>
