import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 站点总统计组件 - 从 Waline 获取总浏览量
 */
const WalineTotalCounter = ({ showIcon = true }) => {
  const [stats, setStats] = useState(null)
  const walineServerUrl = siteConfig('COMMENT_WALINE_SERVER_URL')

  useEffect(() => {
    if (!walineServerUrl) return
    fetch(${walineServerUrl}/api/total)
      .then(res => res.json())
      .then(data => {
        if (data?.total_views !== undefined) {
          setStats(data)
        }
      })
      .catch(() => {})
  }, [walineServerUrl])

  if (!walineServerUrl || !stats) return null

  return (
    <span className='inline-flex items-center mr-2'>
      {showIcon && <i className='fas fa-eye mr-1' />}
      访问量: <span className='font-semibold ml-1'>{stats.total_views}</span>
    </span>
  )
}

export default WalineTotalCounter
