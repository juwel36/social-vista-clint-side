import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import Select from 'react-select';
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxoisPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner";
import { MdPaid } from "react-icons/md";
import { Link } from "react-router-dom";

const AddPost = () => {
const {user}=useContext(AuthContext)
const [selectedTag, setSelectedTag] = useState(null);
const axoisSecure=useAxoisSecure()
const [afterloading,setAfterloading]=useState(false)

const axoisPublic=useAxoisPublic()


  const { isPending, data:posts,refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axoisSecure.get(`/posts?email=${user.email}`)
      return res.data
    }
  })

  const {  data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axoisSecure.get(`/users?email=${user.email}`)
      return res.data
    }

  })



  const {  data:tags } = useQuery({
    queryKey: ['tags'],
    queryFn:async () =>{
  const res=await axoisPublic.get('/tags')
  return res.data
    }
     
  })
  
  

if(isPending) return <Spinner></Spinner>

let Badge = null;

if (users && users.length > 0) {
  const currentUser = users?.find(u => u.email === user.email);
  
  if (currentUser) {
    Badge = currentUser.Badge;
  }
}

const postLimitReached = Badge === "Bronze" && posts && posts.length >= 5;



const tagOptions = tags?.map((tag) => ({
  value: tag.tags, 
  label: tag.tags, 
}));


const handleTagChange = (selectedOption) => {
  setSelectedTag(selectedOption);
};


const currentDateTime = new Date();
const currentTime = currentDateTime.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });


const handleSubmit=async(e)=>{
  e.preventDefault();
  setAfterloading(true);



  
  const image="https://i.ibb.co/ncgRKSj/download-2.png"
  const name=user.displayName
  const title=e.target.title.value;
  const description=e.target.description.value;
  const tag=e.target.tag.value;
  const email=user.email;
  const upvote="0"
  const downvote="0"



const userData={
  image,name,title,description,tag,email,upvote,downvote,
  timestamp:currentTime,
}

const postdata=await axoisSecure.post('/posts',userData)
console.log(postdata);
if(postdata.data.insertedId){
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "posted succesfully",
    showConfirmButton: false,
    timer: 1500
  });

  e.target.reset();
  }


setAfterloading(false); 


}


  return (
    <div>
      


      <div className="p-4">

<h1 className="text-2xl pt-3"> Create Post </h1>


{postLimitReached ? (
        <div className="  lg:p-20">
          <p>You have reached the maximum limit of 5 posts as a Bronze Badge member.  </p>
          <Link to='/membership'>
          
          <button
            className="btn  w-full my-8 mb-14"
           
          >
            Become a Member <MdPaid></MdPaid>
          </button>
          </Link>
        </div>
      ) :(


<form onSubmit={handleSubmit} >
<div className="flex   gap-7 mt-7">



</div>

{/* ---- */}
<div className="flex  gap-7">

<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">
Post Title </h1>
<input type="text" name="title" placeholder="" maxLength="70"  className="input input-bordered input-info w-full " />
</div>
<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">Post
Description </h1>
 <textarea name="description" id="" className="input input-bordered input-info w-full " ></textarea>

</div>

</div>

{/* ---------------- */}
<div className="flex gap-7">
<div className="w-full">
              <h1 className="text-xl font-bold text-black pt-4 pb-3"> Tag </h1>
              <Select
                name="tag"
                value={selectedTag}
                onChange={handleTagChange}
                options={tagOptions}
              />
            </div>


</div>



<input className="btn w-full my-8 mb-14" type="submit" value="Create Post" />
{afterloading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          )}

</form>

      )

}





</div>


    </div>
  );
};

export default AddPost;