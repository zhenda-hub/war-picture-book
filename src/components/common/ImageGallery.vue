<template>
  <div class="image-gallery">
    <div class="image-gallery__main">
      <img
        :src="currentImage.url"
        :alt="currentImage.alt || title"
        class="image-gallery__main-image"
      />
      <div v-if="currentImage.caption" class="image-gallery__caption">
        {{ currentImage.caption }}
      </div>
    </div>

    <div v-if="images.length > 1" class="image-gallery__thumbnails">
      <button
        v-for="(image, index) in images"
        :key="index"
        :class="['image-gallery__thumb', { 'image-gallery__thumb--active': currentIndex === index }]"
        @click="currentIndex = index"
        type="button"
      >
        <img :src="image.url" :alt="image.alt || `图片 ${index + 1}`" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})

const currentIndex = ref(0)

const currentImage = computed(() => {
  return props.images[currentIndex.value] || props.images[0] || {}
})
</script>

<style scoped>
.image-gallery {
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.image-gallery__main {
  position: relative;
  aspect-ratio: 16 / 9;
}

.image-gallery__main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.image-gallery__caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: #fff;
  padding: 2rem 1.5rem 1rem;
  font-size: 0.9375rem;
}

.image-gallery__thumbnails {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.5);
}

.image-gallery__thumb {
  width: 80px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  padding: 0;
}

.image-gallery__thumb:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

.image-gallery__thumb--active {
  border-color: #f093fb;
}

.image-gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 640px) {
  .image-gallery__main {
    aspect-ratio: 4 / 3;
  }

  .image-gallery__caption {
    font-size: 0.8125rem;
    padding: 1.5rem 1rem 0.75rem;
  }

  .image-gallery__thumb {
    width: 60px;
    height: 45px;
  }
}
</style>
