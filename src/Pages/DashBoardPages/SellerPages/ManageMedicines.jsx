import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";
import { useForm } from "react-hook-form";


import axios from "axios";
import useAuth from "../../../Hook/useAuth";
import usePublie from "../../../Hook/usePublie";
import Swal from "sweetalert2";

const image_api=import.meta.env.VITE_iMG_API;
const image_url=`https://api.imgbb.com/1/upload?key=${image_api}`

const ManageMedicines = () => {
    const axiosSecret=useSecret()
    const axiosPublic=usePublie()
    const {user}=useAuth()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()
     
      const {data : medicinesSeller = []}=useQuery({
        queryKey:['medicinesSeller',user?.email],
        queryFn:async()=>{
            const res=await axiosSecret.get(`/medicinesSeller/${user?.email}`)
            console.log(medicinesSeller)
            console.log(res.data)
            return res.data
        }
    })

    const {data : categorySeller = []}=useQuery({
        queryKey:['categorySeller'],
        queryFn:async()=>{
            const result=await axiosSecret.get('/categorySeller')
            return result.data
        }
    })
    
    
    const onSubmit = async(data) =>{
        
        const form=new FormData()
        form.append('image',data.photo[0])
        const  image=await axios.post(image_url,form)
        const photo=image.data.data.display_url
        if(image.data.success){
            const inFo={
              sellerEmail:user?.email,
              itemName:data.itemName,
              generic:data.generic,
              description:data.description,
              price:parseFloat(data.price),
              discount:parseInt(data.discount),
              photo,
              companyName:data.companyName,
              mass:data.mass,
              category:data.category,
              quantity:parseInt(data.quantity),
            }
            console.log('from info',inFo)
            const res=await axiosSecret.post('/medicines',inFo)
            console.log(res.data)
            if(res.data.insertedId){
              
              reset()
              Swal.fire({
        title: `${data.itemName} added successfully`,
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
    }
    return (
      <div>
     {/* table */}

     <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
      medicinesSeller.map((medicine , index) =>   <tr key={medicine._id}>
        <th>
         {index +1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br/>
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Purple</td>
       
      </tr>)
     }
     
    </tbody>
    
    
  </table>
</div>



    {/* button */}
    <div>
            <button className="btn  ml-60 mt-10 bg-teal-300" onClick={()=>document.getElementById('my_modal_5').showModal()}>Add medicine</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
   <form onSubmit={handleSubmit(onSubmit)} >
    {/* 1 */}
  <div className="flex gap-3">
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl">Item name</span>
  </div>
  <input type="text"  {...register ('itemName',{required:true})} placeholder="Item Name" className="input input-bordered w-full max-w-xs" />
  {errors.itemName && <span className="text-red-500">!itemName is required</span> }
</label>
   <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl">Generic name</span>
  </div>
  <input type="text"  {...register ('generic',{required:true})} placeholder="Generic Name" className="input input-bordered w-full max-w-xs" />
  {errors.generic && <span className="text-red-500">!generic is required</span> }
</label>
  </div>
  {/* 2 */}
  <div>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl"> Short description</span>
  </div>
  <input type="text"  {...register ('description',{required:true})}  placeholder="Description" className="input input-bordered w-full max-w-xs" />
  {errors.description && <span className="text-red-500">!description is required</span> }
</label>
  </div>
  {/* 3 */}
  <div className="flex gap-3">
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl"> Price</span>
  </div>
  <input type="number" {...register ('price',{required:true})} placeholder="Per unit Price" className="input input-bordered w-full max-w-xs" />
  {errors.price && <span className="text-red-500">!price is required</span> }
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl"> Discount</span>
  </div>
  <input type="number"  {...register ('discount',{required:true})} defaultValue='0' placeholder="Discount %"  className="input input-bordered w-full max-w-xs" />
  {errors.discount && <span className="text-red-500">!discount is required</span> }
</label>
  </div>
  {/* 4 */}
  <div>
  <input type="file"  {...register ('photo',{required:true})} className=" mt-2 file-input file-input-bordered w-full max-w-xs" />
  {errors.photo && <span className="text-red-500">!photo is required</span> }
  </div>
  {/* 5 */}
  <div className="flex gap-3">
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Company Name</span>
    
  </div>
  <select {...register ('companyName',{required:true})} className="select select-bordered">
    <option value=''>Select one</option>
    <option value='pfizer'>Pfizer</option>
    <option value='bayer'>Bayer</option>
    <option value='glaxoSmithKline'>GlaxoSmithKline</option>
    <option value='roche'>Roche</option>
    <option value='eliLilly'>Eli Lilly</option>
    <option value='merck'>Merck</option>
    <option value='forestLaboratories'>Forest Laboratories</option>
  </select>
  {errors.companyName && <span className="text-red-500">!companyName is required</span> }
</label>
 <div>
 <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl"> Mass unit</span>
  </div>
  <input type="text"  {...register ('mass',{required:true})}  placeholder="0 mg or ml"  className="input input-bordered w-full max-w-xs" />
  {errors.mass && <span className="text-red-500">!mass is required</span> }
</label>
 </div>
 

  </div>
  {/* 6 */}
  <div className="flex gap-3">
  <label  className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Category</span>
   
    
  </div>
  <select {...register ('category',{required:true})} className="select select-bordered">
  <option value=''>Select one</option>
    {
        categorySeller.map(catSeller => <option key={catSeller._id} value={catSeller.categoryName}>{catSeller.categoryName}</option> )
    }
  </select>
  {errors.category && <span className="text-red-500">!category is required</span> }


  
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text-alt text-xl">Quantity</span>
  </div>
  <input type="number"  {...register ('quantity',{required:true})} placeholder="quantity" className="input input-bordered w-full max-w-xs" />
   {errors.quantity && <span className="text-red-500">!quantity is required</span> }
</label>
  </div>
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


      </div>
    );
};

export default ManageMedicines;