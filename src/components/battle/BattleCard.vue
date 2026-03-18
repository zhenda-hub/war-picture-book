<template>
  <router-link
    :to="`/battle/${battle.slug}`"
    class="battle-card"
    :class="`battle-card--${battle.era}`"
  >
    <div class="battle-card__image">
      <img
        :src="battle.image || '/placeholder-battle.jpg'"
        :alt="battle.title"
        loading="lazy"
      />
      <div class="battle-card__overlay" :style="{ backgroundColor: categoryColor }">
        <span class="battle-card__era-icon">{{ categoryIcon }}</span>
      </div>
      <div v-if="battle.featured" class="battle-card__featured">
        <span>★</span>
      </div>
    </div>

    <div class="battle-card__content">
      <h3 class="battle-card__title">{{ battle.title }}</h3>

      <div class="battle-card__meta">
        <span class="battle-card__date">
          <span class="icon">📅</span>
          {{ formatDate(battle.date) }}
        </span>
        <span class="battle-card__location">
          <span class="icon">📍</span>
          {{ battle.location }}
        </span>
      </div>

      <p v-if="battle.significance" class="battle-card__significance">
        {{ battle.significance }}
      </p>

      <div v-if="battle.tags && battle.tags.length" class="battle-card__tags">
        <span
          v-for="tag in battle.tags.slice(0, 3)"
          :key="tag"
          class="battle-card__tag"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { categories } from '@/composables/useBattleData.js'

const props = defineProps({
  battle: {
    type: Object,
    required: true
  }
})

const category = computed(() => categories[props.battle.era] || {})
const categoryColor = computed(() => category.value.color || 'var(--theme-text-secondary)')
const categoryIcon = computed(() => category.value.icon || '⚔️')

function formatDate(date) {
  if (!date) return '未知年代'

  if (date < 0) {
    return `公元前${Math.abs(date)}年`
  }
  return `公元${date}年`
}
</script>

<style scoped>
.battle-card {
  display: block;
  background: var(--theme-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: var(--theme-text);
  border: 1px solid var(--theme-border);
}

.battle-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  border-color: var(--theme-primary);
}

.battle-card__image {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.battle-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.battle-card:hover .battle-card__image img {
  transform: scale(1.1);
}

.battle-card__overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}

.battle-card__era-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.battle-card__featured {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: linear-gradient(135deg, var(--theme-primary-light, var(--theme-primary)) 0%, var(--theme-primary) 100%);
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.battle-card__content {
  padding: 1.25rem;
}

.battle-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  line-height: 1.4;
  color: var(--theme-text);
}

.battle-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.battle-card__date,
.battle-card__location {
  font-size: 0.875rem;
  color: var(--theme-text-secondary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.battle-card__meta .icon {
  font-size: 0.75rem;
}

.battle-card__significance {
  font-size: 0.875rem;
  color: var(--theme-text-secondary);
  line-height: 1.5;
  margin: 0.75rem 0;
}

.battle-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.battle-card__tag {
  font-size: 0.75rem;
  color: var(--theme-text);
  background: var(--theme-bg-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

@media (max-width: 640px) {
  .battle-card__title {
    font-size: 1.125rem;
  }

  .battle-card__content {
    padding: 1rem;
  }
}
</style>
