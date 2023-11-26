import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import img from '../../assets/login.jpg'
import GoogleLoginbtn from "../../Components/GoogleLoginbtn";
import { useContext } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Login = () => {
const navigate=useNavigate()
  const {Loginguser} =useContext(AuthContext)


  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm()

  const onSubmit = (data) =>{


    Loginguser(data.email,data.password)
  .then(res=>{
 Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Logged In Succsesfully",
  showConfirmButton: false,
  timer: 1500
});
navigate('/')
  })
  .catch(err=>{
    console.log(err);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Please give me valid email and pass",
      showConfirmButton: false,
      timer: 1500
    });
  })
  


  }


  


  return (
    <div>
<Navbar></Navbar>

<div className="hero min-h-screen ">
<div className="hero-content flex-col lg:flex-row">
   <div className="text-center lg:text-left">
    <img className='w-[700px]' 
    src={img}
   
    
     alt="" />
   </div>
   <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-teal-700">


    <form onSubmit={handleSubmit(onSubmit)}  className="card-body ">
   

      <div className="form-control">
         <label className="label">
          <span className="label-text text-white">Email</span>
        </label>
        <input type="email" name="email" placeholder="email" {...register("email",{ required: true })}className="input input-bordered" required />
        {errors.email && <span className="text-red-500">This field is required</span>}
       </div>
       <div className="form-control">
         <label className="label">
          <span className="label-text text-white">Password</span>
         </label>
         <input type="password" name="password" {...register("password",{ required: true })}placeholder="password" className="input input-bordered" required />
        <label className="label">
         <p href="#" className="label-text-alt  text-black">Dont't Have an account ?<span className='text-white'> <Link to='/signup'>Regestraion</Link></span> </p>
         </label>
         {Error && <p className="text-red-600"> {Error} </p>}
       </div>
       <div className="form-control mt-6">
         <button className="btn bg-blue-700 border-0 text-white">Log in</button>
       </div>
     </form>
     <GoogleLoginbtn></GoogleLoginbtn>
  
  </div>
</div>
 </div>



      
    </div>
  );
};

export default Login;