import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { FaComment,  FaUsers } from "react-icons/fa";
import { PieChart, Pie,  Cell,  Legend } from 'recharts';
import { IoCreate } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxoisPublic from "../../Hooks/useAxiosPublic";
const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`



const AdminProfile = () => {

  const axiosSecure = useAxoisSecure()
  const axiosPublic = useAxoisPublic()
  const { user } = useContext(AuthContext)
  const [afterloading,setAfterloading]=useState(false)
  const [selectedFile, setSelectedFile] = useState(null);


  const { isPending, data:stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async() =>{
      const res=await axiosSecure.get('/admin-stats')
return res.data
    }
  })

  const { data: users,refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`)
      return res.data
    }

  })


  if (isPending) return <Spinner></Spinner>

  const pieChartData = [
    { name: 'Users', value: stats?.users || 0 },
    { name: 'Posts', value: stats?.posts || 0 },
    { name: 'Comments', value: stats?.comments || 0 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
const handleaddtag =async(e) =>{
e.preventDefault()
const tags=e.target.tags.value;
const userData={
 tags
}
const postdata=await axiosSecure.post('/tags',userData)
console.log(postdata);
if(postdata.data.insertedId){
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Tags Added succesfully",
    showConfirmButton: false,
    timer: 1500
  });
  e.target.reset();

  }

}

const handleFileChange = (e) => {
  const file = e.target.files[0];
  setSelectedFile(file);
};

const handlepatchimage = async (e, userId) => {
  e.preventDefault();
  setAfterloading(true);

  const imageFile = { image: e.target.elements.image.files[0] };
  const res = await axiosPublic.post(image_hosting_api, imageFile, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  
  console.log(res);

  const menuItem = {
    photoUrl: res.data.data.display_url,
  };
  const Menures = await axiosSecure.patch(`/users/${userId}`, menuItem);
  e.target.reset();
  
  refetch()
  setAfterloading(false); 
};


  return (
    <div className="p-3 overflow-hidden">
      <p className="text-2xl  font-semibold py-6"> Admin Profile : </p>
<div className="flex justify-between  flex-col lg:flex-row">
  
{
users.map((userData)=>(



  <div key={userData._id}>
<img className="rounded-full w-20 border-2 border-blue-700" src={userData?.
photoUrl
} alt="" />
<div>
          <form onSubmit={(e) => handlepatchimage(e, userData._id)}>
<label className="label">
    <span className="label-text">Edit Image*</span>
 
  </label>
  <div className="flex">

  <input className=" w-56" type="file" name="image" onChange={handleFileChange}/> 
<input  className="btn text-xs border-2 rounded-lg px-2 border-blue-400 " type="submit" value="Edit Photo" disabled={!selectedFile} />

  </div>

            </form>

</div>

<h1 className=" pt-3 pb-2">
 Name:  <span className="text-2xl ">  {userData?.name}</span>
</h1>
<p> Email : {userData?.email} </p>
  </div>


))


}





  {/* --------------------- */}
  <div className="stats shadow border-4 lg:h-40">
  
  <div className="stat">
    <div className="stat-figure text-secondary">
   <span className="inline-block text-3xl"> <BsFillPostcardHeartFill /> </span>
    </div>
    <div className="stat-title"> Posts </div>
    <div className="stat-value"> {stats?.posts} </div>
    <div className="stat-desc">Jan 1st - Nov 1st</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
   <span className="inline-block text-3xl"> <FaUsers></FaUsers> </span>
    </div>
    <div className="stat-title">Users</div>
    <div className="stat-value">{stats?.users} </div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-secondary">
    <span className="inline-block text-3xl"> <FaComment></FaComment> </span>
    </div>
    <div className="stat-title"> Comments </div>
    <div className="stat-value">{stats?.comments} </div>
    <div className="stat-desc">Jan 1st - Nov 1st</div>
  </div>
  

  
</div>
  
  </div>      
 

  <div className=" flex justify-between items-center flex-col md:flex-row lg:flex-row-reverse overflow-hidden">

<div>

<PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>

</div>

<div>

<form onSubmit={handleaddtag}>

<h1 className="flex items-center gap-2 text-2xl"> <IoCreate></IoCreate> Create Tag </h1>

<input type="text" placeholder="Type here" name="tags" className="input input-bordered input-info w-full max-w-xs mt-3" />
<input type="submit" className="btn bg-blue-600 mt-2 text-white" value="Create" />

</form>



</div>


</div>










    </div>
  );
};

export default AdminProfile;