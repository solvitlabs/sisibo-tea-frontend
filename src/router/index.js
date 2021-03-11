import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import( /* webpackChunkName: "signup" */ '../views/SignUp.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import( /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
