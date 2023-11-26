import Swal from "sweetalert2";
import useAxoisSecure from "../../Hooks/useAxiosSecure";


const MakeAnnouncement = () => {

  const axoisSecure=useAxoisSecure()


const handleSubmit=async(e)=>{
  e.preventDefault();




  
  const image=e.target.image.value;
  const name=e.target.name.value;
  const title=e.target.title.value;
  const description=e.target.description.value;
  



const userData={
  image,name,title,description
}
const postdata=await axoisSecure.post('/announcement',userData)
console.log(postdata);
if(postdata.data.insertedId){
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Announcement posted succesfully",
    showConfirmButton: false,
    timer: 1500
  });

  e.target.reset();
  }



}


  return (
    <div className="p-5">
      <p className="text-2xl font-bold "> Make announcement: </p>

<div>

<form onSubmit={handleSubmit} >
<div className="flex   gap-7 mt-7">

<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">Author Image </h1>
<input type="text" name="image" placeholder="Author Image" className="input input-bordered input-info w-full " />
</div>

<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">Author Name</h1>
<input type="text" name="name" placeholder="Author Name" className="input input-bordered input-info w-full " />
</div>

</div>

{/* ---- */}
<div className="flex  gap-7">

<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">
Title </h1>
<input type="text" name="title" placeholder="title"  className="input input-bordered input-info w-full " />
</div>
<div className="w-full">
<h1 className="text-xl font-bold text-black pt-4 pb-3">
Description </h1>
 <textarea name="description" id="" placeholder="description" className="input input-bordered input-info w-full " ></textarea>

</div>

</div>


<input type="submit" className="btn bg-blue-600 text-white" value="Submit" />



</form>





</div>



    </div>
  );
};

export default MakeAnnouncement;