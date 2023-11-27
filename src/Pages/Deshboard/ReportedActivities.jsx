import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../Components/Spinner";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";


const ReportedActivities = () => {

const axiosSecure=useAxoisSecure()

  const { isPending,  data:report,refetch } = useQuery({
    queryKey: ['report'],
    queryFn:async () =>{
  const res=await axiosSecure.get('/report')
  return res.data
    }
     
  })
  if (isPending) return <Spinner></Spinner>


  
  const handledelete = (item) => {
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
     
        axiosSecure.delete(`/report/${item._id}`)
          .then((res) => {
            console.log(res);
            if (res.data.deletedCount > 0) {
        
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: " reported comment has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the report.",
              icon: "error",
            });
          });
  
        axiosSecure.delete(`/comments/${item.commentId}`)
          .then((res) => {
            console.log(res);
            if (res.data.deletedCount > 0) {
     
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: " comment has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error ", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the comment.",
              icon: "error",
            });
          });
      }
    });
  };
  
  


  return (
    <div>
      
      <div className="overflow-x-auto">
  <table className="table">
  
    <thead>
      <tr>
        <th></th>
        <th> Email </th>
        <th> Comments </th>
        <th>Feedback </th>
        <th>Action </th>
      </tr>
    </thead>
    <tbody>
      {report?.map((item,index)=>   <tr key={item._id}>
        <th> {index+1} </th>
        <td>  {item.email} </td>
        <td>  {item.comment} </td>
        <td> {item.feedback} </td>
        <td>  <button 
        onClick={()=>handledelete(item) }
        className="btn text-red-500"> <FaTrash></FaTrash> </button>  </td>
      </tr>   )  }
     
  
    </tbody>
  </table>
</div>



    </div>
  );
};

export default ReportedActivities;