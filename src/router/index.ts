import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    transition?: 'fade' | 'slide-up' | 'zoom'
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { title: 'الرئيسية', transition: 'fade' } },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { title: 'من نحن', transition: 'slide-up' } },
    { path: '/booking', name: 'booking', component: () => import('../views/BookingView.vue'), meta: { title: 'احجز الآن', transition: 'zoom' } },
    { path: '/auth', name: 'auth', component: () => import('../views/AuthView.vue'), meta: { title: 'تسجيل الدخول', transition: 'slide-up' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  // ننتظر انتهاء حركة الخروج قبل الصعود لأعلى الصفحة
  async scrollBehavior(to, _from, saved) {
    await new Promise((r) => setTimeout(r, 350))
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 90, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? ''} | عيادة الابتسامة`
})

export default router