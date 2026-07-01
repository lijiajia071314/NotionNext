import { useEffect, useRef, useState } from 'react'
import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'

/**
 * 页脚统计组件 - 从 Waline 获取总浏览量和页面数
 * 使用脚本注入方式确保不受 React hydration 影响
 */
const FooterStats = () => {
  const [stats, setStats] = useState(null)
  const elRef = useRef(null)
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

  // 始终渲染容器，用 display:none 隐藏未加载状态
  return (
    <span ref={elRef} style={stats ? {} : { display: 'none' }}>
      <span className='inline-flex items-center mr-2'>
        <i className='fas fa-eye mr-1' />
        访问量: <span className='font-semibold ml-1' id='waline-total-views'>{stats?.total_views ?? '...'}</span>
      </span>
      <span className='inline-flex items-center mr-2'>
        <i className='fas fa-file mr-1' />
        文章数: <span className='font-semibold ml-1'>{stats?.total_pages ?? '...'}</span>
      </span>
    </span>
  )
}

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className='relative z-10 dark:bg-black flex-shrink-0 bg-hexo-light-gray justify-center text-center m-auto w-full leading-6  text-gray-600 dark:text-gray-100 text-sm p-6'>
      <i className='fas fa-copyright' /> {`${copyrightDate}`}
      <span>
        <i className='mx-1 animate-pulse fas fa-heart' />
        <a
          href={siteConfig('LINK')}
          className='underline font-bold  dark:text-gray-300 '>
          {siteConfig('AUTHOR')}
        </a>
        .<br />
        <BeiAnSite />
        <BeiAnGongAn />
        <FooterStats />
        <h1 className='text-xs pt-4 text-light-400 dark:text-gray-400'>
          {title} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}
        </h1>
        <PoweredBy className='justify-center' />
      </span>
      <br />
    </footer>
  )
}

export default Footer
