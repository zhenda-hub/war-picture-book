/**
 * 时代分类配置
 * 这个文件已经在 composables 中定义，这里作为内容参考
 */

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
