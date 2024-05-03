import { useState } from 'react'
import { useFilters } from './useFilters'

export const usePagination = () => {
  const { pageFilter, filteredUsers } = useFilters()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const totalPages = Math.ceil(filteredUsers.length / pageFilter)
  const pages = Array.from({ length: totalPages }, (_, i) => i * pageFilter)

  const users = pages.map((pageIndex) =>
    filteredUsers.slice(pageIndex, pageIndex + pageFilter)
  )

  const totalEntries = Object.values(users).reduce(
    (acc, value) => acc + value.length,
    0
  )

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < users.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  return {
    currentPage,
    totalPages,
    totalEntries,
    users,

    handlePrevPage,
    handleNextPage,
  }
}
