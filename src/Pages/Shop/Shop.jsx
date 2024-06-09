import { useQuery } from "@tanstack/react-query";
import usePublie from "../../Hook/usePublie";
import useSecret from "../../Hook/useSecret";
import { GrCheckboxSelected } from "react-icons/gr";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";
import useAuth from "../../Hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const Shop = () => {
    const {user}=useAuth()
    const navigate=useNavigate()
    const axiosSecret=useSecret()
    const [modal ,setModal]=useState({})
    const [loaded,setLoaded]=useState(true)
    // const [select,setSelect]=useState(false)
    const axiosPublic=usePublie()
    const {data : shopMedicines = [],refetch}=useQuery({
        queryKey:['shopMedicines'],
        queryFn:async()=>{
            const result=await axiosPublic.get('/shopMedicines')
            return result.data
        }
    })
    const handleModal=async(id)=>{
      console.log(id)
      const result=await axiosSecret.get(`/medicineDetail/${id}`)
      // refetch()
      setModal(result.data)
      setLoaded(false)
      console.log(modal)
    }
    const handleShop=async(medicine)=>{
        if(user){
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
            console.log(addCart.data)
            if(addCart.data.insertedId){
              // setSelect(true)
             
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
              refetch()
            }
        }
        else{
          navigate('/login')
        }
    }
  
    return (
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
      shopMedicines.map((medicine , index) =>   <tr key={medicine._id}>
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
       <button className="btn btn-primary">Get Started</button>
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
    );
};

export default Shop;