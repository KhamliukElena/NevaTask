import { createRouter, createWebHashHistory } from 'vue-router'
import ShipSchedule from '../views/ShipSchedule.vue'

const routes = [
  {
    path: '/',
    name: 'ShipSchedule',
    component: ShipSchedule
  }
]

const router = createRouter({
  process.env.NODE_ENV === 'production' ? '/NevaTask/' : '/',
  history: createWebHashHistory(),
  routes
})

export default router
