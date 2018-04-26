import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios';

Vue.config.productionTip = false;

const token = localStorage.getItem('user-token');
if (token) {
    axios.defaults.headers.common['x-auth'] = token
}

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
