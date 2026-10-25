<script setup lang="ts">
defineProps<{ badge?: string; title: string; subtitle?: string }>()
</script>

<template>
  <div v-motion-slide-visible-once-bottom class="mx-auto mb-14 max-w-2xl text-center">
    <span v-if="badge" class="mb-3 inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-bold text-teal-700">{{ badge }}</span>
    <h2 class="text-3xl font-extrabold text-slate-900 md:text-4xl">{{ title }}</h2>
    <div class="mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-l from-teal-400 to-cyan-500"></div>
    <p v-if="subtitle" class="mt-4 text-lg leading-relaxed text-slate-500">{{ subtitle }}</p>
  </div>
</template>