<template>
  <article class="battle-detail">
    <header class="battle-detail__header">
      <h1 class="battle-detail__title">{{ battle.title }}</h1>

      <div class="battle-detail__meta">
        <span class="battle-detail__date">
          <span class="icon">📅</span>
          {{ formatDate(battle.date) }}
        </span>
        <span class="battle-detail__location">
          <span class="icon">📍</span>
          {{ battle.location }}
        </span>
      </div>

      <p v-if="battle.significance" class="battle-detail__significance">
        {{ battle.significance }}
      </p>
    </header>

    <section v-if="battle.combatants" class="battle-detail__combatants">
      <h2 class="battle-detail__section-title">交战双方</h2>
      <div class="combatants-grid">
        <InfoCard
          v-for="(combatant, index) in battle.combatants"
          :key="index"
          :data="combatant"
          :color="index === 0 ? '#4A90E2' : '#E24A4A'"
        />
      </div>
    </section>

    <section v-if="battle.images && battle.images.length" class="battle-detail__gallery">
      <h2 class="battle-detail__section-title">战役图集</h2>
      <ImageGallery :images="battle.images" :title="battle.title" />
    </section>

    <section class="battle-detail__content">
      <div v-html="htmlContent" class="markdown-content"></div>
    </section>

    <section v-if="battle.tags && battle.tags.length" class="battle-detail__tags">
      <div class="tags-container">
        <span
          v-for="tag in battle.tags"
          :key="tag"
          class="battle-tag"
        >
          #{{ tag }}
        </span>
      </div>
    </section>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { markdownToHtml } from '@/utils/markdown.js'
import InfoCard from '@/components/common/InfoCard.vue'
import ImageGallery from '@/components/common/ImageGallery.vue'

const props = defineProps({
  battle: {
    type: Object,
    required: true
  }
})

const htmlContent = computed(() => {
  return markdownToHtml(props.battle.content || '')
})

function formatDate(date) {
  if (!date) return '未知年代'

  if (date < 0) {
    return `公元前${Math.abs(date)}年`
  }
  return `公元${date}年`
}
</script>

<style scoped>
.battle-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.battle-detail__header {
  text-align: center;
  margin-bottom: 3rem;
}

.battle-detail__title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
  line-height: 1.2;
  color: #fff;
}

.battle-detail__meta {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.battle-detail__date,
.battle-detail__location {
  font-size: 1.125rem;
  color: #aaa;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.battle-detail__meta .icon {
  font-size: 1.25rem;
}

.battle-detail__significance {
  font-size: 1.25rem;
  color: #f093fb;
  font-style: italic;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.battle-detail__section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.5rem;
  color: #fff;
}

.battle-detail__combatants {
  margin-bottom: 3rem;
}

.combatants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.battle-detail__gallery {
  margin-bottom: 3rem;
}

.battle-detail__content {
  margin-bottom: 2rem;
}

.markdown-content {
  color: #ddd;
  line-height: 1.8;
  font-size: 1.0625rem;
}

.markdown-content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 2.5rem 0 1.25rem;
  color: #fff;
}

.markdown-content :deep(h3) {
  font-size: 1.375rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #fff;
}

.markdown-content :deep(p) {
  margin-bottom: 1.25rem;
}

.markdown-content :deep(ul) {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.battle-detail__tags {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.battle-tag {
  font-size: 0.875rem;
  color: #aaa;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.battle-tag:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

@media (max-width: 768px) {
  .battle-detail {
    padding: 1.5rem;
  }

  .battle-detail__title {
    font-size: 1.875rem;
  }

  .battle-detail__meta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .battle-detail__significance {
    font-size: 1.0625rem;
  }

  .combatants-grid {
    grid-template-columns: 1fr;
  }
}
</style>
