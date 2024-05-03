import { User } from './User'
import { Pagination } from './Pagination'
import { usePagination } from '../hooks/usePagination'
import { UserModal } from './UserModal'
import { Filters } from './Filters'
import {
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Box,
} from '@chakra-ui/react'

export const UsersTable = () => {
  const { currentPage, users, handlePrevPage, handleNextPage } = usePagination()

  const titles: string[] = [
    'uuid',
    'user',
    'location',
    'actions',
  ]

  return (
    <TableContainer
      width={'100%'}
      backgroundColor={'#ffffff'}
      borderRadius={'5px'}
      padding={'15px'}
    >
      <Text
        fontSize={'18px'}
        fontWeight={500}
        marginBottom={'15px'}
      >
        Search Filter
      </Text>
      <Box
        display={'flex'}
        gap={'0 15px'}
      >
        <Filters />
        <UserModal isEditMode={false} />
      </Box>
      <Table
        size="md"
        colorScheme="telegram"
      >
        <Thead bgColor={'#2883CC'}>
          <Tr>
            {titles.map((title, index) => (
              <Th
                key={index}
                color={'#fff'}
              >
                {title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {users[currentPage]?.map((user) => (
            <User
              key={user.id}
              item={user}
            />
          ))}
        </Tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </TableContainer>
  )
}
