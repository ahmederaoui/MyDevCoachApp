import { createRouter, createWebHistory } from 'vue-router'

import CoachDetails from '../views/coaches/CoachDetails'
import CoachesList from '../views/coaches/CoachesList'
import CoachRegistration from '../views/coaches/CoachRegistration'
import ContactCoach from '../views/requests/ContactCoach'
import RequestsReceived from '../views/requests/RequestsReceived'
import NotFound from '../views/NotFound'
import UserAuth from '../views/auth/UserAuth.vue'


const routes = [
  {path: '/',redirect : '/coaches'},
  {path: '/coaches',component:CoachesList},
  {path: '/coaches/:id',component:CoachDetails,props:true,
   children:[
    {path: 'contact',component:ContactCoach}]},
  {path: '/register',component:CoachRegistration},
  {path: '/requests',component:RequestsReceived},
  {path: '/auth',component:UserAuth},
  {path: '/:notFound(.*)',component:NotFound}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
