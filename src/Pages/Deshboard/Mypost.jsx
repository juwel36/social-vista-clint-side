import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import Spinner from "../../Components/Spinner";


const Mypost = () => {
const axiosSecure=useAxoisSecure()
const {user}=useContext(AuthContext)

  const { isPending, data:posts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user.email}`)
      return res.data
    }
  })

  if (isPending) return <Spinner></Spinner>


  return (
    <div className="pt-10">
      
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th> Post Title</th>
        <th>Number of votes
</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {  
      posts?.map((item,index)=>   <tr key={item._id}>
        <th>{index}  </th>
        <td> {item.title}  </td>
        <td> {item.upvote}  </td>
        <td>  <button className="btn">Comments </button>  </td>
        <td>  <button className="btn">Delete </button>  </td>
      </tr>  )
      
      }
    
 
    </tbody>
  </table>
</div>



    </div>
  );
};

export default Mypost;