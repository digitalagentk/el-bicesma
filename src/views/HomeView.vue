<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useIntersectionObserver } from '@vueuse/core'
import SectionTitle from '../components/SectionTitle.vue'

/* ===== البيانات ===== */
const services = [
  { icon: 'fa-wand-magic-sparkles', title: 'تجميل الأسنان', text: 'ابتسامة هوليود، عدسات لاصقة (فينير) وتبييض احترافي بنتائج فورية.', type: 'تجميل' },
  { icon: 'fa-face-smile', title: 'تقويم الأسنان', text: 'تقويم معدني وشفاف لجميع الأعمار بخطة علاج مخصصة لكل مريض.', type: 'تقويم' },
  { icon: 'fa-tooth', title: 'زراعة الأسنان', text: 'زراعة آمنة بأحدث الأنظمة العالمية لتعويض الأسنان المفقودة بثبات دائم.', type: 'زراعة' },
  { icon: 'fa-droplet', title: 'تنظيف وتبييض', text: 'إزالة الجير والتصبغات وتلميع الأسنان للحفاظ على لثة وأسنان صحية.', type: 'تنظيف' },
  { icon: 'fa-stethoscope', title: 'فحص وتشخيص', text: 'فحص شامل بالأشعة الرقمية وخطة علاج واضحة بدون مفاجآت.', type: 'فحص عام' },
  { icon: 'fa-child', title: 'أسنان الأطفال', text: 'بيئة مرحة وطبيب متخصص يجعل الزيارة تجربة ممتعة لطفلك.', type: 'فحص عام' },
]

const features = [
  { icon: 'fa-user-doctor', title: 'أطباء ذوو خبرة', text: 'نخبة من الاستشاريين والأخصائيين الحاصلين على شهادات عالمية.' },
  { icon: 'fa-microscope', title: 'أحدث التقنيات', text: 'أشعة ثلاثية الأبعاد وماسح ضوئي رقمي وليزر لعلاج شبه بلا ألم.' },
  { icon: 'fa-shield-heart', title: 'تعقيم وسلامة', text: 'بروتوكولات تعقيم صارمة وأدوات معقمة ومخصصة لكل مريض.' },
  { icon: 'fa-hand-holding-dollar', title: 'أسعار شفافة', text: 'خطط تقسيط مرنة وتكلفة واضحة قبل بدء العلاج.' },
]

const stats = [
  { value: 15000, suffix: '+', label: 'مريض سعيد', icon: 'fa-face-smile' },
  { value: 15, suffix: '+', label: 'سنة من الخبرة', icon: 'fa-award' },
  { value: 12, suffix: '', label: 'طبيباً متخصصاً', icon: 'fa-user-doctor' },
  { value: 98, suffix: '%', label: 'نسبة رضا المرضى', icon: 'fa-heart' },
]

// استبدل الصور بصورك الحقيقية (مثلاً من public/images)
// صور Pexels (مجانية للاستخدام التجاري وبدون إسناد)
const px = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

const src = (seed: number, w = 1400, h = 900) =>
  `https://images.pexels.com/photos/${seed}/pexels-photo-${seed}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}`

const gallery = [
  { id: 305564, seed: 305564, title: 'كرسي الأسنان الحديث', cls: 'row-span-2' },
  { id: 305568, seed: 305568, title: 'غرفة العلاج', cls: '' },
  { id: 3845983, seed: 3845983, title: 'استشارة قبل العلاج', cls: '' },
  { id: 7789680, seed: 7789680, title: 'إضاءة الفحص المتطورة', cls: 'md:col-span-2' },
  { id: 305566, seed: 305566, title: 'أدوات معقمة وجاهزة', cls: '' },
  { id: 6627574, seed: 6627574, title: 'ابتسامة مشرقة بعد العلاج', cls: '' },
  { id: 3845747, seed: 3845747, title: 'فحص دقيق بأحدث الأدوات', cls: '' },
]

const testimonials = [
  { name: 'سارة العلي', job: 'معلمة', img: 47, text: 'تجربة رائعة من أول زيارة، الطبيب شرح لي كل خطوة ونتيجة التجميل فاقت توقعاتي.' },
  { name: 'محمد الحسني', job: 'مهندس', img: 12, text: 'زراعة الأسنان تمت بدون ألم تقريباً، والمتابعة بعد العملية كانت ممتازة.' },
  { name: 'زينب الكعبي', job: 'أم لطفلين', img: 5, text: 'أطفالي صاروا يطلبون زيارة العيادة! تعامل لطيف جداً وبيئة نظيفة ومرحة.' },
]

/* ===== عدّاد الإحصائيات عند الظهور ===== */
const statsEl = ref<HTMLElement | null>(null)
const counts = ref(stats.map(() => 0))

const { stop } = useIntersectionObserver(statsEl, ([entry]) => {
  if (entry?.isIntersecting) {
    runCounter()
    stop()
  }
})

