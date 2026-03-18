# 主题协调性问题修复文档

## 问题描述

### 现象
主题切换后，战役详情页和其他页面存在大量硬编码颜色，导致界面不协调：
- **紫色固定背景** - 页面背景始终显示紫色渐变（`#f093fb` 到 `#f5576c`）
- **交战双方颜色固定** - InfoCard 颜色不随主题变化（蓝色 `#4A90E2` / 红色 `#E24A4A`）
- **文字颜色固定** - 大量硬编码的文字颜色（`#fff`、`#999` 等）
- **按钮/链接固定** - 返回按钮、链接等使用固定紫色渐变

### 根本原因

1. **主题未初始化** - `App.vue` 没有调用 `useTheme()`，导致 body 上永远不会添加主题类（`theme-classical`、`theme-modern`、`theme-epic`），一直使用 `:root` 的默认紫色主题

2. **大量硬编码颜色** - 多个组件和视图文件中直接写死了颜色值，没有使用 CSS 变量

## 解决方案

### 1. 修复主题初始化

**文件**: `src/App.vue`

```vue
<script setup>
import { onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useTheme } from '@/composables/useTheme'

// 初始化主题
const { setTheme } = useTheme()
onMounted(() => {
  const saved = localStorage.getItem('war-theme') || 'classical'
  setTheme(saved)
})
</script>
```

### 2. 扩展主题变量

**文件**: `src/assets/styles/index.css`

为每个主题添加交战双方颜色变量：

```css
/* 古典博物馆 */
body.theme-classical {
  /* 现有变量... */
  --theme-combatant-a: #B8860B;  /* 金色系 */
  --theme-combatant-b: #8B4513;  /* 棕色系 */
}

/* 现代极简 */
body.theme-modern {
  /* 现有变量... */
  --theme-combatant-a: #00BFFF;  /* 蓝色系 */
  --theme-combatant-b: #FF6B6B;  /* 红色系 */
}

/* 暗黑史诗 */
body.theme-epic {
  /* 现有变量... */
  --theme-combatant-a: #4A90E2;  /* 亮蓝 */
  --theme-combatant-b: #E24A4A;  /* 亮红 */
}
```

### 3. 修复组件硬编码颜色

#### BattleDetail.vue - 交战双方颜色
```vue
<!-- 修复前 -->
:color="index === 0 ? '#4A90E2' : '#E24A4A'"

<!-- 修复后 -->
:color="index === 0 ? 'var(--theme-combatant-a)' : 'var(--theme-combatant-b)'"
```

#### BattleCard.vue - 默认分类颜色
```js
// 修复前
const categoryColor = computed(() => category.value.color || '#666')

// 修复后
const categoryColor = computed(() => category.value.color || 'var(--theme-text-secondary)')
```

#### ImageGallery.vue - 缩略图样式
```css
/* 修复前 */
.image-gallery__thumbnails {
  background: rgba(0, 0, 0, 0.5);
}
.image-gallery__thumb:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

/* 修复后 */
.image-gallery__thumbnails {
  background: var(--theme-bg-secondary);
}
.image-gallery__thumb:hover {
  border-color: var(--theme-primary);
}
```

### 4. 修复视图页面硬编码颜色

#### HomeView.vue
- Hero 区域背景渐变
- 标题渐变色
- Section 背景色
- 所有文字颜色

#### CategoryView.vue
- 返回链接渐变色
- Battles 区域背景
- 所有文字颜色

#### BattleDetailView.vue
- 页面背景渐变
- 返回按钮样式
- 相关战役卡片样式

## 修改文件清单

| 文件 | 修改内容 |
|------|----------|
| `src/App.vue` | 添加主题初始化逻辑 |
| `src/assets/styles/index.css` | 添加 `--theme-combatant-a/b` 变量 |
| `src/components/battle/BattleDetail.vue` | 修复交战双方颜色 |
| `src/components/battle/BattleCard.vue` | 修复默认分类颜色 |
| `src/components/common/ImageGallery.vue` | 修复缩略图样式 |
| `src/views/HomeView.vue` | 全面主题化 |
| `src/views/CategoryView.vue` | 全面主题化 |
| `src/views/BattleDetailView.vue` | 全面主题化 |

## 最佳实践

### 1. 始终使用 CSS 变量
```css
/* ✅ 正确 */
color: var(--theme-text);
background: var(--theme-bg);

/* ❌ 错误 */
color: #333;
background: #fff;
```

### 2. 渐变色使用主题变量
```css
/* ✅ 正确 */
background: linear-gradient(135deg,
  var(--theme-primary-light, var(--theme-primary)) 0%,
  var(--theme-primary) 100%
);

/* ❌ 错误 */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### 3. 组件颜色使用动态绑定
```vue
<!-- ✅ 正确 -->
:color="index === 0 ? 'var(--theme-combatant-a)' : 'var(--theme-combatant-b)'"

<!-- ❌ 错误 -->
:color="index === 0 ? '#4A90E2' : '#E24A4A'"
```

### 4. 确保主题初始化
在 `App.vue` 或根组件中调用 `useTheme()` 确保主题正确应用。

## 验证方法

1. 打开任意页面（首页、分类页、战役详情页）
2. 切换三个主题（古典博物馆、现代极简、暗黑史诗）
3. 检查以下元素是否正确跟随主题变化：
   - 页面背景色
   - 文字颜色
   - 交战双方 InfoCard 颜色
   - 按钮/链接颜色
   - 卡片边框和阴影

## 相关主题变量

```css
--theme-primary          /* 主色调 */
--theme-primary-light    /* 主色调浅色（渐变用） */
--theme-bg               /* 主背景色 */
--theme-bg-secondary     /* 次级背景色 */
--theme-text             /* 主文字颜色 */
--theme-text-secondary   /* 次级文字颜色 */
--theme-border           /* 边框颜色 */
--theme-combatant-a      /* 交战方A颜色 */
--theme-combatant-b      /* 交战方B颜色 */
--theme-tag-bg           /* 标签背景色 */
--theme-tag-hover        /* 标签悬停色 */
```

## 日期

修复日期：2026-03-18
