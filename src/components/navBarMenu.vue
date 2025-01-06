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
                <!--<RouterLink class="navbar-item" to="/upload">Test</RouterLink>-->
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