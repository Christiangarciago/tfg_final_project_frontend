<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <RouterLink class="navbar-item" to="/">
                MyApp
            </RouterLink>
        </div>
        <div class="navbar-menu" v-if="userPinia.logged">
            <div class="navbar-start">
                
                <RouterLink class="navbar-item" to="/">Home</RouterLink>
                <RouterLink class="navbar-item" to="/upload">Upload Photos</RouterLink>
                <RouterLink class="navbar-item" to="/albums">Albums</RouterLink>
                
            </div>
            
        </div>
        <div class="navbar-end" v-if="userPinia.logged">
                <UserLoged />
            </div>
        
    </nav>
</template>

<script setup>
import { useSession } from '../store/user';
import UserLoged from './UserLoged.vue';


const userPinia = useSession();

</script>

<style scoped>
.navbar {
    background-color: #333;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-item {
    color: white;
    margin-right: 1rem;
    margin-left: 1rem;
    text-decoration: none;
    display: flex;
    align-items: center; /* Center the content of RouterLink vertically */
    justify-content: center; /* Center the content of RouterLink horizontally */
}

.navbar-item:hover {
    text-decoration: underline;
}

.navbar-brand {
    display: flex;
    align-items: center;
}

.navbar-menu {
    display: flex;
    flex-grow: 1;
    justify-content: center; /* Center the navbar-start content */
}

.navbar-start{
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
}

.navbar-end {
    display: flex;
    align-items: center;
}
</style>