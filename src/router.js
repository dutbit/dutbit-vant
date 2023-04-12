import { createRouter, createWebHashHistory } from 'vue-router'

import Enroll from './pages/Enroll.vue'
import Postcard from './pages/Postcard.vue'
import DIYPostcard from './pages/DIYPostcard.vue'

const routes = [
  { path: '/', component: DIYPostcard, meta: { pageTitle: 'DIY祝福' } },
  { path: '/enroll', component: Enroll, meta: { pageTitle: '招新报名' } },
  { path: '/postcard', component: Postcard, meta: { pageTitle: '元旦贺卡' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
