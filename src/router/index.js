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
  history: createWebHashHistory(),
  routes
})

export default router
