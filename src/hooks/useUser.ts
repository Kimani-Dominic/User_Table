import { useUsersStore } from '../store/useUsersStore'
import { getInitials } from '../utils/getInitials'
import { getRandomColor } from '../utils/getRandomColor'

export const useUser = (id: string, name: string) => {
  const deleteUser = useUsersStore((state) => state.deleteUser)
  const initials = getInitials(name)
  const color = getRandomColor()

  const handleDeleteUser = () => {
    if (window.confirm(`Delete user ${name}?`)) {
      deleteUser(id)
    }
  }

  return {
    initials,
    color,

    handleDeleteUser,
  }
}
