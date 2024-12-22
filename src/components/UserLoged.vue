<template>
   <div class="user" v-if="userPinia.isLogged">
        <img class="user__image" src="" alt="">
        <div class="user__info">
            {{ userPinia.getUserName }}
            <button class="button button-logout" @click="logout">Logout  
                <img src="" alt="Logout" />
            </button>
        </div>
    </div>
    <div v-if="!userPinia.isLogged">
        <RouterLink to="/login" class="navbar-item">Login</RouterLink>
    </div>
</template>

<script setup>
    import { useSession } from "../store/user";
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

  // Image
  .user__image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: red;
    padding: 10px;
  }

  // Rest of the user info
  .user__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 0.75rem;
    font-weight: bold;
  }

  // Logout button
  .button-logout {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 5px 10px;
    background-color: red;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: red;
    }

    img {
      width: 10px;
      height: 10px;
    }

    
  }
}

.navbar-item {
    color: white;
    margin-right: 1rem;
    text-decoration: none;
}

.navbar-item:hover {
    text-decoration: underline;
}


</style>