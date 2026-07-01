import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'
import Card from './Card'

/**
 * 站点统计组件 - 从 Waline 获取总浏览量
 * 使用 style display:none 确保不产生 hydration mismatch
 */
const WalineStats = () => {
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

  return (
    <div className='flex justify-between' style={stats ? {} : { display: 'none' }}>
      <div>访问量:</div>
      <div className='font-semibold'>{stats?.total_views ?? '...'}</div>
    </div>
  )
}

export function AnalyticsCard (props) {
  const { postCount } = props
  return <Card>
    <div className='ml-2 mb-3 '>
      <i className='fas fa-chart-area' /> 统计
    </div>
    <div className='text-xs  font-light justify-center mx-7'>
      <div className='inline'>
        <div className='flex justify-between'>
          <div>文章数:</div>
          <div>{postCount}</div>
        </div>
      </div>
      <div className='mt-2'>
        <WalineStats />
      </div>
    </div>
  </Card>
}
