import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = (isAllowed: any) => {
  return isAllowed ? <Outlet /> : <Navigate replace to="/admin/login" />;
};

export default PrivateRoute;
