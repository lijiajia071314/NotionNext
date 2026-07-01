'use client'
import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * Waline 站点统计注入器
 * 在 main bundle 中运行，独立于主题 Footer chunk
 * 通过 DOM 操作更新 SSG 预渲染的统计占位符
 */
export default function WalineStatsInject() {
  useEffect(() => {
    const url = siteConfig('COMMENT_WALINE_SERVER_URL')
    if (!url) return

    fetch(`${url}/api/total`)
      .then(res => res.json())
      .then(data => {
        if (data?.total_views === undefined) return

        // 更新页脚统计
        const viewsEl = document.getElementById('waline-total-views')
        const pagesEl = document.getElementById('waline-total-pages')
        if (viewsEl) viewsEl.textContent = data.total_views
        if (pagesEl) pagesEl.textContent = data.total_pages || 0

        // 显示页脚容器
        const container = document.getElementById('waline-stats-container')
        if (container) container.style.display = ''

        // 更新 AnalyticsCard 统计
        const analyticsValue = document.getElementById('waline-analytics-views-value')
        if (analyticsValue) analyticsValue.textContent = data.total_views
      })
      .catch(() => {})
  }, [])

  return null
}
