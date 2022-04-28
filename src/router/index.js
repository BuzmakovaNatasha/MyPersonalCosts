import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "HomeView" */ '../views/HomeView.vue')
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "DashboardView" */ '../views/DashboardView.vue'),
        children: [
            {
                path: '/dashboard/:page',
                name: 'dashboard-page',
                component: () => import(/* webpackChunkName: "DashboardView" */ '../views/DashboardView.vue')
            },
        ]
    },
    {
        path: '/add/payment/:category',
        name: 'AddPaymentList',
        component: () => import(/* webpackChunkName: "DashboardView" */ '../views/DashboardView.vue'),
    },
    {
        path: '/about*',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '*',
        component: () => import(/* webpackChunkName: "HomeView" */ '../views/HomeView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
