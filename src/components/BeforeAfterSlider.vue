<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ before: string; after: string; title: string }>()
const pos = ref(50)
</script>

<template>
  <div class="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-100">
    <!-- dir=ltr لأن حقل range ينعكس في RTL: "قبل" يظهر يميناً و"بعد" يساراً -->
    <div class="relative aspect-4/3 select-none overflow-hidden" dir="ltr">
      <img :src="after" alt="بعد العلاج" loading="lazy" class="absolute inset-0 size-full object-cover" />
      <img
        :src="before"
        alt="قبل العلاج"
        loading="lazy"
        class="absolute inset-0 size-full object-cover"
        :style="{ clipPath: `inset(0 0 0 ${pos}%)` }"
      />
      <span class="absolute right-3 top-3 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-bold text-white">قبل</span>
      <span class="absolute left-3 top-3 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white">بعد</span>

      <div class="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lg" :style="{ left: pos + '%' }">
        <span class="absolute top-1/2 left-1/2 grid size-10 -translate-1/2 place-items-center rounded-full bg-white text-teal-600 shadow-xl">
          <i class="fa-solid fa-arrows-left-right"></i>
        </span>
      </div>

      <input v-model.number="pos" type="range" min="0" max="100" aria-label="مقارنة قبل وبعد" class="absolute inset-0 size-full cursor-ew-resize opacity-0" />
    </div>
    <div class="p-5 text-center font-bold text-slate-800">{{ title }}</div>
  </div>
</template>