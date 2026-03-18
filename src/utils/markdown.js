/**
 * Markdown 解析工具
 * 解析 Markdown + front-matter 为组件可用数据
 */

/**
 * 解析 front-matter 和 Markdown 内容
 * @param {string} content - Markdown 文件内容
 * @returns {Object} { frontmatter, content }
 */
export function parseMarkdown(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return {
      frontmatter: {},
      content: content
    }
  }

  const frontmatterStr = match[1]
  const markdownContent = match[2]

  const frontmatter = parseYAML(frontmatterStr)

  return {
    frontmatter,
    content: markdownContent.trim()
  }
}

/**
 * 简单的 YAML 解析器
 * @param {string} yaml - YAML 字符串
 * @returns {Object} 解析后的对象
 */
function parseYAML(yaml) {
  const result = {}
  const lines = yaml.split('\n')
  let currentKey = null
  let currentValue = null
  let inArray = false
  let arrayIndent = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // 跳过空行和注释
    if (!trimmed || trimmed.startsWith('#')) continue

    // 处理键值对
    const kvMatch = trimmed.match(/^(\w+):\s*(.*)$/)
    if (kvMatch) {
      // 保存之前的值
      if (currentKey) {
        result[currentKey] = parseValue(currentValue)
      }

      currentKey = kvMatch[1]
      currentValue = kvMatch[2]
      inArray = false
      continue
    }

    // 处理数组项
    const arrayMatch = line.match(/^(\s*)-\s*(.*)$/)
    if (arrayMatch && currentKey) {
      const indent = arrayMatch[1].length

      if (!inArray) {
        inArray = true
        arrayIndent = indent
        currentValue = []
      }

      const item = parseValue(arrayMatch[2])
      currentValue.push(item)
      continue
    }

    // 处理多行字符串
    if (currentKey && currentValue !== null) {
      if (typeof currentValue === 'string') {
        currentValue += '\n' + trimmed
      }
    }
  }

  // 保存最后一个值
  if (currentKey) {
    result[currentKey] = parseValue(currentValue)
  }

  return result
}

/**
 * 解析值类型
 * @param {string|Array} value - 原始值
 * @returns {*} 解析后的值
 */
function parseValue(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value !== 'string') {
    return value
  }

  const trimmed = value.trim()

  // 布尔值
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (trimmed === 'null') return null

  // 数字
  const num = Number(trimmed)
  if (!isNaN(num) && trimmed !== '') {
    return num
  }

  // 带引号的字符串
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }

  return value
}

/**
 * 将 Markdown 内容转换为 HTML
 * @param {string} markdown - Markdown 内容
 * @returns {string} HTML 内容
 */
export function markdownToHtml(markdown) {
  if (!markdown) return ''

  let html = markdown

  // 标题
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // 粗体和斜体
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // 图片
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

  // 无序列表
  html = html.replace(/^[\s]*- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // 段落
  html = html.replace(/^(?!<[h|u|o|p])(.+)$/gm, '<p>$1</p>')

  return html
}

/**
 * 获取战役摘要（从内容中提取第一段）
 * @param {string} content - Markdown 内容
 * @param {number} maxLength - 最大长度
 * @returns {string} 摘要文本
 */
export function extractSummary(content, maxLength = 150) {
  if (!content) return ''

  // 移除标题
  const withoutHeaders = content.replace(/^#+\s+.+$/gm, '').trim()

  // 获取第一段
  const firstParagraph = withoutHeaders.split('\n\n')[0]?.trim() || ''

  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }

  return firstParagraph.substring(0, maxLength) + '...'
}
