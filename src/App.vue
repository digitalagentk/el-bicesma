<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ChatWidget from './components/ChatWidget.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white text-slate-700">
    <Navbar />

    <main class="flex-1 pt-20">
      <RouterView v-slot="{ Component, route }">
        <Transition :name="route.meta.transition ?? 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <Footer />
    <ChatWidget />
  </div>
</template>