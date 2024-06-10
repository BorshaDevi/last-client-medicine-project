import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const ManageUsers = () => {
    const axiosSecret=useSecret()
    // const [updateRole ,setUpdateRole]=useState('')
    const {data : users =[] , refetch}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const result= await axiosSecret.get('/usersForAdmin')
            console.log(users)
            return result.data
            
        }
        
    })
    const handleUpdate=async(e,Id)=>{
       const newRole=e.target.value
       const roleUpdate=await axiosSecret.patch(`/roleUpdate/${Id}`,{role :newRole})
       if(roleUpdate.data.modifiedCount > 0){
        refetch()
        Swal.fire({
          title: " successfully",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
          
        }); 
       }
    }
    // console.log(updateRole)
    return (
        <div>
          <Helmet>
            <title>Indigo Medicine || Manage User</title>
          </Helmet>
          <div className="max-w-screen-lg mx-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        users.map((user , index) =>  <tr key={user._id}>
            <th>{index +1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
            <select onChange={(e)=> handleUpdate(e,user?._id)} defaultValue={user.role}  className="select w-full max-w-xs">
                <option  value=''>Role</option>
                <option value='user'>user</option>
                <option value='seller'>seller</option>
                <option value='admin'>admin</option>
                
                </select>
            </td>
          </tr>)
     }
    
    
    </tbody>
  </table>
</div>  
        </div>
    );
};

export default ManageUsers;