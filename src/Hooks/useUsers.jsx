import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure'

const useUsers = () => {
const axiosSecure=useAxiosSecure()


const { isPending,  data:users, } = useQuery({
  queryKey: ['users'],
  queryFn:async () =>{
const res=await axiosSecure.get('/users')
return res.data
  }
   
})




return [users,isPending]
};

export default useUsers;