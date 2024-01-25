import { useState, useContext } from 'react';
import AuthContext from '../context/authProvider';
import axios from '../API/config';

const useLogin = () => {
  const api: any = axios;

  const { loginDispatch } = useContext(AuthContext);

  const [onerrors, setOnErrors] = useState({
    email: '',
    password: ''
  });

  const onSubmit = (data: any) => {
    try {
      api
        .post(`/auth`, data)
        .then((res: any) => {
          if (res.status === 200) {
            loginDispatch({
              id: res.data?.user.id,
              firstName: res.data?.user.firstName,
              lastName: res.data?.user.lastName,
              email: res.data?.user.email,
              role: res.data?.user.role,
              authToken: res.data.accessToken
            });
          }
        })
        .catch((error: any) => {
          setOnErrors(error.response.data.errors);
        });
    } catch (err: any) {
      setOnErrors(err.response.data);
    }
  };

  return {
    onerrors,
    onSubmit
  };
};

export default useLogin;
