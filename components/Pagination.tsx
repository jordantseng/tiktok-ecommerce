'use client'
import { useState, MouseEvent } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

import { cn } from '@/lib/utils'

type PaginationProps = {
  page: number
  itemsPerPage: number
  totalItems: number
}

function getPageNumbers(isMobile: boolean, currentPage: number, totalPages: number) {
  const showPrevMore = isMobile ? currentPage >= 4 : currentPage >= 5
  const showPostMore = currentPage <= totalPages - 4

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (showPrevMore) {
    if (showPostMore) {
      const pagesToShow = isMobile
        ? [1, '...', currentPage, '...', totalPages]
        : [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
      return pagesToShow
    }

    const restTotalPages = Array.from({ length: isMobile ? 3 : 5 }, (_, i) =>
      isMobile ? totalPages - 2 + i : totalPages - 4 + i,
    )

    return [1, '...', ...restTotalPages]
  }

  return isMobile ? [1, 2, 3, '...', totalPages] : [1, 2, 3, 4, 5, '...', totalPages]
}

const Pagination = ({ page, totalItems, itemsPerPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(page)
  const isMobile = useMediaQuery('(max-width: 425px)')
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  const pageNumbers = getPageNumbers(isMobile, currentPage, totalPages)

  const navigateToPage = (
    page: number,
    searchParams: URLSearchParams,
    router: any,
    setCurrentPage: Function,
  ) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', String(page))

    setCurrentPage(page)

    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  const handlePrevClick = () => {
    if (isFirstPage) {
      return
    }

    navigateToPage(currentPage - 1, searchParams, router, setCurrentPage)
  }

  const handleNextClick = () => {
    if (isLastPage) {
      return
    }

    navigateToPage(currentPage + 1, searchParams, router, setCurrentPage)
  }

  const handlePageClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    isEllipsis: boolean,
    pageNum: number | string,
  ) => {
    if (isEllipsis) {
      e.preventDefault()
    }

    if (typeof pageNum === 'number') {
      navigateToPage(pageNum, searchParams, router, setCurrentPage)
    }
  }

  if (totalPages === 1) {
    return null
  }

  return (
    <div className="flex justify-center">
      <nav className="flex gap-1">
        <button
          className={cn('grid place-items-center rounded-sm')}
          disabled={isFirstPage}
          onClick={handlePrevClick}
        >
          <ArrowLeft
            size={16}
            className={cn({
              'text-border': isFirstPage,
            })}
          />
        </button>
        <div className="flex gap-2">
          {pageNumbers.map((number, index) => {
            const isCurrentPage = number === currentPage
            const isEllipsis = number === '...'
            return (
              <button
                key={index}
                className={cn('grid h-8 w-8 place-items-center rounded-sm font-sans', {
                  'cursor-not-allowed': isEllipsis,
                  'bg-gray-300 text-card': isCurrentPage,
                  'bg-background-subtle': !isCurrentPage,
                })}
                onClick={(e) => handlePageClick(e, isEllipsis, number)}
              >
                {number}
              </button>
            )
          })}
        </div>
        <button
          className={cn('grid place-items-center rounded-sm')}
          disabled={isLastPage}
          onClick={handleNextClick}
        >
          <ArrowRight
            size={16}
            className={cn({
              'text-border': isLastPage,
            })}
          />
        </button>
      </nav>
    </div>
  )
}

export default Pagination
