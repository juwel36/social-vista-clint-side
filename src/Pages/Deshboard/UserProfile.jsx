import { useContext } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../Components/Spinner";
import { FaMedal } from "react-icons/fa";


const UserProfile = () => {
  const axiosSecure = useAxoisSecure()
  const { user } = useContext(AuthContext)

  const { isPending, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`)
      return res.data
    }

  })
  const {  data: userPosts } = useQuery({
    queryKey: ['userPosts', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user.email}`);
      return res.data;
    },
  });
  


  if (isPending) {
    return <div className="flex  justify-center items-center">
      <div> <Spinner></Spinner>  </div></div>
  }

  const getFormattedTime = (timestamp) => {
    const date = new Date(timestamp);
    let hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    return `${hour}:${minute < 10 ? '0' : ''}${minute} ${ampm}`;

  }


  return (
    <div>
      <h1 className="text-3xl text-black lg:pt-20 p-3 mb-4"> My Profile </h1>
      <div className="flex flex-col-reverse lg:flex-row justify-evenly">
        <div>
          {users?.map((userData) => (
            <div key={userData._id}>
              <h1 className="pb-3">
                Full name : <span className="text-2xl">{user?.displayName}</span>
              </h1>
              <h1 className="pb-3">
                Email Address : <span className="text-2xl">{user?.email}</span>
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
          ))}
        </div>
        <div>
          <img
            className="w-28 rounded-full border-blue-800 border-2 shadow-md"
            src={user.photoURL}
            alt=""
          />
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
<h1>Time: {getFormattedTime(post.timestamp)} </h1>
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


    </div>
  );
};

export default UserProfile;