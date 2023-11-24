import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import Select from 'react-select';
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddPost = () => {
const {user}=useContext(AuthContext)
const [selectedTag, setSelectedTag] = useState(null);
const axoisSecure=useAxoisSecure()
const [afterloading,setAfterloading]=useState(false)


const tagOptions = [
  { value: 'politics', label: 'politics' },
  { value: 'webdevelopment', label: 'webdevelopment' },
  { value: 'society', label: 'society' },
  { value: 'humanrights', label: 'humanrights' },
  { value: 'education', label: 'education' },
  { value: 'travel', label: 'travel' },
  { value: 'lifestyle', label: 'lifestyle' },
  { value: 'fashion', label: 'fashion' },
  { value: 'pets', label: 'pets' },
  { value: 'programming', label: 'programming' },

];

const handleTagChange = (selectedOption) => {
  setSelectedTag(selectedOption);
};


const currentTime = new Date();

const handleSubmit=async(e)=>{
  e.preventDefault();
  setAfterloading(true);
  const image=e.target.image.value;
  const name=e.target.name.value;
  const title=e.target.title.value;
  const description=e.target.description.value;
  const tag=e.target.tag.value;
  const email=e.target.email.value;
  const upvote=e.target.upvote.value;
  const downvote=e.target.downvote.value;

const userData={
  image,name,title,description,tag,email,upvote,downvote,
  timestamp: currentTime.toISOString(),
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


  }


setAfterloading(false); 


}


  return (
    <div>
      


      <div className="p-4">

<h1 className="text-2xl pt-3"> Create Post </h1>

<form onSubmit={handleSubmit} >
<div className="flex   gap-7 mt-7">

<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">Author Image </h1>
<input type="text" name="image" placeholder="Author Image" className="input input-bordered input-info w-full " />
</div>

<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">Author Name</h1>
<input type="text" name="name" placeholder="Author Name" className="input input-bordered input-info w-full " />
</div>

</div>

{/* ---- */}
<div className="flex  gap-7">

<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">
Post Title </h1>
<input type="text" name="title" placeholder=""   className="input input-bordered input-info w-full " />
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

<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">
Author Email </h1>
<input type="text" name="email" placeholder="" readOnly defaultValue={user?.email} className="input input-bordered input-info w-full " />


</div>
</div>

{/* ------------------- */}
<div className="flex gap-7">
<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3"> Up Vote
 </h1>
 <input type="text" name="upvote" defaultValue={0} placeholder="0" readOnly  className="input input-bordered input-info w-full " />


</div>

<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3"> Down Vote
 </h1>
 <input type="text" name="downvote" defaultValue={0} placeholder="0" readOnly  className="input input-bordered input-info w-full " />


</div>

</div>


<input className="btn w-full my-8 mb-14" type="submit" value="Create Post" />
{afterloading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          )}

</form>





</div>


    </div>
  );
};

export default AddPost;