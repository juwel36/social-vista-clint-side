import React, { useContext } from 'react';
import useAdmin from '../Hooks/useAdmin';
import { AuthContext } from '../AuthProbider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner';

const AdminRoute = ({children}) => {
  const [isAdmin,isPending]=useAdmin()
  const {user,loading}=useContext(AuthContext)
  let location = useLocation();

  if(loading || isPending){
    return <div >
<div> <Spinner></Spinner> </div>

    </div>
  }
  
  if(user && isAdmin){
    return children
  }


  return <Navigate to='/'
  state={{ from: location }} replace
  ></Navigate>
};

export default AdminRoute;