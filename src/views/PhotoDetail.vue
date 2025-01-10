<template>
    <div class="photo-detail">
        <h1>Photo Details</h1>
        <div v-if="photo" class="row">
            <div class="col-lg-7">
                <div>
                    <img :src="serverUrl + photo.image" alt="" />
                </div>
                <div>
                    <div id="label-container" class="d-flex flex-wrap gap-2">
                        <span v-for="(label, index) in labels" :key="index"
                            class="badge bg-secondary d-flex align-items-center gap-2" style="padding-right: 8px;">
                            {{ label }}
                            <button type="button" class="btn-close btn-close-white btn-sm" aria-label="Delete"
                                @click="deleteLabel(index)" style="font-size: smaller;">

                            </button>
                        </span>
                    </div>
                </div>
                <div class="mt-3">
                    <input type="text" v-model="newLabel" class="form-control" placeholder="Enter a new label"
                        @keyup.enter="addLabel" />
                    <button class="btn btn-primary mt-2" @click="addLabel">
                        Add Label
                    </button>
                </div>

                

                <div id="map" style="width: 100%; height: 500px;"></div>
                

            </div>
            <div class="col-md-5">
                <div class="photo-info">
                    <dl>
                        <dt>Taken with</dt>
                        <dd>{{ photo.takenWith }}</dd>
                    </dl>
                    <dl>
                        <dt>Date Taken</dt>
                        <dd>{{ photo.dateTaken }}</dd>
                    </dl>
                    <dl>
                        <dt>Dimensions</dt>
                        <dd>{{ exifInfo.dimensions }}</dd>
                    </dl>
                    
                    <dl>
                        <dt>Focal Length: </dt>
                        <dd>{{ exifInfo.focal_length }}</dd>
                    </dl>
                    <dl>
                        <dt>Exposure Time</dt>
                        <dd>{{ exifInfo.exposure_time }}</dd>
                    </dl>
                    <dl>
                        <dt>F Number</dt>
                        <dd>{{ exifInfo.f_number }}</dd>
                    </dl>
                    <dl>
                        <dt>ISO</dt>
                        <dd>{{ exifInfo.iso }}</dd>
                    </dl>
                    <dl>
                        <dt>Lens</dt>
                        <dd>{{ exifInfo.lens }}</dd>
                    </dl>
                    <dl>
                        <dt>Max Aperture</dt>
                        <dd>{{ exifInfo.max_aperture }}</dd>
                    </dl>


                </div>

                <div>
            <label for="albumSelect">Select Album:</label>
            <select id="albumSelect" class="form-select" v-model="selectedAlbumId" @change="updatePhotoAlbum" multiple>
                <option v-for="album in albums" :key="album.id" :value="album.id">
                    {{ album.name }}
                </option>
            </select>
        </div>
                
                <button class="btn btn-success mt-3" @click="savePhoto">Save</button>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref, nextTick } from 'vue';
import axios from 'axios';
import { useSession } from "../store/user";
import { serverUrl } from '@/global';
import { useRoute } from "vue-router";


import "leaflet/dist/leaflet.css";
import L from "leaflet";


const photo = ref(null);
const userPinia = useSession();
const route = useRoute();
const newLabel = ref("");
let labels = ref([]);
const exifInfo = ref({});
const center = ref({ lat: 0, lng: 0 });
const map = ref(null);
const marker = ref(null);
const albums = ref([]);
const selectedAlbumId = ref(null);

const headers = { Authorization: "Bearer " + userPinia.getToken }

function parseExifString(exifString) {
    try {
        // Replace single quotes with double quotes
        const jsonString = exifString.replace(/'/g, '"');
        return JSON.parse(jsonString);
    } catch (e) {
        console.error('Failed to parse EXIF string:', e);
        return {};
    }
}

const customIcon = L.icon({
    iconUrl: require('@/assets/map-pin-solid.svg'),
    iconSize: [25, 41], // [width, height]
    iconAnchor: [12, 41], // Point where the icon is anchored to the marker
});


async function fetchPhoto() {

    
    const photoId = route.params.id;
    await axios.get(`${serverUrl}/photos/${photoId}`, { headers }).then(async (response) => {
        photo.value = response.data;
        console.log(response.data);
        labels.value = JSON.parse(photo.value['labels']);
        exifInfo.value = parseExifString(photo.value['exif']);
        console.log(exifInfo.value);
        
        console.log(photo.value.latitude);
        await nextTick();
        
        if (photo.value.latitude && photo.value.longitude) {
            center.value = { lat: photo.value.latitude, lng: photo.value.longitude };
            map.value = L.map("map").setView(center.value, 10);
            marker.value = L.marker(center.value, { draggable: true, icon: customIcon }).addTo(map.value);

            marker.value.on('dragend', (event) => {
                const position = event.target.getLatLng();
                photo.value.latitude = position.lat;
                photo.value.longitude = position.lng;
            });
        }else{
            center.value = { lat: 0, lng: 0 }; // Default center if no coordinates are available
            map.value = L.map("map").setView(center.value, 2); // Zoomed out view
        }


        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map.value);




        map.value.on('click', (event) => {
            const position = event.latlng;
            if (marker.value) {
                map.value.removeLayer(marker.value);
            }
            marker.value = L.marker(position, { draggable: true, icon: customIcon }).addTo(map.value);
            marker.value.on('dragend', (event) => {
                const newPosition = event.target.getLatLng();
                photo.value.latitude = newPosition.lat;
                photo.value.longitude = newPosition.lng;
            });
            photo.value.latitude = position.lat;
            photo.value.longitude = position.lng;
        });
        
        selectedAlbumId.value = photo.value.album;
    });






}

async function fetchAlbums() {
    await axios.get(`${serverUrl}/albums/`, { headers }).then(async (response) => {
        console.log(response.data);
        albums.value = response.data;
    }).catch((error) => {
        console.error('Error fetching albums:', error);
        
    
    });
}




onMounted(() => {
    fetchPhoto();
    fetchAlbums();
});




// Add a new label
const addLabel = () => {
    if (newLabel.value.trim()) {
        labels.value.push(newLabel.value.trim());
        newLabel.value = "";
    }
};

// Delete a label
const deleteLabel = (index) => {
    labels.value.splice(index, 1);
};



const savePhoto = async () => {
    const headers = { Authorization: "Bearer " + userPinia.getToken }
    const photoId = route.params.id;
    const updatedData = {
        
        labels: JSON.stringify(labels.value),
        latitude: photo.value.latitude,
        longitude: photo.value.longitude,
        album: selectedAlbumId.value
    };
    await axios.put(`${serverUrl}/photos/${photoId}/`, updatedData, { headers }).then((response) => {
        console.log('Photo updated successfully:', response.data);
    }).catch((error) => {
        console.error('Error updating photo:', error);
    });
}





</script>

<style scoped>
.photo-detail {
    max-width: 900px;
    margin: 0 auto;
}

.photo-detail img {
    max-width: 100%;
    height: auto;
}

.photo-detail div {
    margin-bottom: 1em;
    
}

.photo-info {
    background-color: #f9f9f9;
    padding: 1em;
    text-align: left;
    font-size: 15px;
}
</style>