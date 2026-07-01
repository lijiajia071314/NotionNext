import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 站点总统计组件 - 从 Waline 获取总浏览量和页面数
 */
const WalineTotalCounter = ({ showIcon = true }) => {
  const [stats, setStats] = useState(null)
  const walineServerUrl = siteConfig('COMMENT_WALINE_SERVER_URL')

  useEffect(() => {
    if (!walineServerUrl) return
    fetch(`${walineServerUrl}/api/total`)
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
    <>
      <span className='busuanzi_container_site_pv ml-2'>
        {showIcon && <i className='fas fa-eye mx-1' />}
        访问量: <span className='px-1 busuanzi_value_site_pv'>{stats.total_views}</span>
      </span>
      <span className='pl-2 busuanzi_container_site_uv'>
        {showIcon && <i className='fas fa-file mx-1' />}
        文章数: <span className='px-1 busuanzi_value_site_uv'>{stats.total_pages}</span>
      </span>
    </>
  )
}

export default WalineTotalCounter
