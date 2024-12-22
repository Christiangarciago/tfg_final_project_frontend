<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item" href="#">
                MyApp
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/">Home</RouterLink>
                <RouterLink class="navbar-item" to="/upload">Upload Photos</RouterLink>
                <RouterLink class="navbar-item" to="/upload">Test</RouterLink>
            </div>
        </div>
        <div class="navbar-end">
            <UserLoged />
            </div>
    </nav>
</template>

<script>
import UserLoged from './UserLoged.vue';

export default {
    name: 'NavBarMenu',
    components: {
        UserLoged
    }
}
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