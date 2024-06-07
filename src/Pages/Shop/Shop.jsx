import { useQuery } from "@tanstack/react-query";
import usePublie from "../../Hook/usePublie";
import useSecret from "../../Hook/useSecret";
import { GrCheckboxSelected } from "react-icons/gr";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";
import useAuth from "../../Hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EyeDetail from "../../Components/EyeDetail/EyeDetail";


const Shop = () => {
    const {user}=useAuth()
    const navigate=useNavigate()
    const axiosSecret=useSecret()
    // const [select,setSelect]=useState(false)
    const axiosPublic=usePublie()
    const {data : shopMedicines = [],refetch}=useQuery({
        queryKey:['shopMedicines'],
        queryFn:async()=>{
            const result=await axiosPublic.get('/shopMedicines')
            console.log(shopMedicines)
            return result.data
        }
    })
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
        else{
          navigate('/login')
        }
    }
    // const handleEye=async(id)=>{
    //   const detail
    // }
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
        
        {/* <Link to={``}><td className="text-xl"><IoMdEye /></td></Link> */}
        {/* The button to open modal */}
       {/* <Link to={medicine._id} ></Link>
       <th><EyeDetail ></EyeDetail></th> */}
      </tr>)
     }
     
    </tbody>
    
    
  </table>
</div>
        </div>
    );
};

export default Shop;