import { useEffect } from 'react'
import { Container, Spinner } from '@chakra-ui/react'
import { UsersTable } from './components/UsersTable'
import { ToastContainer } from 'react-toastify'
import { useUsersStore } from './store/useUsersStore'
import 'react-toastify/dist/ReactToastify.min.css'

export const App = () => {
  const { isLoading, getUsers } = useUsersStore((state) => ({
    isLoading: state.isLoading,
    getUsers: state.getUsers,
  }))

  useEffect(() => {
    getUsers()
  }, [])

  if (isLoading) {
    return (
      <Spinner
        position={'absolute'}
        top={'50%'}
        left={'48%'}
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  }

  return (
    <Container
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      maxW={'1440px'}
      w={'100%'}
      padding={'30px'}
    >
      <UsersTable />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        theme="light"
      />
    </Container>
  )
}
