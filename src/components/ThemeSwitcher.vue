<template>
  <el-dropdown trigger="click" @command="setTheme">
    <el-button circle>
      <span class="text-lg">{{ themeConfig[currentTheme].icon }}</span>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(config, key) in themeConfig"
          :key="key"
          :command="key"
          :class="{ 'is-active': currentTheme === key }"
        >
          <span class="mr-2">{{ config.icon }}</span>
          {{ config.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const { currentTheme, setTheme, themeConfig } = useTheme()
</script>

<style scoped>
:deep(.is-active) {
  color: var(--el-color-primary);
  font-weight: bold;
}
</style>
