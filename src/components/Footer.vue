<script setup lang="ts">
import { RouterLink } from 'vue-router'
const year = new Date().getFullYear()
const socials = [
  { icon: 'fa-facebook-f', label: 'فيسبوك' },
  { icon: 'fa-instagram', label: 'انستغرام' },
  { icon: 'fa-whatsapp', label: 'واتساب' },
  { icon: 'fa-telegram', label: 'تيليجرام' },
]
</script>

<template>
  <footer class="bg-slate-900 text-slate-300">
    <div class="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <div class="mb-4 flex items-center gap-3">
          <span class="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-teal-500 to-cyan-600 text-xl text-white">
            <i class="fa-solid fa-tooth"></i>
          </span>
          <b class="text-xl font-extrabold text-white">عيادة الابتسامة</b>
        </div>
        <p class="leading-relaxed text-slate-400">
          نقدم رعاية أسنان متكاملة بأحدث التقنيات وبأيدي نخبة من الأطباء، لنصنع ابتسامة تثق بها.
        </p>
        <div class="mt-5 flex gap-2">
          <a
            v-for="s in socials"
            :key="s.icon"
            href="#"
            :aria-label="s.label"
            class="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-teal-600 hover:text-white"
          >
            <i :class="['fa-brands', s.icon]"></i>
          </a>
        </div>
      </div>

      <div>
        <h4 class="mb-4 text-lg font-bold text-white">روابط سريعة</h4>
        <ul class="space-y-3">
          <li><RouterLink to="/" class="transition hover:text-teal-400">الرئيسية</RouterLink></li>
          <li><RouterLink to="/about" class="transition hover:text-teal-400">من نحن</RouterLink></li>
          <li><RouterLink to="/booking" class="transition hover:text-teal-400">احجز الآن</RouterLink></li>
          <li><RouterLink to="/auth" class="transition hover:text-teal-400">تسجيل الدخول</RouterLink></li>
        </ul>
      </div>

      <div>
        <h4 class="mb-4 text-lg font-bold text-white">ساعات الدوام</h4>
        <ul class="space-y-3 text-slate-400">
          <li class="flex justify-between gap-4"><span>السبت - الخميس</span><span class="text-white">9 ص - 8 م</span></li>
          <li class="flex justify-between gap-4"><span>الجمعة</span><span class="text-white">مغلق</span></li>
          <li class="flex justify-between gap-4"><span>الطوارئ</span><span class="text-teal-400">على مدار الساعة</span></li>
        </ul>
      </div>

      <div>
        <h4 class="mb-4 text-lg font-bold text-white">تواصل معنا</h4>
        <ul class="space-y-3 text-slate-400">
          <li class="flex items-start gap-3"><i class="fa-solid fa-location-dot mt-1 text-teal-400"></i> شارع الأطباء، بناية الأمل، الطابق الثاني</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-phone text-teal-400"></i> <span dir="ltr">0000 000 0000</span></li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-envelope text-teal-400"></i> info@smile-clinic.com</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10 py-5 text-center text-sm text-slate-500">
      © {{ year }} عيادة الابتسامة. جميع الحقوق محفوظة.
    </div>
  </footer>
</template>