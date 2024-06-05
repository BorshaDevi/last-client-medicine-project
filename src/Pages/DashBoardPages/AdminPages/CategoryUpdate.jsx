import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const CategoryUpdate = () => {
    const {id}=useParams()
    const axiosSecret=useSecret()
    const {data : categoryUpdate = [],refetch}=useQuery({
        queryKey:['categoryAdmin'],
        queryFn:async()=>{
            const result=await axiosSecret.get(`/categoryUpdate/${id}`)
            console.log(categoryUpdate)
            console.log(result.data)
            return result.data
        }
    })
      const handleCategoryUpdate=async(e)=>{
        e.preventDefault()
        const form=e.target;
        const categoryName=form.categoryName.value;
        const photo=form.photo.value;
        const addItem={
            categoryName,
            photo,
            
        }
        console.log(addItem)
        const added=await axiosSecret.put(`/updateCategory/${id}`,addItem)
        console.log(added.data)
        if(added.data.modifiedCount>0){
            refetch()
            Swal.fire({
                title: "Update successfully",
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
    return (
        <div className="max-w-6xl mx-auto">
            <form onSubmit={handleCategoryUpdate} >
   <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl">Category Name</span>
  </div>
  <input type="text" name='categoryName' defaultValue={categoryUpdate.categoryName} placeholder="Category Name" className="input input-bordered w-full max-w-xs" />
</label>
   <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl">Category Image</span>
  </div>
  <input type="text" name='photo' defaultValue={categoryUpdate.photo} placeholder="Category Url" className="input input-bordered w-full max-w-xs" />
</label>
<input type="submit" className="btn bg-teal-700" value='Submit' />
   </form>
        </div>
    );
};

export default CategoryUpdate;