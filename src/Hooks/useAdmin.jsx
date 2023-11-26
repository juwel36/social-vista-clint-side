import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProbider/AuthProvider";
import { useContext } from "react";
import useAxoisSecure from "./useAxiosSecure";

const useAdmin = () => {
  const {user}=useContext(AuthContext)
  const axiosSecure=useAxoisSecure()
  const {data:isAdmin}=useQuery({
  queryKey: [user?.email,'isAdmin'],
  queryFn:async()=>{
  const res=await axiosSecure.get(`/users/admin/${user.email}`)
  console.log(res.data);
  return res.data?.admin
  }
  
  })
  return [isAdmin]
  
  };
  
  export default useAdmin;