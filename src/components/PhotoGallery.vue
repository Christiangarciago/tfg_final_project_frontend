<template>
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

</template>

<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    photoList: Array,
    loading: Boolean,
    serverUrl: String
});

console.log(props);


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


</style>