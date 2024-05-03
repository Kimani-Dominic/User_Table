import { UserType } from '../store/useUsersStore'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useUserForm } from '../hooks/useUserForm'


type UserFormPropsType = {
  user?: UserType
  onClose: () => void
}

export const UserForm = ({ user, onClose }: UserFormPropsType) => {
  const { onSubmit, register, handleSubmit } = useUserForm(user!, onClose)

  return (
    <>
      <FormControl>
        <FormLabel>User name:</FormLabel>
        <Input
          defaultValue={user?.name}
          {...register('name')}
          placeholder="User name..."
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Email:</FormLabel>
        <Input
          type="email"
          {...register('email')}
          defaultValue={user?.email}
          placeholder="Email..."
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Country:</FormLabel>
        <Input
          {...register('country')}
          placeholder="Country..."
          defaultValue={user?.country}
        />
      </FormControl>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        marginTop={'20px'}
      >
        <Button
          colorScheme="blue"
          mr={3}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </>
  )
}
