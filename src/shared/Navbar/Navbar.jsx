import { Link } from "react-router-dom";
import img from '../../assets/IMG_20231124_000541.png'

import { IoMdNotifications } from "react-icons/io";

const Navbar = () => {

const navlink=<>
 <li>   <Link to='/'>  Home </Link> </li>
 <li>   <Link>   Membership </Link> </li>
 <li>   <Link> <p className="text-xl"> <IoMdNotifications></IoMdNotifications> </p>  </Link> </li>

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
   <Link to='/login'> <button className="btn text-white bg-blue-500"> Join US</button> </Link>
  </div>
 </div>
</div>


    </div>
  );
};

export default Navbar;