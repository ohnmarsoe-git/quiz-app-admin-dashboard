import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/authProvider';

const useAuth = () => {
  const { authAdminState } =  useContext(AuthContext)
  useDebugValue( authAdminState, authAdminState => authAdminState?.email ? "Logged in" : "Logged Out");
  
  return useContext(AuthContext);
}

export default useAuth