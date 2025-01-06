<template>
    <div class="create-user">
        <h1>Create New User</h1>
        <form @submit.prevent="submitForm">
            <div class="form-label-group">
                <input class="form-control"  type="text" id="first_name" v-model="user.first_name" placeholder="First Name" required />
                <label for="first_name">First Name</label>
            </div>
            <div class="form-label-group">
                <input class="form-control" type="text" id="last_name" v-model="user.last_name" placeholder="Last Name" required />
                <label for="last_name">Last Name</label>
            </div>
            <div class="form-label-group">
                <input class="form-control" type="email" id="email" v-model="user.email" placeholder="Email" required />
                <label for="email">Email</label>
            </div>
            <div class="form-label-group">
                <input class="form-control" type="text" id="username" v-model="user.username" placeholder="Username" required />
                <label for="username">Username</label>
            </div>
            <div class="form-label-group">
                <input class="form-control" type="password" id="password" v-model="user.password" placeholder="Password" required />
                <label for="password">Password</label>
            </div>
            <button class="btn btn-success" type="submit">Create User</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                password: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Handle form submission logic here
            console.log('User data:', this.user);
        }
    }
};
</script>

<style scoped>
.create-user {
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.form-label-group {
    position: relative;
    margin-bottom: 1rem;
}

.form-label-group > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
}

.form-label-group input:not(:placeholder-shown) ~ label {
    padding-top: .25rem;
    padding-bottom: .25rem;
    font-size: 12px;
    color: #777;
}

.form-label-group > input, .form-label-group > label {
    padding: .75rem .75rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
    padding-top: .25rem;
    padding-bottom: .25rem;
    font-size: 12px;
    color: #777;
}




.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1,25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 12px;
  color: #777;
}




</style>