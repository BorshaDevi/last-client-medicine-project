import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";
import { MdSystemUpdateAlt } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ManageCategory = () => {
    const axiosSecret=useSecret()
    const {data : categoryAdmin = [],refetch}=useQuery({
        queryKey:['categoryAdmin'],
        queryFn:async()=>{
            const result=await axiosSecret.get('/categoryAdmin')
            console.log(categoryAdmin)
            console.log(result.data)
            return result.data
        }
    })
    const handleAddCategory=async (e)=>{
        e.preventDefault()
        const form=e.target;
        const categoryName=form.categoryName.value;
        const photo=form.photo.value;
        const number=form.number.value;
        const addItem={
            categoryName,
            photo,
           number,
        }
        console.log(addItem)
        const added=await axiosSecret.post('/addCategory',addItem)
        if(added.data.insertedId){
            refetch()
            form.reset()
            Swal.fire({
                title: "Added successfully",
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
   const handleDelete=id=>{
    console.log(id)
   }
    return (
        <div>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          
        </th>
        <th>Image</th>
        <th>Category name</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        categoryAdmin.map(category =>  <tr key={category._id}>
            <th>
             
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={category.photo} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                
              </div>
            </td>
            <td>
              {category.categoryName}
             
            </td>
            <td><Link to={`/dashboard/categoryUpdate/${category._id}`}><MdSystemUpdateAlt className=" text-xl" /></Link>
            </td>
            <th>
            
            <FcDeleteDatabase onClick={() => handleDelete(categoryAdmin._id)} className=" text-xl" />
            </th>
          </tr>)
     }
     
    </tbody>
   
       
  </table>
</div> 
   {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn  ml-60 mt-10 bg-teal-300" onClick={()=>document.getElementById('my_modal_5').showModal()}>Add category</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
   <form onSubmit={handleAddCategory} >
   <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl">Category name</span>
  </div>
  <input type="text" name='categoryName' placeholder="Category Name" className="input input-bordered w-full max-w-xs" />
</label>
   <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl">Category Url</span>
  </div>
  <input type="text" name='photo' placeholder="Category Url" className="input input-bordered w-full max-w-xs" />
</label>
   <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl">Number</span>
  </div>
  <input type="number" name='number' placeholder="Category Url" className="input input-bordered w-full max-w-xs" />
</label>
<input type="submit" className="btn bg-teal-700" value='Submit' />
   </form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
    );
};

export default ManageCategory;