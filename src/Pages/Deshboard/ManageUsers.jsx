import Swal from "sweetalert2";
import Spinner from "../../Components/Spinner";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import useUsers from "../../Hooks/useUsers";


const ManageUsers = () => {

  const [users, isPending, refetch] = useUsers()
  const axiosSecure = useAxoisSecure()

  if (isPending) return <Spinner></Spinner>

  const handleMakeAdimn = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an admin now`,
            showConfirmButton: false,
            timer: 1500
          });
        }

      })

  }


  return (
    <div>
      <div className="text-center my-10 w-96 mx-auto">
        <p className="text-blue-600 text-xl">---How many??--- </p>
        <p className="text-black text-3xl border-y-2 py-2 mt-2">  MANAGE ALL USERS </p>
      </div>


      <div>
        <div className="overflow-x-auto">
          <table className="table">
           
            <thead>
              <tr>
                <th></th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Action</th>
                <th>Subscription Status</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item, index) => <tr key={item._id}>
                <th>{index + 1} </th>
                <td> {item.name} </td>
                <td> {item.email} </td>
                <td>

                  {
                    item.role === 'admin' ? <button className="btn btn-outline">  admin </button>
                      :
                      <button onClick={() => handleMakeAdimn(item)} className=" btn bg-blue-600 text-white"> Make admin </button>


                  }


                </td>
                <td>  {item.Badge} </td>
              </tr>)}


            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ManageUsers;