import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../AuthProbider/AuthProvider";
import useAxoisPublic from "../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GoogleLoginbtn = () => {
  const { googleAuth } = useContext(AuthContext);
const axiosPublic=useAxoisPublic()
const navigate=useNavigate()

  const handlegoogleLogin = () => {
    googleAuth()
    .then(res=> {

      const userInfo={
      email: res.user?.email,
      name: res.user?.displayName,
      Badge: 'Bronze',
      }
      axiosPublic.post('/users',userInfo)
      .then(res=>{
        console.log(res);
      })
      
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: ' Successfully Log In',
              showConfirmButton: false,
              timer: 1500
            })
            navigate('/')
          })
          .catch(error=>{
            console.log(error);
          })
  };

  return (
    <div>
      <div>
        <button
          onClick={handlegoogleLogin}
          className="mb-3 flex select-none bg-sky-900 mx-auto items-center gap-3 rounded-lg border-b-2 border-blue-gray-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-blue-gray-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-dark="true"
        >
          <FaGoogle /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLoginbtn;
