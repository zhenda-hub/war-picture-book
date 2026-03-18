/**
 * 战役数据管理
 * 动态加载所有战役 Markdown 文件并提供数据访问接口
 */

import { ref, computed } from 'vue'

// 时代分类配置
export const categories = {
  ancient: {
    id: 'ancient',
    name: '古代时期',
    period: '公元前3000年 - 公元500年',
    description: '人类早期文明的军事冲突',
    color: '#D4A574',
    icon: '🏛️'
  },
  classical: {
    id: 'classical',
    name: '古典时代',
    period: '公元前500年 - 公元500年',
    description: '希腊罗马文明的辉煌时代',
    color: '#8B7355',
    icon: '⚔️'
  },
  medieval: {
    id: 'medieval',
    name: '中世纪',
    period: '公元500年 - 1500年',
    description: '骑士与城堡的时代',
    color: '#6B4423',
    icon: '🏰'
  },
  modern: {
    id: 'modern',
    name: '近代早期',
    period: '1500年 - 1800年',
    description: '火药时代的到来',
    color: '#4A3728',
    icon: '💣'
  },
  contemporary: {
    id: 'contemporary',
    name: '近现代',
    period: '1800年至今',
    description: '工业化的战争',
    color: '#2F4F4F',
    icon: '🏭'
  }
}

// 战役数据缓存
const battlesCache = ref([])
const isLoading = ref(false)

/**
 * 战役数据管理 Composable
 */
export function useBattleData() {
  /**
   * 获取所有战役数据
   * @returns {Promise<Array>} 战役列表
   */
  async function loadAllBattles() {
    if (battlesCache.value.length > 0) {
      return battlesCache.value
    }

    if (isLoading.value) {
      return battlesCache.value
    }

    isLoading.value = true

    try {
      // 动态导入所有战役文件
      const battleModules = import.meta.glob('/content/battles/**/*.md', {
        as: 'raw'
      })

      const battles = []

      for (const path in battleModules) {
        try {
          const content = await battleModules[path]()
          const { parseMarkdown } = await import('@/utils/markdown.js')
          const { frontmatter, content: markdownContent } = parseMarkdown(content)

          // 从路径提取 slug 和 era
          const pathParts = path.split('/')
          const era = pathParts[pathParts.length - 3] // ancient, classical, etc.
          const slug = pathParts[pathParts.length - 2] // battle folder name

          battles.push({
            slug,
            era,
            path,
            ...frontmatter,
            content: markdownContent,
            // 确保 date 是数字
            date: frontmatter.date ? Number(frontmatter.date) : 0
          })
        } catch (error) {
          console.error(`Error loading battle from ${path}:`, error)
        }
      }

      // 按日期排序
      battles.sort((a, b) => a.date - b.date)

      battlesCache.value = battles
      return battles
    } catch (error) {
      console.error('Error loading battles:', error)
      return []
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 按时代获取战役
   * @param {string} era - 时代 ID
   * @returns {Promise<Array>} 战役列表
   */
  async function getBattlesByEra(era) {
    const allBattles = await loadAllBattles()
    return allBattles.filter(battle => battle.era === era)
  }

  /**
   * 根据 slug 获取单个战役
   * @param {string} slug - 战役 slug
   * @returns {Promise<Object|null>} 战役数据
   */
  async function getBattleBySlug(slug) {
    const allBattles = await loadAllBattles()
    return allBattles.find(battle => battle.slug === slug) || null
  }

  /**
   * 获取精选战役
   * @param {number} limit - 限制数量
   * @returns {Promise<Array>} 战役列表
   */
  async function getFeaturedBattles(limit = 6) {
    const allBattles = await loadAllBattles()
    return allBattles.filter(battle => battle.featured).slice(0, limit)
  }

  /**
   * 搜索战役
   * @param {string} query - 搜索关键词
   * @returns {Promise<Array>} 战役列表
   */
  async function searchBattles(query) {
    if (!query || query.trim() === '') {
      return await loadAllBattles()
    }

    const allBattles = await loadAllBattles()
    const lowerQuery = query.toLowerCase()

    return allBattles.filter(battle => {
      return (
        battle.title?.toLowerCase().includes(lowerQuery) ||
        battle.location?.toLowerCase().includes(lowerQuery) ||
        battle.significance?.toLowerCase().includes(lowerQuery) ||
        battle.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    })
  }

  /**
   * 获取所有标签
   * @returns {Promise<Array>} 标签列表
   */
  async function getAllTags() {
    const allBattles = await loadAllBattles()
    const tagSet = new Set()

    allBattles.forEach(battle => {
      if (battle.tags) {
        battle.tags.forEach(tag => tagSet.add(tag))
      }
    })

    return Array.from(tagSet).sort()
  }

  /**
   * 按标签获取战役
   * @param {string} tag - 标签
   * @returns {Promise<Array>} 战役列表
   */
  async function getBattlesByTag(tag) {
    const allBattles = await loadAllBattles()
    return allBattles.filter(battle =>
      battle.tags?.includes(tag)
    )
  }

  // 计算属性
  const battles = computed(() => battlesCache.value)
  const loading = computed(() => isLoading.value)

  // 按时代分组的战役
  const battlesByEra = computed(() => {
    const grouped = {}
    Object.keys(categories).forEach(era => {
      grouped[era] = battles.value.filter(battle => battle.era === era)
    })
    return grouped
  })

  return {
    // 状态
    battles,
    loading,
    battlesByEra,
    categories,

    // 方法
    loadAllBattles,
    getBattlesByEra,
    getBattleBySlug,
    getFeaturedBattles,
    searchBattles,
    getAllTags,
    getBattlesByTag
  }
}
