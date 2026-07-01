import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  const [totalViews, setTotalViews] = useState(null)
  const walineServerUrl = siteConfig('COMMENT_WALINE_SERVER_URL')

  useEffect(() => {
    if (walineServerUrl) {
      fetch(walineServerUrl + '/api/total')
        .then(res => res.json())
        .then(data => setTotalViews(data.total_views))
        .catch(() => {})
    }
  }, [walineServerUrl])

  return (
    <footer className='relative z-10 dark:bg-gray-800 flex-shrink-0 justify-center text-center m-auto w-full leading-6 text-sm p-6 bg-white dark:text-gray-400'>
      <span>
        <DarkModeButton />
        <i className='fas fa-copyright' /> {`${copyrightDate}`}{' '}
        <span className='mx-1 animate-pulse'>
          <i className='fas fa-heart' />
        </span>{' '}
        <a href={siteConfig('LINK')} className='underline font-bold '>
          {siteConfig('AUTHOR')}
        </a>
        .<br />
        {siteConfig('BEI_AN') && (
          <>
            <i className='fas fa-shield-alt' />{' '}
            <a href={siteConfig('BEI_AN_LINK')} className='mr-2'>
              {siteConfig('BEI_AN')}
            </a>
            <br />
          </>
        )}
        <BeiAnGongAn />
        {walineServerUrl && totalViews !== null && (
          <span>
            <i className='fas fa-eye' /> {totalViews}{' '}
          </span>
        )}
        <br />
        <h1>{title}</h1>
        <span className='text-xs font-serif  text-gray-500 dark:text-gray-300 '>
          Powered by{' '}
          <a
            href='https://github.com/tangly1024/NotionNext'
            className='underline '>
            NotionNext {siteConfig('VERSION')}
          </a>
          .
        </span>
      </span>
    </footer>
  )
}

export default Footer
