import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure'

const useComments = () =>  {
  const axiosSecure=useAxiosSecure()
  
  
  const { isPending,  data:comments } = useQuery({
    queryKey: ['comments'],
    queryFn:async () =>{
  const res=await axiosSecure.get('/comments')
  return res.data
    }
     
  })
  
  
  
  
  return [comments,isPending]
  };
export default useComments;