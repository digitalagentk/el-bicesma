<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

interface Msg {
  id: number
  from: 'bot' | 'user'
  text: string
  time: string
  link?: { to: string; label: string }
}

const open = ref(false)
const input = ref('')
const typing = ref(false)
const unread = ref(1)
const listEl = ref<HTMLElement | null>(null)
let nextId = 0

const now = () => new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })

const messages = ref<Msg[]>([
  { id: nextId++, from: 'bot', text: 'مرحباً بك في عيادة الابتسامة 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟', time: now() },
])

const quick = ['أريد حجز موعد', 'ما هي خدماتكم؟', 'ساعات الدوام', 'الأسعار']

// ردود وهمية تعتمد على كلمات مفتاحية
const replies: { keys: string[]; text: string; link?: Msg['link'] }[] = [
  { keys: ['حجز', 'موعد', 'احجز'], text: 'يسعدني ذلك! يمكنك حجز موعدك بسهولة من صفحة الحجز، وسنؤكده معك هاتفياً.', link: { to: '/booking', label: 'اذهب لصفحة الحجز' } },
  { keys: ['خدمات', 'خدمة', 'تجميل', 'تقويم', 'زراعة', 'تنظيف'], text: 'نقدم: تجميل الأسنان، التقويم، الزراعة، التنظيف والتبييض، الفحص العام، وأسنان الأطفال.' },
  { keys: ['دوام', 'ساعات', 'وقت', 'مفتوح'], text: 'نعمل من السبت إلى الخميس من 9 صباحاً حتى 8 مساءً، والجمعة مغلق، والطوارئ متاحة دائماً.' },
  { keys: ['سعر', 'أسعار', 'تكلفة', 'كم'], text: 'تختلف الأسعار حسب الحالة، والفحص الأولي مجاني. نوفر أيضاً خطط تقسيط مرنة.' },
  { keys: ['رقم', 'هاتف', 'اتصال', 'تواصل', 'عنوان', 'موقع'], text: 'يمكنك التواصل معنا عبر الهاتف الموجود في أسفل الصفحة، أو زيارتنا في بناية الأمل، الطابق الثاني.' },
  { keys: ['مرحبا', 'السلام', 'هلا', 'أهلا'], text: 'أهلاً وسهلاً بك! تفضل بسؤالك وسأكون سعيداً بخدمتك.' },
]
const fallback = 'شكراً لسؤالك! سيتواصل معك أحد موظفينا قريباً، أو يمكنك حجز موعد وسنجيبك على كل استفساراتك.'

function scrollDown() {
  nextTick(() => listEl.value?.scrollTo({ top: listEl.value.scrollHeight, behavior: 'smooth' }))
}

function send(text = input.value) {
  const t = text.trim()
  if (!t || typing.value) return
  messages.value.push({ id: nextId++, from: 'user', text: t, time: now() })
  input.value = ''
  typing.value = true
  scrollDown()

  const hit = replies.find((r) => r.keys.some((k) => t.includes(k)))
  setTimeout(() => {
    typing.value = false
    messages.value.push({ id: nextId++, from: 'bot', text: hit?.text ?? fallback, link: hit?.link, time: now() })
    scrollDown()
  }, 900 + Math.random() * 600)
}

watch(open, (v) => {
  if (v) {
    unread.value = 0
    scrollDown()
  }
})
</script>

<template>
  <div>
    <!-- نافذة الدردشة -->
    <Transition name="chat">
      <section
        v-if="open"
        class="fixed bottom-24 right-5 z-50 flex h-[32rem] max-h-[calc(100vh-8rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200"
      >
        <header class="flex items-center gap-3 bg-linear-to-l from-teal-600 to-cyan-600 p-4 text-white">
          <span class="relative grid size-11 place-items-center rounded-full bg-white/20 text-xl">
            <i class="fa-solid fa-robot"></i>
            <span class="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-teal-600 bg-emerald-400"></span>
          </span>
          <div class="flex-1 leading-tight">
            <b class="block">المساعد الذكي</b>
            <small class="text-teal-100">متصل الآن · يرد خلال ثوانٍ</small>
          </div>
          <button class="grid size-9 place-items-center rounded-full hover:bg-white/20" aria-label="إغلاق" @click="open = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </header>

        <div ref="listEl" class="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
          <div v-for="m in messages" :key="m.id" class="flex" :class="m.from === 'user' ? 'justify-end' : 'justify-start'">
            <div class="max-w-[85%]">
              <div
                class="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                :class="m.from === 'user' ? 'rounded-ee-sm bg-teal-600 text-white' : 'rounded-es-sm bg-white text-slate-700 shadow-xs'"
              >
                {{ m.text }}
                <RouterLink v-if="m.link" :to="m.link.to" class="mt-2 block rounded-lg bg-teal-50 px-3 py-1.5 text-center font-bold text-teal-700 hover:bg-teal-100" @click="open = false">
                  {{ m.link.label }}
                </RouterLink>
              </div>
              <span class="mt-1 block px-1 text-[11px] text-slate-400">{{ m.time }}</span>
            </div>
          </div>

          <div v-if="typing" class="flex">
            <div class="flex gap-1 rounded-2xl rounded-es-sm bg-white px-4 py-3 shadow-xs">
              <span class="size-2 animate-bounce rounded-full bg-teal-400"></span>
              <span class="size-2 animate-bounce rounded-full bg-teal-400 [animation-delay:150ms]"></span>
              <span class="size-2 animate-bounce rounded-full bg-teal-400 [animation-delay:300ms]"></span>
            </div>
          </div>
        </div>

        <div class="flex gap-2 overflow-x-auto border-t border-slate-100 bg-white px-3 pt-3">
          <button
            v-for="q in quick"
            :key="q"
            class="shrink-0 rounded-full border border-teal-200 px-3 py-1.5 text-xs font-bold text-teal-700 hover:bg-teal-50"
            @click="send(q)"
          >
            {{ q }}
          </button>
        </div>

        <form class="flex gap-2 bg-white p-3" @submit.prevent="send()">
          <input v-model="input" type="text" placeholder="اكتب رسالتك..." class="input-field py-2.5 text-sm" />
          <button type="submit" class="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-600 text-white transition hover:bg-teal-700" aria-label="إرسال">
            <i class="fa-solid fa-paper-plane -scale-x-100"></i>
          </button>
        </form>
      </section>
    </Transition>

    <!-- الزر العائم (أسفل يمين الشاشة) -->
    <div v-motion-pop :delay="800" class="fixed bottom-5 right-5 z-50">
      <button
        class="relative grid size-15 place-items-center rounded-full bg-linear-to-br from-teal-500 to-cyan-600 text-2xl text-white shadow-2xl shadow-teal-600/40 transition hover:scale-110 active:scale-95"
        aria-label="فتح الدردشة"
        @click="open = !open"
      >
        <span v-if="!open" class="absolute inset-0 animate-ping rounded-full bg-teal-400/40"></span>
        <i :class="['fa-solid relative', open ? 'fa-xmark' : 'fa-comments']"></i>
        <span v-if="unread && !open" class="absolute -top-1 -start-1 grid size-6 place-items-center rounded-full bg-rose-500 text-xs font-bold">{{ unread }}</span>
      </button>
    </div>
  </div>
</template>