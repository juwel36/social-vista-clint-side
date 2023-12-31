import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProbider/AuthProvider";
import { useContext } from "react";
import useAxoisSecure from "./useAxiosSecure";

const useAdmin = () => {
  const {user,loading}=useContext(AuthContext)
  const axiosSecure=useAxoisSecure()
  const {data:isAdmin ,isPending}=useQuery({
  queryKey: [user?.email,'isAdmin'],
  enabled:!loading,
  queryFn:async()=>{
  const res=await axiosSecure.get(`/users/admin/${user.email}`)
  console.log(res.data);
  return res.data?.admin
  }
  
  })
  return [isAdmin,isPending]
  
  };
  
  export default useAdmin;