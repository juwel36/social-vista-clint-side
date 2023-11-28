import { FaEdit, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaPerson } from "react-icons/fa6";
import { GiSelfLove } from "react-icons/gi";
import Swal from "sweetalert2";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner";
import { MdOutlineWorkHistory } from "react-icons/md";


const AboutMe = () => {
const axiosSecure=useAxoisSecure()
const {user}=useContext(AuthContext)



  const { isPending, data:about,refetch } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/about?email=${user.email}`)
      return res.data
    }
  })


  if (isPending) return <Spinner></Spinner>



  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    const college=e.target.college.value;
    const place=e.target.place.value;
    const Contact=e.target.Contact.value;
    const gender=e.target.gender.value;
    const work=e.target.work.value;
    const email=user.email
  
  
  
  const userData={
    college,place,Contact,gender,work,email
    
  }
  const postdata=await axiosSecure.post('/about',userData)
  console.log(postdata);
  if(postdata.data.insertedId){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "posted succesfully",
      showConfirmButton: false,
      timer: 1500
    });
  refetch()
    e.target.reset();
    }
    const updatedata=await axiosSecure.patch('/about',userData)
if(updatedata.data.mofifiedCount > 0){
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "posted succesfully",
    showConfirmButton: false,
    timer: 1500
  });
}

    console.log(updatedata);
    e.target.reset();
    refetch()
  
  
  }



  return (
    <div className="mt-10">
      <div className="text-center my-10 w-96 mx-auto ">
      <p className="text-yellow-600 text-xl">  </p>
      <p className="text-black text-3xl border-y-2 py-2 mt-2"> About Me </p>


    </div>
<div className="flex justify-end mr-4">
{/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}> <FaEdit></FaEdit>  </button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
  <form onSubmit={handleSubmit} >


  <div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3"> Add college /Univercity  </h1>
<input type="text" name="college" placeholder="" className="input input-bordered input-info w-full " />
</div>

  <div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3"> Places Lived </h1>
<input type="text" name="place" placeholder="" className="input input-bordered input-info w-full " />
</div>


  <div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3"> Contact Info </h1>
<input type="text" name="Contact" placeholder="" className="input input-bordered input-info w-full " />
</div>

 

  <div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3"> Gender </h1>
<input type="text" name="gender" placeholder="" className="input input-bordered input-info w-full " />
</div>


  <div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3"> Add work experience </h1>
<input type="text" name="work" placeholder="" className="input input-bordered input-info w-full " />
</div>

<input className="btn w-full my-8 mb-14" type="submit" value="update Info" />





  </form>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
</div>

<div className="">

{
  about?.map(item=>  (

    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-7" key={item._id}>

    <h1  className="flex gap-2 items-center border-b-2 w-56 text-2xl mt-2"> <PiStudentFill />  {item.college} </h1>

<h1 className="flex gap-2 items-center border-b-2 w-56 text-2xl mt-2"> <FaLocationArrow></FaLocationArrow>  {item.place}  </h1>
<h1 className="flex gap-2 items-center border-b-2 w-56 text-2xl mt-2"> <FaPhoneAlt /> {item.Contact} </h1>

<h1 className="flex gap-2 items-center border-b-2 w-56 text-2xl mt-2">  <FaPerson></FaPerson>{item.gender} </h1>
<h1 className="flex gap-2 items-center border-b-2 w-56 text-2xl mt-2"> <MdOutlineWorkHistory />{item.work} </h1>

    </div>



  ))
}




</div>


    </div>
  );
};

export default AboutMe;