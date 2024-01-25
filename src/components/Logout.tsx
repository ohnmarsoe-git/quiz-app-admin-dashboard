import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../API/config';
import AuthContext from '../context/authProvider';

const Logout = () => {
  const api: any = axios;

  const {  authAdminState, logoutDispatch } = useContext(AuthContext);

  const authAdminToken = authAdminState.authToken;

  const navigate = useNavigate();

  const requestHandle = (token: any) => {
    api
      .get(`/logout`, { withCredentials: true })
      .then((res: any) => {
        if (res.status === 200 || res.status === 204) {
          delete api.defaults.headers.common['Authorization'];
          logoutDispatch('');
          localStorage.removeItemItem("persist");
          return navigate('/admin/login');
        }
      })
      .catch((error: any) => {
        if (error.response) {
          logoutDispatch('');
          return navigate('/admin/login');
        }
      });
  };

  const handleLogout = async () => {
    requestHandle(authAdminToken);
  }

  return (
    <>
      <button onClick={() => handleLogout}>Logout</button>
    </>
  );
};

export default Logout;
