import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure'

const useComments = () =>  {
  const axiosSecure=useAxiosSecure()
  
  
  const { isPending,  data:comments ,refetch} = useQuery({
    queryKey: ['comments'],
    queryFn:async () =>{
  const res=await axiosSecure.get('/comments')
  return res.data
    }
     
  })
  
  
  
  
  return [comments,isPending,refetch]
  };
export default useComments;