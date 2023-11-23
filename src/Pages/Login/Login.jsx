import { Link } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import img from '../../assets/login.jpg'
import GoogleLoginbtn from "../../Components/GoogleLoginbtn";

const Login = () => {

  const handlelogin=e=>{
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
  
  //   Loginguser(email,password)
  // .then(res=>{
  // alert('log in succesfully')
  // navigate(from, { replace: true });
  // })
  // .catch(err=>{
  //   console.log(err);
  // })
  
  
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


    <form onSubmit={handlelogin} className="card-body ">
   

      <div className="form-control">
         <label className="label">
          <span className="label-text text-white">Email</span>
        </label>
        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
          <span className="label-text text-white">Password</span>
         </label>
         <input type="password" name="password" placeholder="password" className="input input-bordered" required />
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