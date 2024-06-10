import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";
import { FcDeleteDatabase } from "react-icons/fc";
import useAuth from "../../../Hook/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Cart = () => {
    const axiosSecret=useSecret()
    const [sort,setSort]=useState('')
    const {user}=useAuth()
    const{data : cart =[],refetch}=useQuery({
        queryKey:['cart'],
        queryFn:async()=>{
            const cartData=await axiosSecret.get(`/cart/${user?.email}?sort=${sort}`)
            console.log(cartData.data)
            return cartData.data
            
        }
        
    })
    useEffect(() => {
      refetch()
    },[sort])
    const handleSort=e=>{
      
        setSort(e.target.value)
        console.log(e.target.value)
        // refetch()
        }
        const handleCartDelete=async(car)=>{

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async(result) => {
                if (result.isConfirmed) {
          
                    const deleteCart=await axiosSecret.delete(`/deleteCart/${car._id}`)
                   
              if(deleteCart.data.deletedCount >0){
                refetch()
                Swal.fire({
                  title: "Deleted!",
                  text: `${car.medicineName} successfully deleted`,
                  icon: "success"
                });
              }
                  
                }
              });














              

        }
    const totalPrice=cart.reduce((total,item)=> total + item.price,0)
    
    return (
        <div>
          <Helmet>
            <title>Indigo Medicine || cart</title>
          </Helmet>
            <div className=" mx-auto">
            <h1 className="text-center text-2xl font-bold text-teal-400">Your Orders</h1>
            <select onChange={handleSort} value={sort} name='sort' id='sort' className="select select-bordered w-full max-w-xs">
                <option value='sort'>Sort</option>
                <option value='asc'>Asc</option>
                <option value='desc'>Desc</option>
                
                </select>
            </div>
            <div className="flex justify-between text-xl  font-semibold">
                <h1>Total cart : {cart.length}</h1>
                <h1>Total Price :${totalPrice}</h1>
                {
                    cart.length ? <Link to='/checkout'><button className="bg-teal-700 p-3 btn">Pay</button></Link> : <button disabled className="bg-teal-700 p-3 btn">Pay</button>
                }
            </div>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Company</th>
        <th>Per unit price</th>
        <th>Quantity</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map((car , index) => <tr key={car._id}>
            <th>{index +1}</th>
            <td>{car.medicineName}</td>
            <td className="uppercase">{car.companyName}</td>
            <td>${car.price}</td>
            <td>{car.quantity}</td>
            <td><FcDeleteDatabase onClick={() => handleCartDelete(car)} className="text-xl"></FcDeleteDatabase></td>
          </tr>)
      }
    </tbody>
  </table>
</div>

        </div>
    );
};

export default Cart;