import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import Spinner from "../../Components/Spinner";
import Swal from "sweetalert2";
import useAxoisPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const Mypost = () => {
const axiosSecure=useAxoisSecure()
const axiospublic=useAxoisPublic()
const {user}=useContext(AuthContext)

  const { isPending, data:posts,refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user.email}`)
      return res.data
    }
  })


  if (isPending) return <Spinner></Spinner>

  const handledelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
     
      if (result.isConfirmed) {
        axiosSecure.delete(`/posts/${_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
           
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the post.",
              icon: "error",
            });
          });
      }
    });
  };
  

  return (
    <div className="pt-10">
      
      <div className="overflow-x-auto ">


      <table className="table">
           
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
        <th>{index+1}  </th>
        <td> {item.title}  </td>
        <td> {item.upvote}  </td>
        <td>
          <Link to={`/comments/${item._id}`}>
            <button className="btn">Comments </button>
          </Link>
              </td>
        <td>  <button 
        onClick={()=>handledelete(item._id) }
        className="btn">Delete </button>  </td>
      </tr>  )
      
      }
    
 
    </tbody>
         </table>


  {/* <table className="table">
 
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
        <th>{index+1}  </th>
        <td> {item.title}  </td>
        <td> {item.upvote}  </td>
        <td>
          <Link to={`/comments/${item._id}`}>
            <button className="btn">Comments </button>
          </Link>
              </td>
        <td>  <button 
        onClick={()=>handledelete(item._id) }
        className="btn">Delete </button>  </td>
      </tr>  )
      
      }
    
 
    </tbody>
  </table> */}
</div>



    </div>
  );
};

export default Mypost;