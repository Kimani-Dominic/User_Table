import { Box, Text, Select } from '@chakra-ui/react'
import { useFilters } from '../hooks/useFilters'

export const PageFilter = () => {
  const { pageFilter, handleChangePageFilter } = useFilters()

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      gap={'0 5px'}
      height={'35px'}
      maxWidth={'180px'}
      width={'100%'}
    >
      <Text>Show</Text>
      <Select
        maxWidth={'100px'}
        height={'35px'}
        defaultValue={pageFilter}
        onChange={handleChangePageFilter}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </Select>
      <Text>entries</Text>
    </Box>
  )
}
