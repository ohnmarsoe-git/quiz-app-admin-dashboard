import axios from  '../API/config'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { loginDispatch, authAdminState } = useAuth();

  const refresh = async() => {
      
        const response = await axios.get('/refresh', {
          withCredentials: true
        })
        
        if(response.status === 200) {
    
          loginDispatch({
              id: authAdminState?.id,
              email: authAdminState?.email,
              role: authAdminState?.role, 
              authToken: response.data?.accessToken
            }
          )
  
          return response.data?.accessToken;
        }

  }

  return refresh
}

export default useRefreshToken