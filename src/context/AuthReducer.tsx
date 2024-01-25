import { Reducer } from 'react';
import { AuthAction } from './authActions';

export interface AuthState {
  isAdminAuth?: boolean;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  authToken?: string
}

export interface PersistState {
  persist?: boolean;
}

export const defaultAuthState: AuthState = {
  isAdminAuth: false
};

export const defaultPersistState: PersistState = {
  persist: false
}

const AuthReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  
  if (action.type === 'ADMIN_LOG_IN') {
    return {
      ...state,
      isAdminAuth: true,
      id: action.payload.id,
      email: action.payload.email,
      role: action.payload.role,
      authToken: action.payload.authToken
    };
  }

  if (action.type === 'ADMIN_LOG_OUT') {
    return {
      ...state,
      isAdminAuth: false,
      email: '',
      role: '',
      authToken: '',
      refreshToken: ''
    };
  }

  return defaultAuthState;
};

export default AuthReducer;
