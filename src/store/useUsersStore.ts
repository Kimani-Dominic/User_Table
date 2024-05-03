import { persist, createJSONStorage } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { usersAPI } from '../api/users-api'
import { toast } from 'react-toastify'

export type UserType = {
  id: string
  name: string
  email: string
  country: string
}

type UsersStoreType = {
  isLoading: boolean
  users: UserType[]
  user: UserType
  getUsers: () => void
  getUser: (id: string) => void
  addUser: (user: UserType) => void
  deleteUser: (id: string) => void
  updateUser: (id: string, user: UserType) => void
}

export const useUsersStore = createWithEqualityFn<UsersStoreType>()(
  persist(
    (set, get) => ({
      isLoading: false,
      users: [],
      user: {
        id: '',
        name: '',
        email: '',
        country: '',
      },
      getUsers: async () => {
        set({ isLoading: true })
        try {
          const { data } = await usersAPI.getUsers()
          set({ users: data })
        } catch (error: any) {
          toast.error(error, { autoClose: 10000 })
        } finally {
          set({ isLoading: false })
        }
      },
      getUser: async (id) => {
        try {
          const { data } = await usersAPI.getUser(id)
          set({ user: data })
        } catch (error: any) {
          toast.error(error, { autoClose: 10000 })
        }
      },
      addUser: async (user) => {
        try {
          const { data } = await usersAPI.addUser(user)
          set((state) => ({ users: [...state.users, data] }))
          toast.success('New User Created!')
        } catch (error: any) {
          toast.error(error, { autoClose: 10000 })
        }
      },
      deleteUser: async (id) => {
        try {
          await usersAPI.deleteUser(id)
          const updatedUsers = get().users.filter((user) => user.id !== id)
          set({ users: updatedUsers })
          toast.success('User deleted successfully!')
        } catch (error: any) {
          toast.error(error.message, { autoClose: 10000 })
        }
      },
      updateUser: async (id, user) => {
        try {
          await usersAPI.updateUser(id, user)
          const updatedUsers = get().users.map((item) =>
            item.id === id ? user : item
          )
          set({ users: updatedUsers })
          toast.success('User data updated!')
        } catch (error: any) {
          toast.error(error, { autoClose: 10000 })
        }
      },
    }),
    {
      name: 'users-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ users: state.users }),
    }
  ),
  shallow
)
