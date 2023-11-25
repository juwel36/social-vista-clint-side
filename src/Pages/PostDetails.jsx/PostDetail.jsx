import { AwesomeButton } from "react-awesome-button";
import {  FaShare } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { SlDislike, SlLike } from "react-icons/sl";
import { useContext } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PostDetail = () => {
const {user}=useContext(AuthContext)
const axoisSecure=useAxoisSecure()
const {_id,description,email,image,name,timestamp,tag,title,upvote,downvote}=useLoaderData()


 
const getFormattedTime = (timestamp) => {
  const date = new Date(timestamp);
  let hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;

  return `${hour}:${minute < 10 ? '0' : ''}${minute} ${ampm}`;

}

const handlepostcomment=async (e)=>{
e.preventDefault()
const comment=e.target.comment.value;

if(user){

const commentdata={
  comment,
  title:title,
  email:email,
  postId:_id
}
const postdata=await axoisSecure.post('/comments',commentdata)

if(postdata.data.insertedId){
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Comment placed succesfully",
    showConfirmButton: false,
    timer: 1500
  });


  }
 
}else{
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: "You have to Log in for Comment",
    showConfirmButton: false,
    timer: 1500
  });

}

}


  return (
    <div className="mt-10 max-w-6xl mx-auto">

     <div>
<div className="flex gap-10 items-center">
  <img className="w-24 rounded-full border-2 border-blue-700 shadow-xl " src={image} alt="" />
<div>
<h1 className="text-2xl font-semibold">{name} </h1>

</div>
</div>

<div>

<p className="text-xl font-medium pt-5 pb-2"> <span className="text-gray-700 text-base"> Title:  </span >  {title} </p>
<p className="text-xl font-medium  pb-2"> <span className="text-gray-700"> #</span>{tag} </p>
<p> <span className=""> Posted time : </span> {getFormattedTime(timestamp)}  </p>
</div>

<div>

<p className="font-medium py-2 border-2 p-2 rounded-lg border-blue-300 my-2"> Post Description: {description} </p>
</div>

<div>

  <div className="flex gap-5">
<div className="flex gap-1 items-center">
<SlLike />
   {upvote}
</div>
<div className="flex gap-1 items-center">
<SlDislike />
  {downvote}
</div>
  </div>
<div className="flex gap-4 my-5">
  <button className="flex gap-2 items-center border-2 rounded-lg p-1 px-3"> Up Vote <SlLike /> </button>
  <button className="flex gap-2 items-center border-2 rounded-lg p-1 px-3"> Down Vote <SlDislike /> </button>
</div>
<div>
<form onSubmit={handlepostcomment}>

<input type="text" name="comment" placeholder="write your comment" className="input input-bordered input-info w-full max-w-xs" />

<input type="submit" className="bg-blue-600 text-white p-2 py-3 rounded-lg" value="Comment" />

</form>


</div>

</div>



<div>
  <FaShare></FaShare>
</div>


     </div>




{/* 
: 
"Unleashing the Power of Lines and Logic: Let's Talk Coding! 🚀"
downvote
: 
"0"

: 
"mor525925@gmail.com"
image
: 
"https://i.ibb.co/Vq8BMFY/4679-9527.jpg"
name
: 
"Mx juwel"
tag
: 
"webdevelopment"
timestamp
: 
"2023-11-25T03:26:17.073Z"
title
: 
"Unleashing the Power of Lines and Logic: Let's Talk Coding! 🚀"
upvote
: 
"8"
_id
:  */}
    </div>
  );
};

export default PostDetail;