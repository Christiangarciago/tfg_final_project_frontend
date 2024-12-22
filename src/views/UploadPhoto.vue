<template>
    <div>
      <h1>Upload Photo</h1>
      <form @submit.prevent="uploadPhoto">
        <div>
          <label for="title">Title</label>
          <input type="text" id="title" v-model="title" required />
        </div>
        <div>
          <label for="image">Image</label>
          <input type="file" id="image" @change="onFileChange" required />
        </div>
        <button type="submit" :disabled="uploading">Upload</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  
  export default {
    data() {
      return {
        title: "",
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
        if (!this.image) {
          this.message = "Please select an image.";
          return;
        }
  
        this.uploading = true;
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("image", this.image);
  
        try {
          await api.post("photos/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
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