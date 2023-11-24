import { FaAddressBook, FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdAddToPhotos } from "react-icons/md";

const Deshboard = () => {



  
  return (
    <div className="bg-slate-200 h-[100vh]">

    <div className="max-w-6xl mx-auto  flex gap-4" >
      
<div className="   bg-white shadow-md shadow-white  w-1/4">

  <ul className="space-y-3 lg:pt-24 p-2">


<li> <button className="btn w-full border-2  bg-blue-500 text-white border-cyan-700"> <NavLink to='/'> <span className="flex items-center gap-5">
<FaHome></FaHome> Home 
  </span> </NavLink> </button> </li>
<li> <button className="btn w-full border-2 bg-blue-500 text-white border-cyan-700"> <NavLink to='/deshboard/myprofile'> <span className="flex items-center gap-5">
<CgProfile /> My Profile
  </span>  </NavLink> </button> </li>
<li> <button className="btn w-full border-2 bg-blue-500 text-white border-cyan-700"><NavLink to='/deshboard/addpost'> <span className="flex items-center gap-5">
<MdAddToPhotos></MdAddToPhotos> Add post
  </span> </NavLink>  </button> </li>
<li> <button className="btn w-full border-2 bg-blue-500 text-white border-cyan-700"> <NavLink to='/deshboard/myposts'> <span className="flex items-center gap-5">
<FaAddressBook></FaAddressBook> My Posts 
  </span> </NavLink>  </button> </li>


  </ul>


</div>

<div className="bg-white shadow-md shadow-white  w-3/4">


<Outlet></Outlet>
</div>


    </div>
    </div>
  );
};

export default Deshboard;