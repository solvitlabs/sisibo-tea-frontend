import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import( /* webpackChunkName: "signup" */ '../views/SignUp.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
