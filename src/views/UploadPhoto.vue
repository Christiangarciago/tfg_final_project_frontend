<template>
    <div class="container">
      <h1>Upload Photo</h1>
      <div class="row justify-content-md-center">
        <div class="col-lg-6">
        <form @submit.prevent="uploadPhoto">

        <div>
          <label for="image">Image</label>
          <input class="form-control" type="file" id="image" @change="onFileChange" required />
        </div>
        <div class="submit_button">
          <button class="btn btn-primary" type="submit" :disabled="uploading">Upload</button>
        </div>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import api from "../services/api";
  import { useSession } from "../store/user";
  import { ref } from "vue";
  
  
  const userPinia = useSession();

  const image = ref(null);
  const message = ref('');
  const uploading = ref(false);



  function onFileChange(event) {
    const fileMaxSize = 1024 * 1024 * 10;
    const imageToUpload = event.target.files[0];

    console.log(fileMaxSize);
    console.log(imageToUpload.size);
    
    if(imageToUpload.size > fileMaxSize){
      message.value = "The file is too large. Max size is 10MB.";
      image.value = null;
    }else{
      image.value = imageToUpload;
      message.value = "";
    }
  }


  async function uploadPhoto() {
    
    if (!image.value) {
      message.value = "Please select an image.";
      return;
    }
    
    uploading.value = true;
    const formData = new FormData();
    
    formData.append('image', image.value);
    
    try {
      await api.post("http://127.0.0.1:8000/photos/", formData, {
        headers: { "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + userPinia.getToken
          },
      });
      message.value = "Photo uploaded successfully!";
      image.value = null;
    } catch (error) {
      console.error("Error uploading photo:", error);
      message.value = "Failed to upload photo.";
    } finally {
      uploading.value = false;
    }
  }
  </script>

  <style scoped>
  
  .submit_button{
    margin-top: 20px;
  }
  
  
  
  </style>
  ```