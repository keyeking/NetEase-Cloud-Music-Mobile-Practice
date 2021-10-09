import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter)
const originalPush = vueRouter.prototype.push;
vueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}
const router = new vueRouter({
    routes: [
        {
            path:'/home',
            name:'home',
            component:()=>import("../views/Home/index.vue")
        },
        {
            path:'*',
            redirect:'home'

        },
        {
            path:'/player',
            name:"player",
            component:()=>import("../views/Player/index.vue")

        }
    ]
})

export default router