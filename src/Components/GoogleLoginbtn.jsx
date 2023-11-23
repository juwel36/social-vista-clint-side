import {FaGoogle } from "react-icons/fa";


const GoogleLoginbtn = () => {


  return (
    <div>
       <div>
         <button  
  className="mb-3 flex select-none bg-sky-900 mx-auto items-center gap-3 rounded-lg border-b-2 border-blue-gray-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-blue-gray-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  type="button"
  data-ripple-dark="true"
>
<FaGoogle></FaGoogle>
  Continue with Google
</button>
    </div>
    </div>
  );
};

export default GoogleLoginbtn;