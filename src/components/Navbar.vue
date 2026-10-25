<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

interface NavLink { to: string; label: string; icon: string; style?: 'primary' | 'outline' }

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

const links: NavLink[] = [
  { to: '/', label: 'الرئيسية', icon: 'fa-house' },
  { to: '/about', label: 'من نحن', icon: 'fa-user-doctor' },
  { to: '/booking', label: 'احجز الآن', icon: 'fa-calendar-check', style: 'primary' },
  { to: '/auth', label: 'تسجيل الدخول', icon: 'fa-right-to-bracket', style: 'outline' },
]

const isActive = (to: string) => route.path === to

function linkClass(l: NavLink) {
  const base = 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-bold transition-colors'
  const ring = isActive(l.to) ? ' ring-4 ring-teal-200' : ''
  if (l.style === 'primary') return `${base} bg-teal-600 text-white shadow-md shadow-teal-600/30 hover:bg-teal-700${ring}`
  if (l.style === 'outline') return `${base} border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white${ring}`
  return `${base} ${isActive(l.to) ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-100 hover:text-teal-700'}`
}

const onScroll = () => (scrolled.value = window.scrollY > 10)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.path, () => (menuOpen.value = false))
</script>

<template>
  <header
    v-motion-slide-top
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300"
    :class="scrolled ? 'bg-white/90 shadow-md backdrop-blur-lg' : 'bg-white/70 backdrop-blur-md'"
  >
    <nav class="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
      <!-- الشعار -->
      <RouterLink to="/" class="flex items-center gap-3">
        <span class="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-teal-500 to-cyan-600 text-xl text-white shadow-lg shadow-teal-500/30">
          <i class="fa-solid fa-tooth"></i>
        </span>
        <span class="leading-tight">
          <b class="block text-lg font-extrabold text-slate-900">عيادة الابتسامة</b>
          <small class="text-xs font-semibold text-teal-600">لطب وتجميل الأسنان</small>
        </span>
      </RouterLink>

      <!-- روابط الشاشات الكبيرة -->
      <ul class="hidden items-center gap-2 md:flex">
        <li v-for="l in links" :key="l.to">
          <RouterLink :to="l.to" :class="linkClass(l)">
            <i :class="['fa-solid text-sm', l.icon]"></i>
            {{ l.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- زر القائمة للجوال -->
      <button
        class="grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-700 md:hidden"
        aria-label="القائمة"
        @click="menuOpen = !menuOpen"
      >
        <i :class="['fa-solid text-lg', menuOpen ? 'fa-xmark' : 'fa-bars']"></i>
      </button>
    </nav>

    <!-- قائمة الجوال -->
    <Transition name="fade">
      <ul v-if="menuOpen" class="space-y-2 border-t border-slate-100 bg-white px-5 py-4 shadow-xl md:hidden">
        <li v-for="l in links" :key="l.to">
          <RouterLink :to="l.to" :class="[linkClass(l), 'w-full justify-center']">
            <i :class="['fa-solid text-sm', l.icon]"></i>
            {{ l.label }}
          </RouterLink>
        </li>
      </ul>
    </Transition>
  </header>
</template>