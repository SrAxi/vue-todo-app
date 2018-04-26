import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoComponent from '../components/Todo'
import LoginComponent from '../components/Login'
import store from '../store/store'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: TodoComponent },
    { path: '/login', component: LoginComponent }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (store.getters.isAuthenticated || (!store.getters.isAuthenticated && to.path === '/login')) {
        next();
    } else {
        next({ path: '/login' });
    }
});

export default router;