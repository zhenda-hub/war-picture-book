<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">历史战役百科</h3>
          <p class="footer-description">
            以图文并茂的方式，探索改变世界的关键战役
          </p>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">时期分类</h4>
          <ul class="footer-links">
            <li v-for="cat in categories" :key="cat.id">
              <router-link :to="`/category/${cat.id}`" class="footer-link">
                <span>{{ cat.icon }}</span> {{ cat.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">关于</h4>
          <p class="footer-text">
            本项目致力于通过丰富的历史内容和视觉呈现，帮助用户理解人类历史上的关键时刻。
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} 历史战役百科. 保留所有权利。</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { categories } from '@/composables/useBattleData.js'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background: var(--theme-bg-secondary);
  color: var(--theme-text);
  padding: 3rem 0 1rem;
  margin-top: 4rem;
  border-top: 1px solid var(--theme-border);
  transition: background 0.3s, color 0.3s;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, var(--theme-primary-light, var(--theme-primary)) 0%, var(--theme-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: var(--theme-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.footer-heading {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--theme-text);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--theme-text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-link:hover {
  color: var(--theme-primary);
}

.footer-text {
  color: var(--theme-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--theme-border);
  text-align: center;
  color: var(--theme-text-secondary);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
