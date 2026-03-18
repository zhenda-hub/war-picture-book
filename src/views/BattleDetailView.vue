<template>
  <div class="battle-detail-view">
    <div v-if="loading" class="loading-state">
      <p>加载中...</p>
    </div>

    <div v-else-if="battle" class="battle-detail-container">
      <button @click="goBack" class="back-button">
        <span class="icon">←</span>
        返回
      </button>

      <BattleDetail :battle="battle" />

      <div class="related-battles" v-if="relatedBattles.length > 0">
        <h3 class="related-title">相关战役</h3>
        <div class="related-grid">
          <router-link
            v-for="related in relatedBattles"
            :key="related.slug"
            :to="`/battle/${related.slug}`"
            class="related-card"
          >
            <img
              :src="related.image || '/placeholder-battle.jpg'"
              :alt="related.title"
            />
            <h4>{{ related.title }}</h4>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="error-state">
      <div class="container">
        <p>未找到该战役</p>
        <router-link to="/" class="back-link">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBattleData } from '@/composables/useBattleData.js'
import BattleDetail from '@/components/battle/BattleDetail.vue'

const route = useRoute()
const router = useRouter()
const { getBattleBySlug, loadAllBattles } = useBattleData()

const battle = ref(null)
const allBattles = ref([])
const loading = ref(true)

const slug = computed(() => route.params.slug)

const relatedBattles = computed(() => {
  if (!battle.value) return []

  return allBattles.value
    .filter(b => b.era === battle.value.era && b.slug !== battle.value.slug)
    .slice(0, 4)
})

async function loadBattle() {
  loading.value = true
  battle.value = await getBattleBySlug(slug.value)
  allBattles.value = await loadAllBattles()
  loading.value = false
}

function goBack() {
  if (battle.value) {
    router.push(`/category/${battle.value.era}`)
  } else {
    router.push('/')
  }
}

onMounted(() => {
  loadBattle()
})

watch(slug, () => {
  loadBattle()
})
</script>

<style scoped>
.battle-detail-view {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--theme-bg) 0%, var(--theme-bg-secondary) 100%);
  padding: 2rem 0 4rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--theme-text-secondary);
  min-height: 50vh;
}

.battle-detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--theme-bg-secondary);
  color: var(--theme-text);
  border: 1px solid var(--theme-border);
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.back-button:hover {
  background: var(--theme-tag-hover);
  transform: translateX(-4px);
}

.related-battles {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--theme-border);
}

.related-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--theme-text);
  margin: 0 0 2rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.related-card {
  background: var(--theme-bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--theme-border);
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-color: var(--theme-primary);
}

.related-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.related-card h4 {
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--theme-text);
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
  .battle-detail-container {
    padding: 0 1.5rem;
  }

  .related-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .related-card h4 {
    font-size: 0.875rem;
  }
}
</style>
