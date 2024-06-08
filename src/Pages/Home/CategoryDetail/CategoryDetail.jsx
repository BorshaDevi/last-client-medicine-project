import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSecret from '../../../Hook/useSecret';
import Swal from 'sweetalert2';
import useAuth from '../../../Hook/useAuth';
import { GrCheckboxSelected } from 'react-icons/gr';
import { IoMdEye } from 'react-icons/io';

const CategoryDetail = () => {
    const {user}=useAuth()
    const axiosSecret=useSecret()
    const {category}=useParams()
    const [modal ,setModal]=useState({})
    const [loaded,setLoaded]=useState(true)
  
    
   
    const {data : detailCategory = [],refetch}=useQuery({
        queryKey:['detailCategory'],
        queryFn:async()=>{
            const res=await axiosSecret.get(`/detailCategory/${category}`)
            
            return res.data
        }
    })

    const handleModal=async(id)=>{
      const result=await axiosSecret.get(`/medicineDetail/${id}`)
      // refetch()
      setModal(result.data)
      setLoaded(false)
    
    }

    const handleClose=()=>{
       setModal()
    }
    const handleShop=async(medicine)=>{
        
          const cart={
            sellerEmail:medicine.sellerEmail,
            price:medicine.price,
            companyName:medicine.companyName,
            quantity:medicine.quantity,
            menuId:medicine._id,
            medicineName:medicine.itemName,
            discount:medicine.discount,
            buyerEmail:user?.email
          }
            const addCart=await axiosSecret.post('/addCart',cart)
            
            if(addCart.data.insertedId){
              // setSelect(true)
             refetch()
              Swal.fire({
                title: `${medicine.itemName}  added successfully`,
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
        <div>
            <h1>{detailCategory.length}</h1>
            <h1 className='text-center uppercase'>Medicine Page</h1>
            <div>
            
            <div className="overflow-x-auto ">
         <table className="table">
           {/* head */}
           <thead>
             <tr>
               <th>
                
               </th>
               <th>Name and Generic</th>
               <th >Company Name</th>
               <th>Price</th>
               <th>Category</th>
               <th>Discount</th>
               <th>Quantity</th>
               <th>Mass unit</th>
               <th></th>
               <th></th>
             </tr>
           </thead>
           <tbody>
             {/* row 1 */}
            {
             detailCategory.map((medicine , index) =>   <tr key={medicine._id}>
               <th>
                {index +1}
               </th>
               <td>
                 <div className="flex items-center gap-3">
                   <div className="avatar">
                     <div className="mask mask-squircle w-12 h-12">
                       <img src={medicine.photo} alt="Avatar Tailwind CSS Component" />
                     </div>
                   </div>
                   <div>
                     <div className="font-bold">{medicine.itemName}</div>
                     <div className="text-sm opacity-50">{medicine.generic}</div>
                   </div>
                 </div>
               </td>
               <td className="uppercase">
                 {medicine.companyName}
                 
               </td>
               <td>
                 {medicine.price}
                 
               </td>
               <td className="uppercase">{medicine.category}</td>
               <td>{medicine.discount}</td>
               <td>{medicine.quantity}</td>
               <td>{medicine.mass}</td>
               <td onClick={() => handleShop(medicine)} className="text-xl btn"><GrCheckboxSelected /> </td>
                 {/* {
                   select? <GrCheckboxSelected className="disabled text-red-500" /> :  <td onClick={() => handleShop(medicine)} className="text-xl btn"><GrCheckboxSelected /> </td>
                 } */}    
              {/* The button to open modal */}
<label htmlFor="my_modal_6" className="text-xl btn ml-2"><IoMdEye onClick={() => handleModal(medicine._id)}></IoMdEye></label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
  <div className="hero min-h-screen bg-base-200">

    {
      loaded? <span className="loading loading-ring loading-lg"></span>   :
      <div className="hero-content flex-col lg:flex-row">
   
      <img src={modal.photo} className="w-20 rounded-lg shadow-2xl" />
    
     <div>
       <h1 className="text-5xl font-bold">{modal.itemName}</h1>
       <p className="py-6">{modal.description}</p>
       
     </div>
   </div>
    }
 
</div>
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>















             </tr>)
            }
            
           </tbody>
           
           
         </table>
       </div>
               </div>
            
        </div>
    );
};

export default CategoryDetail;