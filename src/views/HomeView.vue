<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">历史战役百科</h1>
        <p class="hero__subtitle">探索改变世界的关键战役</p>
        <p class="hero__description">
          从古代战车到现代机械化战争，通过丰富的历史内容和视觉呈现，
          了解塑造人类历史进程的重要军事冲突。
        </p>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">按时期浏览</h2>
        <div class="category-grid">
          <CategoryCard
            v-for="(category, id) in categories"
            :key="id"
            :category="category"
            :battle-count="getBattleCount(id)"
          />
        </div>
      </div>
    </section>

    <!-- Featured Battles Section -->
    <section class="featured-section">
      <div class="container">
        <h2 class="section-title">精选战役</h2>
        <BattleGrid :battles="featuredBattles" />
        <div v-if="featuredBattles.length === 0" class="loading-state">
          <p>加载中...</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useBattleData } from '@/composables/useBattleData.js'
import CategoryCard from '@/components/category/CategoryCard.vue'
import BattleGrid from '@/components/battle/BattleGrid.vue'

const { categories, loadAllBattles, getFeaturedBattles } = useBattleData()

const allBattles = ref([])
const featuredBattles = ref([])

const battleCounts = computed(() => {
  const counts = {}
  Object.keys(categories).forEach(id => {
    counts[id] = allBattles.value.filter(b => b.era === id).length
  })
  return counts
})

function getBattleCount(era) {
  return battleCounts.value[era] || 0
}

onMounted(async () => {
  allBattles.value = await loadAllBattles()
  featuredBattles.value = await getFeaturedBattles(6)
})
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, var(--theme-bg) 0%, var(--theme-bg-secondary) 50%, var(--theme-bg) 100%);
  color: var(--theme-text);
  padding: 6rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="50">⚔️</text></svg>') center/cover;
  opacity: 0.03;
}

.hero__content {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.hero__title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 0 0 1rem;
  background: linear-gradient(135deg, var(--theme-primary-light, var(--theme-primary)) 0%, var(--theme-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  font-size: 1.5rem;
  margin: 0 0 1.5rem;
  color: var(--theme-text-secondary);
}

.hero__description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--theme-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin: 0 0 3rem;
  color: var(--theme-text);
}

.categories-section {
  padding: 4rem 0;
  background: var(--theme-bg);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.featured-section {
  padding: 4rem 0;
  background: linear-gradient(180deg, var(--theme-bg) 0%, var(--theme-bg-secondary) 100%);
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--theme-text-secondary);
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 1.5rem 3rem;
  }

  .hero__title {
    font-size: 2.5rem;
  }

  .hero__subtitle {
    font-size: 1.25rem;
  }

  .hero__description {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .category-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
}
</style>
