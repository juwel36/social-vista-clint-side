import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import Swal from 'sweetalert2';

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

  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleReadMore = comment => {
    setSelectedComment(comment);
    document.getElementById('my_modal_1').showModal();
  };

  const handleFeedbackChange = feedback => {
    setSelectedFeedback(feedback);
  };

  const handleReportClick =async (commentId,email,comment)  => {
    const commentdata=await axiosSecure.post('/report', { postId,comment, commentId,email, feedback: selectedFeedback });
    console.log(commentdata);
if(commentdata.data.insertedId){
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "posted succesfully",
    showConfirmButton: false,
    timer: 1500
  });

  
  }
    
    setSelectedFeedback(null);
  };


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
                <th>Comments</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(comments) && comments.length > 0 ? (
                comments?.map((comment, index) => (
                  <tr key={comment._id}>
                    <th>{index + 1}</th>
                    <td>{comment.email}</td>
                    <td>
                      {comment.comment.length > 20 ? (
                        <>
                          {comment.comment.slice(0, 20)}{' '}
                          <button  onClick={() => handleReadMore(comment)}>

                            <span className='text-blue-800 font-semibold'>

                            Read More...
                            </span>
                          </button>
                        </>
                      ) : (
                        comment.comment
                      )}
                    </td>
                    <td>
                <select
                  className='form-control'
                  value={selectedFeedback}
                  onChange={(e) => handleFeedbackChange(e.target.value)}
                >
                  <option value="">Select Feedback</option>
                  <option value="Hate-speech">Hate-speech </option>
                  <option value="spam">spam </option>
                  <option value="Harassment">Harassment </option>
                </select>
              </td>
              <td>
                <button
                  className='btn'
                  onClick={() => handleReportClick(comment._id,comment.email,comment.comment)}
                  disabled={!selectedFeedback}
                >
                  Report
                </button>
              </td>
                  </tr>
                ))
              ) : (
                <p className='text-3xl font-semibold text-blue-600 p-5'>No comments available.</p>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedComment && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Comment</h3>
            <p className="py-4">{selectedComment.comment}</p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => document.getElementById('my_modal_1').close()}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Comments;
