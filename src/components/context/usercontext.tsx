// usercontext.tsx

import React, { createContext, useContext, useReducer, Dispatch, useEffect } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: 'FETCH_USERS_REQUEST' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
  | { type: 'FETCH_USERS_FAILURE'; payload: string }
  | { type: 'DELETE_USER'; payload: number };

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, users: action.payload, isLoading: false, error: null };
    case 'FETCH_USERS_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter(user => user.id !== action.payload) };
    default:
      return state;
  }
};

const getUserDataFromLocalStorage = (): User[] => {
  const userData = localStorage.getItem('users');
  return userData ? JSON.parse(userData) : [];
};

const UserContext = createContext<{ state: UserState; dispatch: Dispatch<Action>; deleteUser: (id: number) => void } | undefined>(undefined);

export const useUserState = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = () => {
    dispatch({ type: 'FETCH_USERS_REQUEST' });
    try {
      const users = getUserDataFromLocalStorage();
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
    } catch (error) {
      dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (id: number) => {
    dispatch({ type: 'DELETE_USER', payload: id });
  };

  return (
    <UserContext.Provider value={{ state, dispatch, deleteUser }}>{children}</UserContext.Provider>
  );
};
