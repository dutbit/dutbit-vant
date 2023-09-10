import { createRouter, createWebHashHistory } from 'vue-router'

import Enroll from './pages/Enroll.vue'
import Postcard from './pages/Postcard.vue'

const routes = [
  { path: '/', component: Enroll, meta: { pageTitle: '招新报名', showBar: false } },
  { path: '/enroll', component: Enroll, meta: { pageTitle: '招新报名', showBar: false } },
  { path: '/postcard', component: Postcard, meta: { pageTitle: '元旦贺卡', showBar: true } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
