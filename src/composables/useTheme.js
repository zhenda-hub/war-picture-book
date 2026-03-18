import { ref, onMounted } from 'vue'

export const THEMES = {
  CLASSICAL: 'classical',
  MODERN: 'modern',
  EPIC: 'epic'
}

export const THEME_CONFIG = {
  [THEMES.CLASSICAL]: { name: '古典博物馆', icon: '🏛️' },
  [THEMES.MODERN]: { name: '现代极简', icon: '◻️' },
  [THEMES.EPIC]: { name: '暗黑史诗', icon: '⚔️' }
}

const currentTheme = ref(THEMES.CLASSICAL)

export function useTheme() {
  function setTheme(theme) {
    currentTheme.value = theme
    document.body.classList.remove('theme-classical', 'theme-modern', 'theme-epic')
    document.body.classList.add(`theme-${theme}`)
    localStorage.setItem('war-theme', theme)
  }

  onMounted(() => {
    const saved = localStorage.getItem('war-theme') || THEMES.CLASSICAL
    setTheme(saved)
  })

  return { currentTheme, setTheme, themes: THEMES, themeConfig: THEME_CONFIG }
}
