<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const types = ['تجميل', 'تقويم', 'زراعة', 'تنظيف', 'فحص عام']
const times = ['09:00 ص', '10:00 ص', '11:00 ص', '12:00 م', '04:00 م', '05:00 م', '06:00 م']

const form = reactive({ name: '', phone: '', date: '', time: '', type: '', notes: '' })
const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const done = ref(false)
const ref_no = ref(0)

// اختيار النوع تلقائياً إذا جاء من كرت الخدمة (/booking?type=تجميل)
const q = route.query.type
if (typeof q === 'string' && types.includes(q)) form.type = q

// تاريخ اليوم بالتوقيت المحلي
const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)

const prettyDate = computed(() => (form.date ? new Date(form.date).toLocaleDateString('ar', { dateStyle: 'full' }) : ''))

function validate() {
  const e: Record<string, string> = {}
  if (form.name.trim().length < 3) e.name = 'الرجاء إدخال الاسم الكامل'
  if (!/^[+]?[\d\s-]{9,15}$/.test(form.phone.trim())) e.phone = 'أدخل رقم هاتف صحيح'
  if (!form.date) e.date = 'اختر تاريخ الحجز'
  else if (form.date < today) e.date = 'لا يمكن اختيار تاريخ سابق'
  if (!form.type) e.type = 'اختر نوع الحجز'
  Object.keys(errors).forEach((k) => delete errors[k])
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

function submit() {
  if (!validate()) return
  loading.value = true
  // محاكاة الإرسال (واجهة أمامية فقط)
  setTimeout(() => {
    loading.value = false
    ref_no.value = Math.floor(100000 + Math.random() * 900000)
    done.value = true
  }, 1200)
}

function reset() {
  Object.assign(form, { name: '', phone: '', date: '', time: '', type: '', notes: '' })
  done.value = false
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-5 py-12 md:py-16">
    <div v-motion-slide-bottom class="mx-auto mb-12 max-w-2xl text-center">
      <span class="mb-3 inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-bold text-teal-700">حجز موعد</span>
      <h1 class="text-4xl font-black text-slate-900">احجز موعدك بسهولة</h1>
      <p class="mt-3 text-lg text-slate-500">املأ النموذج وسنتواصل معك لتأكيد الموعد خلال ساعات.</p>
    </div>

    <div class="grid gap-8 lg:grid-cols-5">
      <!-- معلومات جانبية -->
      <aside v-motion-slide-bottom :delay="150" class="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-teal-600 to-cyan-800 p-8 text-white lg:col-span-2">
        <div class="pointer-events-none absolute -bottom-20 -start-20 size-72 rounded-full bg-white/10 blur-2xl"></div>
        <h2 class="relative mb-6 text-2xl font-extrabold">معلومات مفيدة</h2>
        <ul class="relative space-y-5">
          <li class="flex gap-4"><span class="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15"><i class="fa-solid fa-clock"></i></span><div><b>ساعات الدوام</b><p class="text-sm text-teal-100">السبت - الخميس: 9 ص - 8 م</p></div></li>
          <li class="flex gap-4"><span class="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15"><i class="fa-solid fa-phone"></i></span><div><b>اتصل بنا</b><p class="text-sm text-teal-100" dir="ltr">0000 000 0000</p></div></li>
          <li class="flex gap-4"><span class="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15"><i class="fa-solid fa-location-dot"></i></span><div><b>العنوان</b><p class="text-sm text-teal-100">شارع الأطباء، بناية الأمل، الطابق الثاني</p></div></li>
          <li class="flex gap-4"><span class="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15"><i class="fa-solid fa-gift"></i></span><div><b>فحص أولي مجاني</b><p class="text-sm text-teal-100">لجميع المرضى الجدد.</p></div></li>
        </ul>
      </aside>

      <!-- النموذج / رسالة النجاح -->
      <div v-motion-slide-bottom :delay="250" class="rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-100 md:p-10 lg:col-span-3">
        <Transition name="fade" mode="out-in">
          <div v-if="done" key="ok" class="py-8 text-center">
            <span class="mx-auto mb-5 grid size-20 place-items-center rounded-full bg-emerald-100 text-4xl text-emerald-500"><i class="fa-solid fa-check"></i></span>
            <h2 class="text-2xl font-extrabold text-slate-900">تم استلام طلب الحجز!</h2>
            <p class="mt-2 text-slate-500">شكراً {{ form.name }}، سنتواصل معك قريباً لتأكيد الموعد.</p>
            <dl class="mx-auto mt-6 max-w-sm space-y-2 rounded-2xl bg-slate-50 p-5 text-start">
              <div class="flex justify-between"><dt class="text-slate-500">رقم الطلب</dt><dd class="font-bold">#{{ ref_no }}</dd></div>
              <div class="flex justify-between"><dt class="text-slate-500">نوع الحجز</dt><dd class="font-bold">{{ form.type }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-slate-500">التاريخ</dt><dd class="font-bold">{{ prettyDate }}</dd></div>
              <div v-if="form.time" class="flex justify-between"><dt class="text-slate-500">الوقت</dt><dd class="font-bold">{{ form.time }}</dd></div>
            </dl>
            <button class="btn-outline mt-8" @click="reset">حجز موعد جديد</button>
          </div>

          <form v-else key="form" class="grid gap-5 sm:grid-cols-2" novalidate @submit.prevent="submit">
            <div class="sm:col-span-2">
              <label class="mb-2 block font-bold text-slate-700" for="name">الاسم الكامل</label>
              <input id="name" v-model="form.name" type="text" class="input-field" placeholder="مثال: أحمد محمد" />
              <p v-if="errors.name" class="mt-1 text-sm text-rose-500">{{ errors.name }}</p>
            </div>

            <div>
              <label class="mb-2 block font-bold text-slate-700" for="phone">رقم الهاتف</label>
              <input id="phone" v-model="form.phone" type="tel" dir="ltr" inputmode="tel" class="input-field text-right" placeholder="07xx xxx xxxx" />
              <p v-if="errors.phone" class="mt-1 text-sm text-rose-500">{{ errors.phone }}</p>
            </div>

            <div>
              <label class="mb-2 block font-bold text-slate-700" for="type">نوع الحجز</label>
              <select id="type" v-model="form.type" class="input-field">
                <option value="" disabled>اختر نوع الخدمة</option>
                <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
              </select>
              <p v-if="errors.type" class="mt-1 text-sm text-rose-500">{{ errors.type }}</p>
            </div>

            <div>
              <label class="mb-2 block font-bold text-slate-700" for="date">التاريخ</label>
              <input id="date" v-model="form.date" type="date" :min="today" class="input-field" />
              <p v-if="errors.date" class="mt-1 text-sm text-rose-500">{{ errors.date }}</p>
            </div>

            <div>
              <label class="mb-2 block font-bold text-slate-700" for="time">الوقت المفضل (اختياري)</label>
              <select id="time" v-model="form.time" class="input-field">
                <option value="">أي وقت مناسب</option>
                <option v-for="t in times" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>

            <div class="sm:col-span-2">
              <label class="mb-2 block font-bold text-slate-700" for="notes">ملاحظات (اختياري)</label>
              <textarea id="notes" v-model="form.notes" rows="3" class="input-field resize-none" placeholder="اكتب أي تفاصيل تود إخبارنا بها..."></textarea>
            </div>

            <button type="submit" :disabled="loading" class="btn-primary sm:col-span-2 disabled:cursor-not-allowed disabled:opacity-70">
              <i v-if="loading" class="fa-solid fa-spinner fa-spin"></i>
              <i v-else class="fa-solid fa-calendar-check"></i>
              {{ loading ? 'جارٍ الإرسال...' : 'تأكيد الحجز' }}
            </button>
          </form>
        </Transition>
      </div>
    </div>
  </div>
</template>