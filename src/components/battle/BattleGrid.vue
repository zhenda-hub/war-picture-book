<template>
  <div class="battle-grid">
    <div v-if="battles.length === 0" class="battle-grid__empty">
      <p class="battle-grid__empty-text">暂无战役数据</p>
    </div>

    <div v-else class="battle-grid__items">
      <BattleCard
        v-for="battle in battles"
        :key="battle.slug"
        :battle="battle"
      />
    </div>
  </div>
</template>

<script setup>
import BattleCard from './BattleCard.vue'

defineProps({
  battles: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.battle-grid {
  width: 100%;
}

.battle-grid__empty {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
}

.battle-grid__empty-text {
  font-size: 1.125rem;
}

.battle-grid__items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .battle-grid__items {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .battle-grid__items {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}
</style>
