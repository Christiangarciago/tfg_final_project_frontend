<template>
    <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-if="photoList.length === 0">Not photos updated</div>
            <div v-else class="photo-gallery">
                <div v-for="photo in paginatedList" :key="photo.id" class="photo-item">
                  <RouterLink :to="'/photoDetail/' + photo.id">  
                  <img :src="serverUrl + photo.image" :alt="photo.title"/>
                  </RouterLink>
                </div>
            </div>
            <div class="paginator">
                <button @click="previous" class="btn btn-outline-secondary"><font-awesome-icon icon="angles-left"/></button>
                <span>{{ currentPage }} of {{ totalPages }}</span>
                <button @click="next" class="btn btn-outline-secondary"><font-awesome-icon icon="angles-right"/></button>

            </div>

        </div>

</template>

<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

const props = defineProps({
    photoList: Array,
    loading: Boolean,
    serverUrl: String
});

const itemsPerPage = 12;
const currentPage = ref(1);


const totalPages = computed(() => {
    return Math.ceil(props.photoList.length / itemsPerPage);
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = currentPage.value * itemsPerPage;
    return props.photoList.slice(start, end);
});



const next = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const previous = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};




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


.paginator {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.paginator button {
    padding: 5px 10px;
    cursor: pointer;
}

.paginator button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

</style>