import { createRouter, createWebHistory } from 'vue-router'

import CoachDetails from '../views/coaches/CoachDetails'
import CoachesList from '../views/coaches/CoachesList'
import CoachRegistration from '../views/coaches/CoachRegistration'
import ContactCoach from '../views/requests/ContactCoach'
import RequestsReceived from '../views/requests/RequestsReceived'
import NotFound from '../views/NotFound'
import UserAuth from '../views/auth/UserAuth.vue'
import store from '../store/index.js'


const routes = [
  {path: '/',redirect : '/coaches'},
  {path: '/coaches',component:CoachesList},
  {path: '/coaches/:id',component:CoachDetails,props:true,
   children:[
    {path: 'contact',component:ContactCoach}]},
  {path: '/register',component:CoachRegistration, meta:{auth : true}},
  {path: '/requests',component:RequestsReceived, meta:{auth: true}},
  {path: '/auth',component:UserAuth,meta:{unauth:true}},
  {path: '/:notFound(.*)',component:NotFound}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
 router.beforeEach(function(to,from,next){
  if(to.meta.auth && !store.getters.isAuthenticated){
    next('/auth');
  }else if (to.meta.unauth && store.getters.isAuthenticated){
    next('/coaches')
  }else{
    next();
  }
 })
export default router
