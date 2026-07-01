import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 文章浏览量组件 - 从 Waline 获取单篇浏览量
 */
const PageViewCounter = ({ slug, path: propPath }) => {
  const [views, setViews] = useState(null)
  const router = useRouter()
  const walineServerUrl = siteConfig('COMMENT_WALINE_SERVER_URL')
  const pagePath = propPath || router.asPath

  useEffect(() => {
    if (!walineServerUrl) return

    fetch(`${walineServerUrl}/api/article?path=${encodeURIComponent(pagePath)}`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.views === 'number') {
          setViews(data.views)
        } else {
          setViews(0)
        }
      })
      .catch(() => setViews(0))
  }, [walineServerUrl, pagePath])

  if (!walineServerUrl || views === null) return null

  return (
    <span className='inline-flex items-center mr-2'>
      <i className='mr-1 fas fa-eye' />
      <span>{views}</span>
    </span>
  )
}

export default PageViewCounter
