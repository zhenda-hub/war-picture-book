<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <span class="logo-icon">⚔️</span>
          <span class="logo-text">历史战役百科</span>
        </router-link>

        <!-- 桌面端菜单 -->
        <el-menu
          v-show="!isMobile"
          :default-active="activeMenu"
          mode="horizontal"
          :ellipsis="false"
          class="nav-menu desktop-menu"
          router
        >
          <el-menu-item
            v-for="cat in categories"
            :key="cat.id"
            :index="`/category/${cat.id}`"
          >
            <template #title>
              <span class="nav-icon">{{ cat.icon }}</span>
              <span class="nav-text">{{ cat.name }}</span>
            </template>
          </el-menu-item>
        </el-menu>

        <!-- 主题切换器 -->
        <ThemeSwitcher />

        <!-- 移动端汉堡按钮 -->
        <button
          v-show="isMobile"
          class="mobile-trigger"
          @click="drawerVisible = true"
          aria-label="打开菜单"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- 移动端抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      direction="rtl"
      :with-header="false"
      size="280px"
      class="mobile-drawer"
    >
      <div class="drawer-content">
        <div class="drawer-header">
          <span class="drawer-title">选择时期</span>
          <button class="close-btn" @click="drawerVisible = false" aria-label="关闭菜单">✕</button>
        </div>
        <el-menu
          :default-active="activeMenu"
          mode="vertical"
          router
          @select="drawerVisible = false"
          class="drawer-menu"
        >
          <el-menu-item
            v-for="cat in categories"
            :key="cat.id"
            :index="`/category/${cat.id}`"
          >
            <span class="mobile-nav-icon">{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-drawer>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { categories } from '@/composables/useBattleData.js'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
const drawerVisible = ref(false)
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.app-header {
  background: var(--theme-bg);
  border-bottom: 1px solid var(--theme-border);
  padding: 0.75rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s, border-color 0.3s;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  background: linear-gradient(135deg, var(--theme-primary-light, var(--theme-primary)) 0%, var(--theme-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 桌面端菜单样式 */
.nav-menu {
  border: none;
  background: transparent;
  flex: 1;
}

.nav-menu.el-menu--horizontal {
  border-bottom: none;
  display: flex;
  justify-content: flex-end;
}

.nav-menu :deep(.el-menu-item) {
  padding: 0.5rem 1rem;
  color: var(--theme-text);
  background: var(--theme-bg-secondary);
  border-radius: 8px;
  margin: 0 0.25rem;
  transition: all 0.3s ease;
  border: none;
  height: 40px;
  line-height: 40px;
}

.nav-menu :deep(.el-menu-item:hover) {
  background: var(--theme-primary);
  color: #fff;
}

.nav-menu :deep(.el-menu-item.is-active) {
  background: var(--theme-primary);
  color: #fff;
  border: none;
}

.nav-icon {
  font-size: 1.25rem;
  margin-right: 0.5rem;
}

.nav-text {
  font-size: 0.875rem;
}

/* 移动端汉堡按钮 */
.mobile-trigger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
}

.mobile-trigger span {
  width: 100%;
  height: 3px;
  background: var(--theme-text);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-trigger:hover span {
  background: var(--theme-primary);
}

/* 抽屉样式 */
.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--theme-border);
}

.drawer-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--theme-text);
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--theme-bg-secondary);
  color: var(--theme-text);
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--theme-primary);
  color: #fff;
}

.drawer-menu {
  border: none;
  background: transparent;
  flex: 1;
  padding: 1rem 0;
}

.drawer-menu :deep(.el-menu-item) {
  color: var(--theme-text-secondary);
  padding: 1rem 1.5rem;
  font-size: 1rem;
  height: auto;
  line-height: 1.5;
  margin: 0.25rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.drawer-menu :deep(.el-menu-item:hover) {
  background: var(--theme-bg-secondary);
  color: var(--theme-text);
}

.drawer-menu :deep(.el-menu-item.is-active) {
  background: var(--theme-primary);
  color: #fff;
}

.mobile-nav-icon {
  font-size: 1.25rem;
  margin-right: 0.75rem;
}

/* 覆盖 Element Plus Drawer 样式 */
:deep(.el-drawer) {
  background: var(--theme-bg);
}

:deep(.el-drawer__body) {
  padding: 0;
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .logo {
    font-size: 1.25rem;
  }

  .logo-icon {
    font-size: 1.5rem;
  }
}
</style>
