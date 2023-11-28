import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProbider/AuthProvider";


 const axiosSecure=axios.create({
  baseURL:'https://social-vista-server-side.vercel.app'
})

const useAxoisSecure = () => {
  const {logOut}=useContext(AuthContext)
const navigate=useNavigate()

axiosSecure.interceptors.request.use(function(config){
  const token=localStorage.getItem('access-token')
  // console.log(token);
config.headers.authorization=`Bearer ${token}`
  return config
},function (error){

  return Promise.reject(error)
})
axiosSecure.interceptors.response.use(function(response){
  return response
},async (error)=>{
const status=error.response.status;
if(status===401 || status === 403){

await logOut()
navigate('/login')
}

return Promise.reject(error)
})



 return axiosSecure;
};

export default useAxoisSecure;