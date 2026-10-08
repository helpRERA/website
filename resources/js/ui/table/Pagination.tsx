import { Link } from '@inertiajs/react'
import React from 'react'
import { Paginator } from '../ui_interfaces'

interface PaginationProps {
  pagination: Paginator<{}>
  focusTargetId?: string
}

const calcUrls = (pagination: Paginator<{}>, focusTargetId?: string) => {
  if (!pagination || !pagination.links) return null
  const navigationProps = focusTargetId ? {
    preserveScroll: true,
    onSuccess: () => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(focusTargetId)
        if (target) {
          target.focus({ preventScroll: true })
          target.scrollIntoView({ block: 'start', behavior: 'auto' })
        }
      })
    },
  } : {}
  let index = 0
  const listLength = pagination.links.length
  return pagination.links.map((link) => {
    const url = link.url == undefined ? '' : link.url
    index++
    let linkElement: JSX.Element | null = null

    // Previous Button
    if (index === 1) {
      linkElement = (
        <Link
          {...navigationProps}
          as={link.url ? 'a' : 'div'}
          href={url}
          key={`prev-${index}`}
          className={`flex items-center text-[13px] font-medium mr-2 ${link.url ? 'text-gray-600 hover:text-[#085484] cursor-pointer' : 'text-gray-400 cursor-not-allowed'
            }`}
        >
          Prev
        </Link>
      )
    }

    // Number Buttons & Ellipsis
    if (index !== 1 && index !== listLength) {
      if (link.label === '...') {
        linkElement = (
          <span
            key={`ellipsis-${index}`}
            className='flex items-center justify-center px-1 text-gray-400 text-sm'
          >
            ...
          </span>
        )
      } else {
        linkElement = (
          <Link
            {...navigationProps}
            as={link.url ? 'a' : 'div'}
            href={url}
            key={`page-${index}-${link.label}`}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${link.active
                ? 'bg-[#085484] text-white shadow-sm'
                : 'border border-gray-300 bg-white text-gray-400 hover:border-[#085484] hover:text-[#085484]'
              }`}
          >
            {link.label}
          </Link>
        )
      }
    }

    // Next Button
    if (index === listLength) {
      linkElement = (
        <Link
          {...navigationProps}
          as={link.url ? 'a' : 'div'}
          href={url}
          key={`next-${index}`}
          className={`flex items-center text-[13px] font-medium ml-2 ${link.url ? 'text-gray-600 hover:text-[#085484] cursor-pointer' : 'text-gray-400 cursor-not-allowed'
            }`}
        >
          Next
        </Link>
      )
    }

    return linkElement
  })
}

const Pagination = ({ pagination, focusTargetId }: PaginationProps) => {
  if (!pagination || !pagination.links || pagination.links.length === 0) return null
  const pageList = calcUrls(pagination, focusTargetId)

  return (
    <nav
      className='flex w-full flex-wrap justify-center items-center gap-2 py-6 px-4'
      aria-label='Pagination'
    >
      {pageList}
    </nav>
  )
}

export default Pagination
