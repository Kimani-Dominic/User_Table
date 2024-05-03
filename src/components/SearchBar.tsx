import { Input } from '@chakra-ui/react'
import { useFilters } from '../hooks/useFilters'

export const SearchBar = () => {
  const { searchQuery, handleChangeSearch } = useFilters()

  return (
    <Input
      backgroundColor={'#ffffff'}
      marginBottom={'15px'}
      placeholder="Search user by name..."
      value={searchQuery}
      onChange={handleChangeSearch}
      height={'35px'}
    />
  )
}
