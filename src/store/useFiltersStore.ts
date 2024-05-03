import { persist, createJSONStorage } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

type FiltersStoreType = {
  searchQuery: string
  roleFilter: string
  pageFilter: number
  setSearchQuery: (query: string) => void
  setRoleFilter: (value: string) => void
  setPageFilter: (value: number) => void
}

export const useFiltersStore = createWithEqualityFn<FiltersStoreType>()(
  persist(
    (set) => ({
      searchQuery: '',
      roleFilter: '',
      pageFilter: 10,
      setSearchQuery: (query) => {
        set({ searchQuery: query })
      },
      setRoleFilter: (value) => {
        set({ roleFilter: value })
      },
      setPageFilter: (value: number) => {
        set({ pageFilter: value })
      },
    }),
    {
      name: 'filter-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        roleFilter: state.roleFilter,
        searchQuery: state.searchQuery,
      }),
    }
  ),
  shallow
)
