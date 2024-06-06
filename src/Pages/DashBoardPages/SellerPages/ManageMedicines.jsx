import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";
import { useForm } from "react-hook-form";


import axios from "axios";
import useAuth from "../../../Hook/useAuth";
import usePublie from "../../../Hook/usePublie";

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
   
    const {data : categorySeller = []}=useQuery({
        queryKey:['categorySeller'],
        queryFn:async()=>{
            const result=await axiosSecret.get('/categorySeller')
            console.log(categorySeller)
            console.log(result.data)
            return result.data
        }
    })
    const onSubmit = async(data) =>{
        
        const form=new FormData()
        form.append('image',data.photo[0])
        const  image=await axiosPublic.post(image_url,form)
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
        }
    }
    return (
      <div>
     {/* table */}





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
  <label  className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Mass Unit</span>
    
  </div>
  <select {...register ('mass',{required:true})} className="select select-bordered">
    <option value=''>Select one</option>
    <option value='mg'>mg</option>
    <option value='ml'>ml</option>
   
  </select>
  {errors.mass && <span className="text-red-500">!mass is required</span> }
</label>
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