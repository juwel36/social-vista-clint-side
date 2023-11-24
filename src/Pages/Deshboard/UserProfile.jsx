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

  if (isPending) {
    return <div className="flex  justify-center items-center">
      <div> <Spinner></Spinner>  </div></div>
  }
  console.log(users);


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
    </div>
  );
};

export default UserProfile;