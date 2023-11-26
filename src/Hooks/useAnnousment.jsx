import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure'

const useAnnousment = () => {
  const axiosSecure=useAxiosSecure()
  
  
  const { isPending,  data:announcement ,refetch} = useQuery({
    queryKey: ['announcement'],
    queryFn:async () =>{
  const res=await axiosSecure.get('/announcement')
  return res.data
    }
     
  })
  
  
  
  
  return [announcement,isPending,refetch]
};

export default useAnnousment;