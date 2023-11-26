
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner';

const Comments = () => {
  const axiosSecure = useAxiosSecure();
  const { postId } = useParams();

  const { isPending, data: comments = [] } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/post/${postId}`);

      const filteredComments = res.data.filter(comment => comment.postId === postId);

      
      return filteredComments;
    },
  });

  if (isPending) return <Spinner />;

  return (
    <div>
  
      <div>

     <div className="overflow-x-auto">
 <table className="table">
  <thead>
   <tr>
 <th></th>
 <th>Email</th>
 <th> Comments </th>
  <th>Action</th>
  <th>Action</th>
  </tr>
  </thead>
  <tbody>
     {Array.isArray(comments) && comments.length > 0 ? (
      comments?.map((comment,index) => (
        <tr key={comment._id}>
  <th>{index+1}  </th>
  <td> {comment.email}   </td>
  <td> {comment.comment}   </td>
   <td> <button className='btn'>feedback </button> </td>
   <td> <button className='btn'> Report </button> </td>
  </tr>
      ))
    ) : (
      <p className='text-3xl font-semibold text-blue-600 p-5'>No comments available.</p>
    )}


   </tbody>
   </table>
 </div>


     
      </div>
    </div>
  );
};

export default Comments;


// <div className="overflow-x-auto">
//   <table className="table">
//     <thead>
//       <tr>
//         <th></th>
//         <th>Name</th>
//         <th>Job</th>
//         <th>Favorite Color</th>
//       </tr>
//     </thead>
//     <tbody>
//       {/* row 1 */}
//       <tr>
//         <th>1</th>
//         <td>Cy Ganderton</td>
//         <td>Quality Control Specialist</td>
//         <td>Blue</td>
//       </tr>
//     
//     
//     </tbody>
//   </table>
// </div>