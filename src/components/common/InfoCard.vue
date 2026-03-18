<template>
  <div class="info-card" :style="{ '--card-color': color }">
    <div class="info-card__header" :style="{ backgroundColor: color }">
      <h3 class="info-card__name">{{ data.name }}</h3>
    </div>

    <div class="info-card__body">
      <div v-if="data.commander" class="info-card__row">
        <span class="info-card__label">指挥官</span>
        <span class="info-card__value">{{ data.commander }}</span>
      </div>

      <div v-if="data.strength" class="info-card__row">
        <span class="info-card__label">兵力</span>
        <span class="info-card__value">{{ data.strength }}</span>
      </div>

      <div v-if="data.casualties" class="info-card__row">
        <span class="info-card__label">伤亡</span>
        <span class="info-card__value">{{ data.casualties }}</span>
      </div>

      <div v-if="data.result" class="info-card__row">
        <span class="info-card__label">结果</span>
        <span class="info-card__value">{{ data.result }}</span>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    default: '#666'
  }
})
</script>

<style scoped>
.info-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-card__header {
  padding: 1.25rem;
  color: #fff;
}

.info-card__name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.info-card__body {
  padding: 1.5rem;
}

.info-card__row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-card__row:last-child {
  border-bottom: none;
}

.info-card__label {
  font-size: 0.75rem;
  color: #999;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.info-card__value {
  font-size: 0.9375rem;
  color: #333;
  font-weight: 500;
}

@media (max-width: 640px) {
  .info-card__header {
    padding: 1rem;
  }

  .info-card__name {
    font-size: 1.125rem;
  }

  .info-card__body {
    padding: 1.25rem;
  }
}
</style>
