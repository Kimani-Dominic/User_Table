import axios from 'axios'
import { UserType } from '../store/useUsersStore'

const mockAPI = 'https://661c178ae7b95ad7fa69ab18.mockapi.io/api/v1/'

export const instance = axios.create({
  baseURL: mockAPI,
})

export const usersAPI = {
  getUsers() {
    return instance.get<UserType[]>('users')
  },
  getUser(id: string) {
    return instance.get<UserType>(`users/${id}`)
  },
  addUser(user: UserType) {
    return instance.post('users', user)
  },
  deleteUser(id: string) {
    return instance.delete(`users/${id}`)
  },
  updateUser(id: string, user: UserType) {
    return instance.put(`users/${id}`, user)
  },
}
