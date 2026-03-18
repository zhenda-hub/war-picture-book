<template>
  <AppLayout />
</template>

<script setup>
import { onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useTheme } from '@/composables/useTheme'

// 初始化主题
const { setTheme } = useTheme()
onMounted(() => {
  const saved = localStorage.getItem('war-theme') || 'classical'
  setTheme(saved)
})
</script>

<style>
@import '@/assets/styles/custom.css';
</style>
