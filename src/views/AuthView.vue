<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

type Mode = 'login' | 'register'
const route = useRoute()

const mode = ref<Mode>(route.query.mode === 'register' ? 'register' : 'login')
// إذا ضغط المستخدم "سجل الآن" أو "تسجيل الدخول" وهو في نفس الصفحة
watch(() => route.query.mode, (m) => (mode.value = m === 'register' ? 'register' : 'login'))

const form = reactive({ name: '', phone: '', email: '', password: '', confirm: '', agree: false })
const errors = reactive<Record<string, string>>({})
const showPass = ref(false)
const loading = ref(false)
const done = ref(false)

watch(mode, () => {
  Object.keys(errors).forEach((k) => delete errors[k])
  done.value = false
})

function validate() {
  const e: Record<string, string> = {}
  if (mode.value === 'register') {
    if (form.name.trim().length < 3) e.name = 'الرجاء إدخال اسمك الكامل'
    if (!/^[+]?[\d\s-]{9,15}$/.test(form.phone.trim())) e.phone = 'أدخل رقم هاتف صحيح'
    if (form.confirm !== form.password) e.confirm = 'كلمتا المرور غير متطابقتين'
    if (!form.agree) e.agree = 'يجب الموافقة على الشروط والأحكام'
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'أدخل بريداً إلكترونياً صحيحاً'
  if (form.password.length < 6) e.password = 'كلمة المرور 6 أحرف على الأقل'
  Object.keys(errors).forEach((k) => delete errors[k])
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

function submit() {
  if (!validate()) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    done.value = true // محاكاة نجاح العملية
  }, 1200)
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 md:py-16">
    <div v-motion-pop class="grid overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-300/50 ring-1 ring-slate-100 lg:grid-cols-2">
      <!-- لوحة جانبية -->
      <aside class="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-teal-600 via-teal-700 to-cyan-800 p-10 text-white lg:flex">
        <div class="pointer-events-none absolute -top-16 -end-16 size-72 rounded-full bg-white/10 blur-2xl"></div>
        <div class="relative">
          <span class="grid size-14 place-items-center rounded-2xl bg-white/15 text-2xl"><i class="fa-solid fa-tooth"></i></span>
          <h2 class="mt-6 text-3xl font-black leading-snug">مرحباً بك في <br />عيادة الابتسامة</h2>
          <p class="mt-3 text-teal-100">أنشئ حسابك لتتابع مواعيدك وسجلك العلاجي بسهولة.</p>
        </div>
        <ul class="relative space-y-4">
          <li class="flex items-center gap-3"><i class="fa-solid fa-circle-check text-emerald-300"></i> إدارة وتعديل مواعيدك</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-circle-check text-emerald-300"></i> تذكير قبل الموعد</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-circle-check text-emerald-300"></i> عروض وخصومات حصرية</li>
        </ul>
      </aside>

      <!-- النموذج -->
      <div class="p-6 sm:p-10">
        <div class="mb-8 grid grid-cols-2 rounded-full bg-slate-100 p-1.5 font-bold">
          <button class="rounded-full py-2.5 transition" :class="mode === 'login' ? 'bg-white text-teal-700 shadow' : 'text-slate-500'" @click="mode = 'login'">تسجيل الدخول</button>
          <button class="rounded-full py-2.5 transition" :class="mode === 'register' ? 'bg-white text-teal-700 shadow' : 'text-slate-500'" @click="mode = 'register'">إنشاء حساب</button>
        </div>

        <div v-if="done" class="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-700">
          <i class="fa-solid fa-circle-check text-xl"></i>
          {{ mode === 'login' ? 'تم تسجيل الدخول بنجاح (محاكاة).' : 'تم إنشاء حسابك بنجاح (محاكاة).' }}
        </div>

        <Transition name="fade" mode="out-in">
          <form :key="mode" class="space-y-4" novalidate @submit.prevent="submit">
            <h1 class="text-2xl font-extrabold text-slate-900">{{ mode === 'login' ? 'أهلاً بعودتك 👋' : 'أنشئ حسابك الجديد' }}</h1>

            <template v-if="mode === 'register'">
              <div>
                <label class="mb-1.5 block font-bold text-slate-700" for="a-name">الاسم الكامل</label>
                <input id="a-name" v-model="form.name" type="text" class="input-field" placeholder="الاسم الكامل" />
                <p v-if="errors.name" class="mt-1 text-sm text-rose-500">{{ errors.name }}</p>
              </div>
              <div>
                <label class="mb-1.5 block font-bold text-slate-700" for="a-phone">رقم الهاتف</label>
                <input id="a-phone" v-model="form.phone" type="tel" dir="ltr" class="input-field text-right" placeholder="07xx xxx xxxx" />
                <p v-if="errors.phone" class="mt-1 text-sm text-rose-500">{{ errors.phone }}</p>
              </div>
            </template>

            <div>
              <label class="mb-1.5 block font-bold text-slate-700" for="a-email">البريد الإلكتروني</label>
              <input id="a-email" v-model="form.email" type="email" dir="ltr" class="input-field text-right" placeholder="name@example.com" />
              <p v-if="errors.email" class="mt-1 text-sm text-rose-500">{{ errors.email }}</p>
            </div>

            <div>
              <label class="mb-1.5 block font-bold text-slate-700" for="a-pass">كلمة المرور</label>
              <div class="relative">
                <input id="a-pass" v-model="form.password" :type="showPass ? 'text' : 'password'" dir="ltr" class="input-field pe-12 text-right" placeholder="••••••••" />
                <button type="button" class="absolute inset-y-0 end-0 px-4 text-slate-400 hover:text-teal-600" :aria-label="showPass ? 'إخفاء' : 'إظهار'" @click="showPass = !showPass">
                  <i :class="['fa-solid', showPass ? 'fa-eye-slash' : 'fa-eye']"></i>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-sm text-rose-500">{{ errors.password }}</p>
            </div>

            <div v-if="mode === 'register'">
              <label class="mb-1.5 block font-bold text-slate-700" for="a-conf">تأكيد كلمة المرور</label>
              <input id="a-conf" v-model="form.confirm" :type="showPass ? 'text' : 'password'" dir="ltr" class="input-field text-right" placeholder="••••••••" />
              <p v-if="errors.confirm" class="mt-1 text-sm text-rose-500">{{ errors.confirm }}</p>
            </div>

            <div v-if="mode === 'login'" class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 text-slate-600"><input type="checkbox" class="size-4 accent-teal-600" /> تذكرني</label>
              <a href="#" class="font-bold text-teal-600 hover:underline">نسيت كلمة المرور؟</a>
            </div>

            <div v-else>
              <label class="flex items-center gap-2 text-sm text-slate-600">
                <input v-model="form.agree" type="checkbox" class="size-4 accent-teal-600" /> أوافق على الشروط والأحكام وسياسة الخصوصية
              </label>
              <p v-if="errors.agree" class="mt-1 text-sm text-rose-500">{{ errors.agree }}</p>
            </div>

            <button type="submit" :disabled="loading" class="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
              <i v-if="loading" class="fa-solid fa-spinner fa-spin"></i>
              {{ loading ? 'يرجى الانتظار...' : mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب' }}
            </button>

            <p class="text-center text-slate-500">
              {{ mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟' }}
              <button type="button" class="font-bold text-teal-600 hover:underline" @click="mode = mode === 'login' ? 'register' : 'login'">
                {{ mode === 'login' ? 'أنشئ حساباً جديداً' : 'سجّل الدخول' }}
              </button>
            </p>
          </form>
        </Transition>
      </div>
    </div>
  </div>
</template>