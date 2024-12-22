import { defineStore } from 'pinia'
import VueJwtDecode from 'vue-jwt-decode';
import router from '@/router/index';
export const useSession = defineStore('user', {
    state: () => {
        return {
            logged: false,
            username: '',
            token: '',
        }
    },

    actions:{
        setUserData(payload) {
            let payload_parsed = '';
            console.log(payload.data.access);
            payload_parsed = VueJwtDecode.decode(payload.data.access);
            console.log(payload_parsed);
            this.logged = true;
            this.username = payload_parsed.username;
            this.token = payload.data.access;
          },
          clearData() {
            this.logged = false;
            this.username = '',
            this.token = ''
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
            console.log(this.token);
          return this.token;
        },
        getMessage() {
          return this.message;
        }
      }
})