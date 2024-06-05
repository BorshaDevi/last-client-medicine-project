import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";


const ManageUsers = () => {
    const axiosSecret=useSecret()
    const {data : users =[] , refetch}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const result= await axiosSecret.get('/usersForAdmin')
            console.log(users)
            return result.data
            
        }
        
    })
    const handleButton=(e)=>{
        console.log('working')
    }
    
    return (
        <div>
          <div className="overflow-x-auto">
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
            <select onClick={() => handleButton()} defaultValue={user.role} className="select w-full max-w-xs">
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