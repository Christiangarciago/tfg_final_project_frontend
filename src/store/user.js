import { defineStore } from 'pinia'
import VueJwtDecode from 'vue-jwt-decode';
import router from '@/router/index';



export const useSession = defineStore('user', {
    state: () => {
        return {
            logged: false,
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            token: '',
            userAvatar: '',
            userId:'',
        }
    },

    actions:{
        setUserData(payload) {
            let payload_parsed = '';
            payload_parsed = VueJwtDecode.decode(payload.data.access);
            console.log(payload_parsed);
            this.logged = true;
            this.username = payload_parsed.username;
            this.email = payload_parsed.email;
            this.firstName = payload_parsed.first_name;
            this.lastName = payload_parsed.last_name;
            this.token = payload.data.access;
            this.userAvatar = payload_parsed.user_avatar;
            this.userId = payload_parsed.user_id;
            localStorage.setItem('token', this.token);
          },
          clearData() {
            this.logged = false;
            this.username = '';
            this.token = '';
            localStorage.removeItem('token');
            router.push('/login');
            
          },

          setMessage(msg) {
            this.message = msg;
          }

    },
    getters: {
        isLogged() {
          return this.logged;
        },
        getUserName() {
          return this.username;
        },
        getToken() {
          return this.token;
        },
        getMessage() {
          return this.message;
        }
      }
})