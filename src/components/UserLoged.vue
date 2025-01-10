<template>
   <div class="user" v-if="userPinia.isLogged">
        <div class="user__image" v-if="!userPinia.userAvatar">
          <font-awesome-icon icon="user" class="defaultUserPhoto"/>
        </div>
        <img v-else class="user__image" :src="serverUrl + userPinia.userAvatar" alt="">
        <div class="user__info">
          <RouterLink to="/UserProfile" class="navbar-item">  
            <span class="username">{{ userPinia.getUserName }}</span>
          </RouterLink>
          
          <a class="logout-button" @click="logout"> 
              Logout 
              <font-awesome-icon icon="arrow-right-from-bracket" class="logout-icon"/>
          </a>
        </div>
    </div>
    <div v-if="!userPinia.isLogged">
        <RouterLink to="/login" class="navbar-item">Login</RouterLink>
    </div>
</template>

<script setup>
    import { RouterLink } from "vue-router";
    import { useSession } from "../store/user";
    import { serverUrl } from '@/global';
    const userPinia = useSession();

    function logout() {
        userPinia.clearData();
    }

</script>

<style scoped lang="scss">
    // Container when user is logged
.user {
  display: flex;
  align-items: center;
  gap: 10px;
}
  // Image
  .user__image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: lightgray;
    padding: 4px;
  }

  img.user__image{
    padding: 0;
}

  .defaultUserPhoto {
    font-size: 38px;
    color: #2c3e50;
  }

  // Rest of the user info
  .user__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 15px;
    font-weight: bold;
  }

.button-logout {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 5px 10px;
  background-color: lightgray;
  color: white;
  cursor: pointer;
}
  
.button-logout > img {
    width: 15px;
    height: 15px;
}

.navbar-item {
    color: white;
    margin-right: 1rem;
    text-decoration: none;
}

.navbar-item:hover {
    text-decoration: underline;
}

.logout-button{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  cursor: pointer;
}

.logout-icon{
  font-size: 20px;
}

.logout-button:hover{
  text-decoration: underline;
  color: red;
}

.username{
  font-size: 15px;
  padding: 0px;
}

</style>