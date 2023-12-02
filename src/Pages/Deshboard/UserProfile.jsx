import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../Components/Spinner";
import { FaMedal } from "react-icons/fa";
import AboutMe from "../Comments/AboutMe";
import useAxoisPublic from "../../Hooks/useAxiosPublic";


const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UserProfile = () => {
  const axiosSecure = useAxoisSecure()
  const axiosPublic = useAxoisPublic()
  const { user } = useContext(AuthContext)
  const [afterloading,setAfterloading]=useState(false)
  const [selectedFile, setSelectedFile] = useState(null);



  const { isPending, data: users,refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`)
      return res.data
    }

  })


  const {  data: userPosts } = useQuery({
    queryKey: ['userPosts', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user?.email}`);
      return res.data;
    },
  });
  


  if (isPending) {
    return  <Spinner></Spinner> 
  }

 
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return formattedTime;
  };
  

  // ... (other code)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handlepatchimage = async (e, userId) => {
    e.preventDefault();
    setAfterloading(true);

    const imageFile = { image: e.target.elements.image.files[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    
    
  
    const menuItem = {
      photoUrl: res.data.data.display_url,
    };
    const Menures = await axiosSecure.patch(`/users/${userId}`, menuItem);
    e.target.reset();
    
    refetch()
    setAfterloading(false); 
  };
  

  return (
    <div>
      <h1 className="text-3xl text-black lg:pt-20 p-3 mb-4"> My Profile </h1>
      <div >
        <div >
          {users?.map((userData) => (
         <div className="flex flex-col-reverse lg:flex-row justify-evenly" key={userData._id}>
             <div >
              <h1 className="pb-3">
                Full name : <span className="text-2xl">{user?.displayName}</span>
              </h1>
              <h1 className="pb-3">
                Email Address : <span className="lg:text-2xl">{user?.email}</span>
              </h1>
              <h1 className="pb-3 flex items-center gap-4">
                Badge:{" "}
                <span className="text-2xl">
                  {userData.Badge === "Bronze" && (
                    <span className=" text-slate-400 ">
                      <FaMedal></FaMedal>
                    </span>
                  )}
                  {userData.Badge === "Gold" && (
                    <span className="text-[#FFD700]">
                      <FaMedal></FaMedal>
                    </span>
                  )}
                </span>
              </h1>
            </div>

        <div>
          
          <img
            className="w-28 rounded-full border-blue-800 border-2 shadow-md"
            src={userData.photoUrl}
            alt=""
          />
          <div>
          <form onSubmit={(e) => handlepatchimage(e, userData._id)}>
<label className="label">
    <span className="label-text">Image*</span>
 
  </label>
  <input type="file" name="image" onChange={handleFileChange}/>
<input  className="btn" type="submit" value="Edit Photo"  disabled={!selectedFile} />

            </form>

</div>
        </div>


         </div>
          ))}
        </div>
      </div>
<div>
  <h1 className="text-2xl my-5 mt-24 p-1">  Recent
posts :</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {userPosts?.slice(0, 3).map((post) => (
          <div key={post._id}>
          <div  className="relative flex w-full flex-col rounded-xl h-72  bg-slate-100 p-2  text-gray-700 shadow-md">
  <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-black shadow-none rounded-xl bg-clip-border">
    <img
      src={post.image}
      alt="tania andrew"
      className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
    />
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {post.name}
        </h5>
        <div className="flex items-center gap-0 5">
        


        </div>
      </div>
     
    </div>
  </div>
  <div className="p-0 mb-6 flex-grow ">
    <p className=" text-xl  ">
    Title:  {post.title}
    </p>
  </div>
<div className='flex justify-between font-semibold '>
<h1> Tag: {post.tag} </h1>
<h1>Time:  {formatTimestamp(post.timestamp)} </h1>
</div>
<div className='flex justify-between mt-3 font-semibold'>
<h1> 


    </h1>
    <div>

    </div>
</div>




</div> 
          </div>
        ))}
      </div>
     
</div>
<AboutMe></AboutMe>
{afterloading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          )}
    </div>
  );
};

export default UserProfile;