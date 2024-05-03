import { SubmitHandler, useForm } from 'react-hook-form'
import { UserType, useUsersStore } from '../store/useUsersStore'

export const useUserForm = (user: UserType, onClose: () => void) => {
  const { addUser, updateUser } = useUsersStore((state) => ({
    addUser: state.addUser,
    updateUser: state.updateUser,
  }))

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: user?.id || '',
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || '',
      company: user?.company || '',
      country: user?.country || '',
    },
  })

  const onSubmit: SubmitHandler<UserType> = (data) => {
    user ? updateUser(user.id, data) : addUser(data)
    onClose()
  }
  
  return {
    addUser,
    updateUser,

    register,
    onSubmit,
    handleSubmit,
  }
}
