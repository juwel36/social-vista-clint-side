import { useContext } from "react";
import { AuthContext } from "../AuthProbider/AuthProvider";
import { Navigate } from "react-router-dom";
import Spinner from "../Components/Spinner";




const PrivetRoute = ({children}) => {
  const {user,loading}=useContext(AuthContext)


  if(loading){
    return <div className="flex justify-center items-center">
<div> <Spinner></Spinner>  </div>

    </div>
  }
  
  if(user){
    return children
  }
  
    return <Navigate to='/login'></Navigate>
};

export default PrivetRoute;