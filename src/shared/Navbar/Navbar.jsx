import { Link } from "react-router-dom";
import img from '../../assets/IMG_20231124_000541.png'

import { IoMdNotifications } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import Swal from "sweetalert2";
import { RiDashboardFill } from "react-icons/ri";
import useAnnousment from "../../Hooks/useAnnousment";
import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
const {user,logOut}=useContext(AuthContext)

const [announcement]=useAnnousment()
const [isAdmin]=useAdmin()


const handlelogout=()=>{
  logOut()
.then(res=>{

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Log Out succesfully",
    showConfirmButton: false,
    timer: 1500
  });

})
}

const navlink=<>
 <li>   <Link to='/'>  Home </Link> </li>
 <li>   <Link to='/membership'>   Membership </Link> </li>
 <li>   <Link>
 <button className="flex gap-1 items-center">
  <span className="text-xl flex text-blue-600"> <IoMdNotifications></IoMdNotifications><h1 className="text-xs text-pink-700">+{announcement?.length}</h1></span>
 
</button>
 
  </Link> </li>

</>


  return (
    <div>
      
      <div className="bg-base-200 shadow-md">
 <div className="navbar max-w-6xl mx-auto">
 <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      {
        navlink
      }
      </ul>
    </div>
   <Link> <img className="w-16" src={img} alt="" /> </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-semibold ">
    {
        navlink
      }
    </ul>
  </div>


  
  <div className="navbar-end">

  {
user? <div className="justify-end">
   <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content space-y-6 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       <p className="bg-sky-700 text-white p-2 rounded-md"> {user.displayName} </p>

<li>
{
  user && isAdmin && <li>   <Link to='/deshboard/adminprofile'>  <button className="btn btn-outline py-2" style={{ display: 'flex', alignItems: 'center' }}>  
Deshboard <RiDashboardFill style={{ marginLeft: '5px' }} />
</button> </Link>  </li>
}
{
  user && !isAdmin && <li>   <Link to='/deshboard/myprofile'>  <button className=" btn btn-outline py-2" style={{ display: 'flex', alignItems: 'center' }}>  
Deshboard <RiDashboardFill style={{ marginLeft: '5px' }} />
</button> </Link>  </li>
}
</li>
  
        <li> <button onClick={handlelogout} className="btn btn-warning"> Log Out </button> </li>
      </ul>
    </div>
</div> : <div className="navbar-end">
   <Link to='/login'> <button className="btn pt-2 text-white bg-blue-500"> Join US</button> </Link>
  </div>

}

 
  </div>
 </div>
</div>


    </div>
  );
};

export default Navbar;