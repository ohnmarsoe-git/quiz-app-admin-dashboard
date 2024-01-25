import {useEffect} from 'react';
import axios from '../API/config';
import { axiosInstance } from '../API/config';
import { useLocation } from 'react-router-dom';
import useAuth from './useAuth'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const usePrivateApi = () => {

  const location = useLocation();

  const { authAdminState, loginDispatch, logoutDispatch } = useAuth ();

  let token:any;

  if (location.pathname.includes('admin') && authAdminState.isAdminAuth)
    token = authAdminState.authToken;

  useEffect(() => {

    const requestIntercept = axiosInstance.interceptors.request.use( (config: any) => {
      if(token) {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config
    }, (error: any) => {
      return Promise.reject(error);
    })
  
    const responseIntercept = axiosInstance.interceptors.response.use( 
      (response: any) => response,
      async(error : any) => {
        const prevRequest = error?.config;
        if(error?.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          try {
            
            const res = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true});
          
            const newAccessToken = res?.data?.accessToken;

            if(newAccessToken) {
              //@ts-ignore
              loginDispatch( prev => {
                return { ...prev, authToken: newAccessToken }
              })
            
              prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              return axiosInstance(prevRequest);
            }
          } catch(error) {
            if(error) logoutDispatch('admin');
          }
          return Promise.reject(error);
        }
        
        
      })

      return () => {
        axiosInstance.interceptors.request.eject(requestIntercept);
        axiosInstance.interceptors.response.eject(responseIntercept);
      }

  }, [authAdminState, token, loginDispatch, logoutDispatch])
  return axiosInstance;
}

export default usePrivateApi