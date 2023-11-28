import { useContext } from "react";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { FaComment,  FaUsers } from "react-icons/fa";
import { PieChart, Pie,  Cell,  Legend } from 'recharts';
import { IoCreate } from "react-icons/io5";
import Swal from "sweetalert2";

const AdminProfile = () => {

  const axiosSecure = useAxoisSecure()
  const { user } = useContext(AuthContext)



  const { isPending, data:stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async() =>{
      const res=await axiosSecure.get('/admin-stats')
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

  return (
    <div className="p-5 overflow-hidden">
      <p className="text-2xl  font-semibold py-6"> Admin Profile : </p>
<div className="flex justify-between flex-col lg:flex-row">
  
  <div >
<img className="rounded-full w-36 border-2 border-blue-700" src={user?.photoURL} alt="" />
<h1 className=" pt-3 pb-2">
 Name:  <span className="text-2xl ">  {user?.displayName}</span>
</h1>
<p> Email : {user?.email} </p>
  </div>
  {/* --------------------- */}
  <div className="stats shadow border-4">
  
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