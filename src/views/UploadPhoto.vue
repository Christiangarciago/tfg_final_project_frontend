<template>
    <div>
      <h1>Upload Photo</h1>
      <form @submit.prevent="uploadPhoto">

        <div>
          <label for="image">Image</label>
          <input type="file" id="image" @change="onFileChange" required />
        </div>
        <button type="submit">Upload</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  import { useSession } from "../store/user";
  
  export default {
    data() {
      return {
        image: null,
        uploading: false,
        message: "",
      };
    },
    methods: {
      onFileChange(event) {
        this.image = event.target.files[0];
      },
      async uploadPhoto() {
        const userPinia = useSession();
        if (!this.image) {
          this.message = "Please select an image.";
          return;
        }
        
        console.log(this.image);

        this.uploading = true;
        const formData = new FormData();
        
        formData.append('image', this.image);
        console.log(formData);
  
        try {
          await api.post("http://127.0.0.1:8000/photos/", formData, {
            headers: { "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + userPinia.getToken
             },
          });
          this.message = "Photo uploaded successfully!";
          this.title = "";
          this.image = null;
        } catch (error) {
          console.error("Error uploading photo:", error);
          this.message = "Failed to upload photo.";
        } finally {
          this.uploading = false;
        }
      },
    },
  };
  </script>