function runCounter() {
  const duration = 1800
  const start = performance.now()
  const tick = (t: number) => {
    const p = Math.min((t - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    counts.value = stats.map((s) => Math.round(s.value * eased))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ===== معرض الصور (Lightbox) ===== */
const active = ref<(typeof gallery)[number] | null>(null)
const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (active.value = null)
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div>
    <!-- ================= Hero ================= -->
    <section class="px-4 pt-4 sm:px-6">
      <div class="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-linear-to-br from-teal-600 via-teal-700 to-cyan-800 text-white shadow-2xl shadow-teal-900/20 md:rounded-[3rem]">
        <div class="pointer-events-none absolute -top-24 -start-24 size-96 rounded-full bg-white/10 blur-2xl"></div>
        <div class="pointer-events-none absolute -bottom-32 -end-20 size-[28rem] rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div class="relative grid items-center gap-12 px-6 py-14 md:px-14 md:py-20 lg:grid-cols-2">
          <div>
            <span v-motion-fade :delay="100" class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
              <i class="fa-solid fa-circle-check text-emerald-300"></i>
              عيادة معتمدة · الفحص الأولي مجاني
            </span>

            <h1 v-motion-slide-bottom :delay="200" class="text-4xl font-black leading-tight md:text-6xl">
              ابتسامتك الجميلة <br />
              <span class="text-cyan-200">تبدأ من هنا</span>
            </h1>

            <p v-motion-slide-bottom :delay="350" class="mt-6 max-w-xl text-lg leading-relaxed text-teal-50/90">
              نجمع بين أحدث تقنيات طب الأسنان وفريق طبي متميز، لنمنحك رعاية دقيقة ومريحة وابتسامة تثق بها كل يوم.
            </p>

            <div v-motion-slide-bottom :delay="500" class="mt-9 flex flex-wrap gap-4">
              <RouterLink to="/booking" class="btn-white">
                احجز الآن <i class="fa-solid fa-arrow-left"></i>
              </RouterLink>
              <RouterLink :to="{ path: '/auth', query: { mode: 'register' } }" class="btn-ghost">
                سجل الآن <i class="fa-solid fa-user-plus"></i>
              </RouterLink>
            </div>

            <div v-motion-fade :delay="800" class="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
              <div><b class="block text-2xl font-black">+15K</b><span class="text-teal-100">مريض سعيد</span></div>
              <div><b class="block text-2xl font-black">4.9 <i class="fa-solid fa-star text-amber-300 text-lg"></i></b><span class="text-teal-100">تقييم المرضى</span></div>
              <div><b class="block text-2xl font-black">+15</b><span class="text-teal-100">سنة خبرة</span></div>
            </div>
          </div>

          <!-- العنصر البصري -->
          <div v-motion-pop :delay="300" class="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
            <div class="absolute inset-4 rounded-full border border-white/20"></div>
            <div class="absolute inset-0 grid place-items-center">
              <div class="animate-float grid size-72 place-items-center rounded-full bg-white/15 shadow-2xl ring-1 ring-white/30 backdrop-blur-xl">
                <i class="fa-solid fa-tooth text-[10rem] text-white drop-shadow-xl"></i>
              </div>
            </div>
            <div class="animate-float-slow absolute top-8 -start-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-slate-800 shadow-xl">
              <span class="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-500"><i class="fa-solid fa-star"></i></span>
              <div class="leading-tight"><b class="block">4.9 / 5</b><small class="text-slate-500">تقييم المرضى</small></div>
            </div>
            <div class="animate-float absolute bottom-10 -end-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-slate-800 shadow-xl">
              <span class="grid size-10 place-items-center rounded-xl bg-teal-100 text-teal-600"><i class="fa-solid fa-calendar-check"></i></span>
              <div class="leading-tight"><b class="block">حجز سريع</b><small class="text-slate-500">خلال دقيقة واحدة</small></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= الخدمات ================= -->
    <section class="mx-auto max-w-7xl px-5 py-24">
      <SectionTitle badge="خدماتنا" title="رعاية متكاملة لابتسامتك" subtitle="نقدم مجموعة شاملة من الخدمات العلاجية والتجميلية تحت سقف واحد." />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(s, i) in services" :key="s.title" v-motion-slide-visible-once-bottom :delay="(i % 3) * 120">
          <RouterLink
            :to="{ path: '/booking', query: { type: s.type } }"
            class="group block h-full rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-500/10"
          >
            <span class="mb-5 grid size-16 place-items-center rounded-2xl bg-linear-to-br from-teal-50 to-cyan-50 text-3xl text-teal-600 transition group-hover:from-teal-500 group-hover:to-cyan-600 group-hover:text-white">
              <i :class="['fa-solid', s.icon]"></i>
            </span>
            <h3 class="mb-2 text-xl font-extrabold text-slate-900">{{ s.title }}</h3>
            <p class="leading-relaxed text-slate-500">{{ s.text }}</p>
            <span class="mt-5 inline-flex items-center gap-2 font-bold text-teal-600">
              احجز الآن <i class="fa-solid fa-arrow-left transition group-hover:-translate-x-1"></i>
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ================= لماذا تختارنا + إحصائيات ================= -->
    <section class="bg-slate-50 py-24">
      <div class="mx-auto max-w-7xl px-5">
        <SectionTitle badge="لماذا تختارنا" title="نهتم بكل تفصيل في رحلتك العلاجية" subtitle="جودة، أمان، وراحة من لحظة دخولك العيادة حتى ابتسامتك الجديدة." />

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(f, i) in features" :key="f.title" v-motion-slide-visible-once-bottom :delay="i * 120" class="rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-slate-100">
            <span class="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-teal-100 text-2xl text-teal-600"><i :class="['fa-solid', f.icon]"></i></span>
            <h3 class="mb-2 text-lg font-extrabold text-slate-900">{{ f.title }}</h3>
            <p class="text-sm leading-relaxed text-slate-500">{{ f.text }}</p>
          </div>
        </div>

        <div ref="statsEl" class="mt-16 grid grid-cols-2 gap-6 rounded-[2rem] bg-linear-to-br from-teal-600 to-cyan-700 p-8 text-center text-white shadow-2xl shadow-teal-600/20 md:p-12 lg:grid-cols-4">
          <div v-for="(s, i) in stats" :key="s.label" v-motion-pop-visible-once :delay="i * 100">
            <i :class="['fa-solid mb-3 text-3xl text-teal-200', s.icon]"></i>
            <div class="text-4xl font-black md:text-5xl">{{ counts[i]?.toLocaleString('en-US') }}{{ s.suffix }}</div>
            <div class="mt-1 text-teal-100">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= معرض الصور ================= -->
    <section class="mx-auto max-w-7xl px-5 py-24">
      <SectionTitle badge="معرض الصور" title="جولة داخل عيادتنا" subtitle="مساحات حديثة ومريحة صُممت لتمنحك أفضل تجربة علاج." />
      <div class="grid auto-rows-[12rem] grid-cols-2 gap-4 md:auto-rows-[15rem] md:grid-cols-3">
  <div v-for="(g, i) in gallery" :key="g.id" v-motion-pop-visible-once :delay="(i % 3) * 120" :class="g.cls">
    <button type="button" class="group relative block size-full overflow-hidden rounded-3xl" @click="active = g">
      <img :src="px(g.id)" :alt="g.title" loading="lazy" class="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <span class="absolute inset-0 flex items-end bg-linear-to-t from-slate-900/70 via-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span class="font-bold text-white"><i class="fa-solid fa-expand ms-1"></i> {{ g.title }}</span>
      </span>
    </button>
  </div>
</div>
    </section>

    <!-- ================= آراء المرضى ================= -->
    <section class="bg-linear-to-b from-teal-50 to-white py-24">
      <div class="mx-auto max-w-7xl px-5">
        <SectionTitle badge="آراء المرضى" title="ماذا يقول مرضانا عنا" subtitle="ثقتكم هي أكبر إنجازاتنا." />
        <div class="grid gap-6 md:grid-cols-3">
          <div v-for="(t, i) in testimonials" :key="t.name" v-motion-slide-visible-once-bottom :delay="i * 150">
            <figure class="relative h-full rounded-3xl bg-white p-8 shadow-lg shadow-teal-900/5 ring-1 ring-slate-100">
              <i class="fa-solid fa-quote-right absolute end-6 top-6 text-4xl text-teal-100"></i>
              <div class="mb-4 flex gap-1 text-amber-400"><i v-for="n in 5" :key="n" class="fa-solid fa-star"></i></div>
              <blockquote class="mb-6 leading-relaxed text-slate-600">{{ t.text }}</blockquote>
              <figcaption class="flex items-center gap-3">
                <img :src="`https://i.pravatar.cc/100?img=${t.img}`" :alt="t.name" class="size-12 rounded-full object-cover ring-2 ring-teal-200" />
                <div class="leading-tight"><b class="block text-slate-900">{{ t.name }}</b><small class="text-slate-500">{{ t.job }}</small></div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="px-4 pb-24 sm:px-6">
      <div v-motion-pop-visible-once class="mx-auto max-w-5xl rounded-[2rem] bg-linear-to-br from-teal-600 to-cyan-700 px-6 py-14 text-center text-white shadow-2xl shadow-teal-600/25">
        <h2 class="text-3xl font-black md:text-4xl">جاهز لابتسامة جديدة؟</h2>
        <p class="mx-auto mt-3 max-w-xl text-teal-50">احجز موعدك اليوم واحصل على فحص أولي مجاني مع خطة علاج واضحة.</p>
        <RouterLink to="/booking" class="btn-white mt-8">احجز موعدك الآن <i class="fa-solid fa-arrow-left"></i></RouterLink>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="active" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" @click="active = null">
          <figure class="relative max-w-4xl" @click.stop>
            <img :src="src(active.seed, 1400, 900)" :alt="active.title" class="max-h-[80vh] rounded-3xl object-contain shadow-2xl" />
            <figcaption class="mt-3 text-center font-bold text-white">{{ active.title }}</figcaption>
            <button class="absolute -top-3 -end-3 grid size-10 place-items-center rounded-full bg-white text-slate-800 shadow-lg" aria-label="إغلاق" @click="active = null">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </figure>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>