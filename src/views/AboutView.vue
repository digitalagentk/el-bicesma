<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionTitle from '../components/SectionTitle.vue'
import BeforeAfterSlider from '../components/BeforeAfterSlider.vue'

// استبدل الصور بصور الأطباء وحالات قبل/بعد الحقيقية
const img = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`

const doctors = [
  { name: 'د. أحمد الموسوي', role: 'استشاري زراعة وجراحة الفم', years: 18, img: 12, bio: 'أجرى أكثر من 3000 عملية زراعة ناجحة.' },
  { name: 'د. سارة العلي', role: 'أخصائية تجميل الأسنان', years: 12, img: 47, bio: 'خبيرة في تصميم الابتسامة والفينير.' },
  { name: 'د. محمد الحسني', role: 'استشاري تقويم الأسنان', years: 15, img: 33, bio: 'متخصص في التقويم الشفاف والمتحرك.' },
  { name: 'د. زينب الكعبي', role: 'أخصائية أسنان الأطفال', years: 9, img: 5, bio: 'تحول خوف الأطفال من الطبيب إلى متعة.' },
]

const values = [
  { icon: 'fa-bullseye', title: 'رسالتنا', text: 'تقديم رعاية أسنان آمنة وعالية الجودة بأسعار عادلة ولمسة إنسانية.' },
  { icon: 'fa-eye', title: 'رؤيتنا', text: 'أن نكون الوجهة الأولى لكل من يبحث عن ابتسامة صحية وجميلة.' },
  { icon: 'fa-heart', title: 'قيمنا', text: 'الأمانة، الشفافية، الاحترام، والتطوير المستمر لمهاراتنا وأجهزتنا.' },
]

const pairs = [
  { title: 'تجميل الأسنان بالفينير', before: img('ba1-before'), after: img('ba1-after') },
  { title: 'تقويم الأسنان الشفاف', before: img('ba2-before'), after: img('ba2-after') },
  { title: 'زراعة وتعويض الأسنان', before: img('ba3-before'), after: img('ba3-after') },
]
</script>

<template>
  <div>
    <!-- العنوان -->
    <section class="px-4 pt-4 sm:px-6">
      <div class="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-linear-to-br from-teal-600 to-cyan-800 px-6 py-16 text-center text-white md:py-20">
        <div class="pointer-events-none absolute -top-20 -end-20 size-80 rounded-full bg-white/10 blur-2xl"></div>
        <h1 v-motion-slide-bottom class="text-4xl font-black md:text-5xl">من نحن</h1>
        <p v-motion-slide-bottom :delay="150" class="mx-auto mt-4 max-w-2xl text-lg text-teal-50">
          قصة عيادة بدأت بحلم صغير، وأصبحت اليوم وجهة موثوقة لآلاف المرضى.
        </p>
      </div>
    </section>

    <!-- القصة -->
    <section class="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
      <div v-motion-slide-visible-once-bottom class="relative">
        <img :src="img('about-clinic-1')" alt="العيادة" loading="lazy" class="aspect-4/3 w-4/5 rounded-3xl object-cover shadow-2xl" />
        <img :src="img('about-clinic-2')" alt="فريق العمل" loading="lazy" class="absolute -bottom-8 end-0 aspect-square w-2/5 rounded-3xl border-8 border-white object-cover shadow-2xl" />
      </div>
      <div v-motion-slide-visible-once-bottom :delay="150">
        <span class="mb-3 inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-bold text-teal-700">قصتنا</span>
        <h2 class="text-3xl font-extrabold text-slate-900 md:text-4xl">أكثر من 15 عاماً في خدمة ابتسامتك</h2>
        <p class="mt-5 leading-loose text-slate-600">
          تأسست عيادة الابتسامة على فكرة بسيطة: أن يحصل كل مريض على علاج متقن في بيئة مريحة وبدون خوف. واليوم نضم نخبة من الأطباء
          والأخصائيين، ونستخدم أحدث الأجهزة الرقمية لنضمن لك دقة التشخيص ونتائج تدوم.
        </p>
        <ul class="mt-6 space-y-3 text-slate-700">
          <li class="flex items-center gap-3"><i class="fa-solid fa-circle-check text-teal-500"></i> فريق طبي حاصل على شهادات عالمية</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-circle-check text-teal-500"></i> أجهزة تصوير وتشخيص رقمية حديثة</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-circle-check text-teal-500"></i> ضمان على أعمال التجميل والزراعة</li>
        </ul>
      </div>
    </section>

    <!-- الرسالة والرؤية -->
    <section class="bg-slate-50 py-20">
      <div class="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3">
        <div v-for="(v, i) in values" :key="v.title" v-motion-pop-visible-once :delay="i * 120" class="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
          <span class="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-linear-to-br from-teal-500 to-cyan-600 text-2xl text-white"><i :class="['fa-solid', v.icon]"></i></span>
          <h3 class="mb-2 text-xl font-extrabold text-slate-900">{{ v.title }}</h3>
          <p class="leading-relaxed text-slate-500">{{ v.text }}</p>
        </div>
      </div>
    </section>

    <!-- الأطباء -->
    <section class="mx-auto max-w-7xl px-5 py-24">
      <SectionTitle badge="فريقنا" title="تعرّف على أطبائنا" subtitle="خبرة طويلة وعناية حقيقية بكل مريض." />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(d, i) in doctors" :key="d.name" v-motion-slide-visible-once-bottom :delay="i * 120">
          <article class="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/15">
            <div class="relative aspect-4/5 overflow-hidden">
              <img :src="`https://i.pravatar.cc/500?img=${d.img}`" :alt="d.name" loading="lazy" class="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span class="absolute bottom-3 start-3 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-lg">خبرة {{ d.years }} سنة</span>
            </div>
            <div class="p-5 text-center">
              <h3 class="text-lg font-extrabold text-slate-900">{{ d.name }}</h3>
              <p class="mt-1 text-sm font-bold text-teal-600">{{ d.role }}</p>
              <p class="mt-2 text-sm text-slate-500">{{ d.bio }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- قبل وبعد -->
    <section class="bg-linear-to-b from-teal-50 to-white py-24">
      <div class="mx-auto max-w-7xl px-5">
        <SectionTitle badge="نتائج حقيقية" title="قبل وبعد" subtitle="حرّك المؤشر يميناً ويساراً لتشاهد الفرق بنفسك." />
        <div class="grid gap-6 md:grid-cols-3">
          <div v-for="(p, i) in pairs" :key="p.title" v-motion-pop-visible-once :delay="i * 150">
            <BeforeAfterSlider :before="p.before" :after="p.after" :title="p.title" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 pb-24 sm:px-6">
      <div v-motion-pop-visible-once class="mx-auto max-w-5xl rounded-[2rem] bg-linear-to-br from-teal-600 to-cyan-700 px-6 py-14 text-center text-white shadow-2xl shadow-teal-600/25">
        <h2 class="text-3xl font-black">ابدأ رحلة ابتسامتك اليوم</h2>
        <RouterLink to="/booking" class="btn-white mt-8">احجز موعدك <i class="fa-solid fa-arrow-left"></i></RouterLink>
      </div>
    </section>
  </div>
</template>