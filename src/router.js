import { createRouter, createWebHistory } from 'vue-router'

import Enroll from './pages/Enroll.vue'

const routes = [
  { path: '/', component: Enroll, meta: { pageTitle: '招新报名' } },
  { path: '/enroll', component: Enroll, meta: { pageTitle: '招新报名' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
