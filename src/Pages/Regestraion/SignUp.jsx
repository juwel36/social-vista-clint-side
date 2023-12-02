import { useForm } from "react-hook-form";

import img from '../../assets/141.jpg'
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginbtn from "../../Components/GoogleLoginbtn";
import { useContext } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import Navbar from "../../shared/Navbar/Navbar";
import Swal from "sweetalert2";


const SignUp = () => {

  const {createuser,updateprofile} =useContext(AuthContext)
const navigate=useNavigate()
const axiosPublic=useAxiosPublic()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {

    const photoUrl="https://i.ibb.co/ncgRKSj/download-2.png"
    try {
      const res = await createuser(data.email, data.password);
      console.log(res);
  
      await updateprofile(data.name, photoUrl);
  
      const userInfo = {
        name: data.name,
        email: data.email,
        Badge: 'Bronze',
        photoUrl:photoUrl
      };
  
      const dbResponse = await axiosPublic.post('/users', userInfo);
  
      if (dbResponse.data.insertedId) {
        console.log('Data added to the database');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Regester successfully ",
          showConfirmButton: false,
          timer: 1500
        });
navigate('/')

      }
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <div>
      <Navbar></Navbar>

      <div className='max-w-6xl mx-auto'>
      
      <div className="hero min-h-screen ">
      <div className="hero-content flex-col-reverse lg:flex-row mt-16">
      <div className="text-center lg:text-left">
      <img className='w-[700px]' src={img} alt="" />
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-teal-800">
      
      
      <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
      <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-white">Your Name</span>
          </label>
          <input type="text" name="name" {...register("name",{ required: true })} placeholder="name" className="input input-bordered"  />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>
     
      
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input type="email" name='email' {...register("email",{ required: true })} placeholder="email" className="input input-bordered" required />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input type="password" name='password' {...register("password", {required: true, minLength: 4 })} placeholder="password" className="input input-bordered" required />
          {errors.password && <span className="text-red-500"> 4+ required</span>}
          <label className="label">
          <p href="#" className="label-text-alt text-black ">Already Have an account ?<span className='text-white'> <Link to='/login'>Log In</Link></span> </p>
          </label>
        </div>
          <p> </p>
        <div className="form-control mt-6">
          <button className="btn bg-blue-700 border-0 text-white">Regester now</button>
        </div>
      </form>
      <div>
         <GoogleLoginbtn></GoogleLoginbtn>
            </div>
      </div>
      </div>
      </div>
      
      
      </div>


    </div>
  );
};

export default SignUp;