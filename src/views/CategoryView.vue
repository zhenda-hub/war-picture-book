<template>
  <div class="category-view" v-if="category">
    <!-- Category Header -->
    <header
      class="category-header"
      :style="{ backgroundColor: category.color }"
    >
      <div class="container">
        <div class="category-header__content">
          <span class="category-header__icon">{{ category.icon }}</span>
          <div>
            <h1 class="category-header__title">{{ category.name }}</h1>
            <p class="category-header__period">{{ category.period }}</p>
            <p class="category-header__description">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Battles Grid -->
    <section class="battles-section">
      <div class="container">
        <div v-if="loading" class="loading-state">
          <p>加载中...</p>
        </div>

        <div v-else-if="battles.length === 0" class="empty-state">
          <p>该时期暂无战役数据</p>
          <router-link to="/" class="back-link">返回首页</router-link>
        </div>

        <div v-else>
          <div class="battles-info">
            <p>共 <strong>{{ battles.length }}</strong> 场战役</p>
          </div>
          <BattleGrid :battles="battles" />
        </div>
      </div>
    </section>
  </div>

  <div v-else class="error-state">
    <div class="container">
      <p>未找到该时期分类</p>
      <router-link to="/" class="back-link">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBattleData } from '@/composables/useBattleData.js'
import BattleGrid from '@/components/battle/BattleGrid.vue'

const route = useRoute()
const { categories, getBattlesByEra } = useBattleData()

const battles = ref([])
const loading = ref(true)

const era = computed(() => route.params.era)
const category = computed(() => categories[era.value])

async function loadBattles() {
  loading.value = true
  battles.value = await getBattlesByEra(era.value)
  loading.value = false
}

onMounted(() => {
  loadBattles()
})

watch(era, () => {
  loadBattles()
})
</script>

<style scoped>
.category-view {
  min-height: 100vh;
}

.category-header {
  color: #fff;
  padding: 3rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.category-header__content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.category-header__icon {
  font-size: 4rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.category-header__title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem;
}

.category-header__period {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0 0 0.75rem;
}

.category-header__description {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
  max-width: 600px;
}

.battles-section {
  padding: 4rem 0;
  background: linear-gradient(180deg, var(--theme-bg) 0%, var(--theme-bg-secondary) 100%);
  min-height: 400px;
}

.battles-info {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--theme-text-secondary);
  font-size: 1.125rem;
}

.battles-info strong {
  color: var(--theme-text);
  font-size: 1.5rem;
}

.loading-state,
.empty-state,
.error-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--theme-text-secondary);
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, var(--theme-primary-light, var(--theme-primary)) 0%, var(--theme-primary) 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .category-header__content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .category-header__icon {
    font-size: 3rem;
  }

  .category-header__title {
    font-size: 1.875rem;
  }

  .category-header__description {
    font-size: 0.9375rem;
  }
}
</style>
