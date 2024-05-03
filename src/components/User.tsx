import { Tr, Td, Box, Text, IconButton } from '@chakra-ui/react'
import { UserType } from '../store/useUsersStore'
import { RiDeleteBinLine } from 'react-icons/ri'
import { UserModal } from './UserModal'
import { useUser } from '../hooks/useUser'

type UserPropsType = {
  item: UserType
}

export const User = ({ item }: UserPropsType) => {
  const { id, name, email, country } = item
  const { initials, color, handleDeleteUser } = useUser(id, name)

  return (
    <Tr>
      <Td>{id}</Td>
      <Td padding={'8px 16px'}>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={'0 10px'}
        >
          <Text
            backgroundColor={color}
            className="initials"
          >
            {initials}
          </Text>
          <Box
            display={'flex'}
            flexDirection={'column'}
          >
            <Text>{name}</Text>
            <Text fontSize={'xs'}>{email}</Text>
          </Box>
        </Box>
      </Td>
      <Td>{country}</Td>
      <Td>
        <Box
          display={'flex'}
          gap={'0 10px'}
        >
          <UserModal
            user={item}
            isEditMode
          />
          <IconButton
            aria-label="delete"
            title="Delete User"
            size={'xs'}
            backgroundColor={'transparent'}
            onClick={handleDeleteUser}
            icon={
              <RiDeleteBinLine
                size={'16px'}
                cursor={'pointer'}
                color="#E21F0B"
              />
            }
          />
        </Box>
      </Td>
    </Tr>
  )
}
