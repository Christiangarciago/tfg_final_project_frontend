<template>
    <div class="user-profile container">
        <h1>User Profile</h1>
        <div v-if="userPinia.logged" class="row">
            <div class="col-lg-5">
                <div class="user__image" v-if="!userPinia.userAvatar">
                    <font-awesome-icon icon="user" class="defaultUserPhoto"/>
                </div>
                <img v-else class="user__image" :src="serverUrl + userPinia.userAvatar" alt="">
            </div>
            <div class="profile-info col-lg-7">
                <p><strong>Username:</strong> {{ userPinia.username }}</p>
                <p><strong>Email:</strong> {{ userPinia.email }}</p>
                <p><strong>First Name:</strong> {{ userPinia.firstName }}</p>
                <p><strong>Last Name:</strong> {{ userPinia.lastName }}</p>
                <RouterLink to="/editUserData" class="btn btn-primary">Edit Info</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSession } from "../store/user";
import { serverUrl } from '@/global';

const userPinia = useSession();
</script>

<style scoped>
.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.user__image {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color: lightgray;
    padding: 10px;
    display: inline-block;
  }


img.user__image{
    padding: 0;
}


.defaultUserPhoto {
    font-size: 200px;
}

.profile-info {
    margin-bottom: 20px;
    text-align: left;
    padding-top: 50px;
}

.btn-primary {
    background-color: #007bff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    color: white;
    text-decoration: none;
}

.btn-primary:hover {
    background-color: #0056b3;
}


</style>