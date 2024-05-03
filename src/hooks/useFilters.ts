import { ChangeEvent } from 'react'
import { useUsersStore, UserType } from '../store/useUsersStore'
import { useFiltersStore } from '../store/useFiltersStore'

interface Filters {
  searchQuery: string;
  pageFilter: number;
  setSearchQuery: (query: string) => void;
  setPageFilter: (page: number) => void;
}

interface FilterFunctions {
  handleChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangePageFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const useFilters = (): Filters & FilterFunctions => {
  const { users } = useUsersStore((state) => ({
    users: state.users,
  }))
  const {
    searchQuery,
    pageFilter,
    setSearchQuery,
    setPageFilter,
  } = useFiltersStore((state) => ({
    searchQuery: state.searchQuery,
    pageFilter: state.pageFilter,
    setSearchQuery: state.setSearchQuery,
    setPageFilter: state.setPageFilter,
  }))


  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value)
  }

  const handleChangePageFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageFilter(+e.currentTarget.value)
  }

  const filterByName = (users: UserType[], searchQuery: string) => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const filteredUsers = filterByName(users, searchQuery)

  return {
    searchQuery,
    pageFilter,
    setSearchQuery,
    setPageFilter,
    filteredUsers,
    handleChangeSearch,
    handleChangePageFilter,
  }
}
