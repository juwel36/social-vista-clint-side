import { useQuery } from "@tanstack/react-query";
import useAxoisPublic from "../Hooks/useAxiosPublic";
import Spinner from "./Spinner";


const Suggestedtag = () => {
const axoisPublic=useAxoisPublic()



  const { isPending,  data:tags } = useQuery({
    queryKey: ['tags'],
    queryFn:async () =>{
  const res=await axoisPublic.get('/tags')
  return res.data
    }
     
  })
  
  

if(isPending) return <Spinner></Spinner>




  return (
    <div>
        <h1 className="font-medium font-mono py-2"> Suggested Tag for Search: </h1>

<div className="flex flex-wrap gap-10 items-center justify-center  bg-slate-300  p-5 rounded-lg">
{
  tags.map(item=>(
    <div key={item._id}>
<p> # {item.tags} </p>

    </div>
  ))
}

</div>


    </div>
  );
};

export default Suggestedtag;