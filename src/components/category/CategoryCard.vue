<template>
  <router-link
    :to="`/category/${category.id}`"
    class="category-card"
    :style="{ '--category-color': category.color }"
  >
    <div class="category-card__icon" :style="{ backgroundColor: category.color }">
      {{ category.icon }}
    </div>

    <div class="category-card__content">
      <h3 class="category-card__name">{{ category.name }}</h3>
      <p class="category-card__period">{{ category.period }}</p>
      <p class="category-card__description">{{ category.description }}</p>
    </div>

    <div class="category-card__count" v-if="battleCount !== undefined">
      <span>{{ battleCount }}</span>
      <span class="label">场战役</span>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  },
  battleCount: {
    type: Number,
    default: undefined
  }
})
</script>

<style scoped>
.category-card {
  display: flex;
  flex-direction: column;
  background: var(--theme-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: var(--theme-text);
  position: relative;
  border: 1px solid var(--theme-border);
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  border-color: var(--category-color);
}

.category-card:hover .category-card__icon {
  transform: scale(1.1);
}

.category-card__icon {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  transition: transform 0.3s ease;
}

.category-card__content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.category-card__name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: var(--theme-text);
}

.category-card__period {
  font-size: 0.875rem;
  color: var(--theme-text-secondary);
  margin: 0 0 1rem;
  font-weight: 500;
}

.category-card__description {
  font-size: 0.9375rem;
  color: var(--theme-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.category-card__count {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--theme-bg);
  border: 1px solid var(--theme-border);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-card__count span:first-child {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--category-color);
}

.category-card__count .label {
  font-size: 0.625rem;
  color: var(--theme-text-secondary);
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .category-card__icon {
    font-size: 2.5rem;
    padding: 1.5rem;
  }

  .category-card__name {
    font-size: 1.25rem;
  }
}
</style>
