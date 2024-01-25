import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState
} from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AuthActionEnum } from './authActions';
import authReducer, { AuthState, defaultAuthState } from './AuthReducer';

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  authToken: string;
};

export interface IAuthContext {
  authAdminState: AuthState;
  loginDispatch: (props: UserData) => void;
  logoutDispatch: (props: string) => void;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContext>({
  authAdminState: defaultAuthState,
  loginDispatch: () => {},
  logoutDispatch: () => {},
  persist: false,
  setPersist: () => {}
});

export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children
}) => {
  const [authAdminState, setAuthAdminState] = useReducer(
    authReducer,
    defaultAuthState
  );

  //@ts-ignore
  const [ persist, setPersist ] = useState( JSON.parse(localStorage.getItem("persist")) || false)

  const navigate = useNavigate();

  useEffect(() => {

    if(authAdminState?.authToken) {
      if (checkTokenExpiration(authAdminState?.authToken)) {
        logoutDispatch();
        navigate('/admin/login');
      }
    }
    // eslint-disable-next-line
  }, []);

  // check JWT token
  const checkTokenExpiration = (token: string) => {
    let decodedToken: any = jwt_decode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      return true;
    }
  };

  const loginDispatch = useCallback(
    (props: UserData) => {
      const { id, email, role, authToken } =
        props;

        setAuthAdminState({
          type: AuthActionEnum.ADMIN_LOG_IN,
          payload: {
            id,
            email,
            role,
            authToken
          }
        });

        navigate('/admin/dashboard');
    },
    [navigate]
  );

  const logoutDispatch = useCallback(
    () => {
      setAuthAdminState({
        type: AuthActionEnum.ADMIN_LOG_OUT,
        payload: null
      });
      navigate('/admin/login');
    },
    [navigate]
  );

  return (
    <AuthContext.Provider
      value={{ authAdminState, loginDispatch, logoutDispatch, persist, setPersist}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
