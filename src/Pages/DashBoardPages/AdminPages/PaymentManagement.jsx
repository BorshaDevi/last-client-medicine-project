import { useQuery } from "@tanstack/react-query";

import useSecret from "../../../Hook/useSecret";
import Swal from "sweetalert2";


const PaymentManagement = () => {
    
    const axiosSecret=useSecret()
    const {data : adminPaymentHistory =[] , refetch }=useQuery({
        queryKey:['adminPaymentHistory'],
        queryFn:async()=>{
            const  adminPayment=await axiosSecret.get('/adminPaymentHistory')
            console.log(adminPayment.data)
            return adminPayment.data
        }
    })
    const handleStatus=async(id)=>{
        const statusUpdate=await axiosSecret.patch(`/statusUpdate/${id}`)
        if(statusUpdate.data.modifiedCount >0){
            refetch()
            Swal.fire({
                title: "Paid successfully",
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
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Buyer Email</th>
        <th>Total Price</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
          adminPaymentHistory.map((pay , index)=> <tr key={pay._id} className="bg-base-200">
            <th>{index + 1}</th>
            <td>{pay.buyerEmail}</td>
            <td>${pay.price}</td>
            {
                pay.status === 'paid' ? <td className="text-teal-400 ">{pay.status}</td> :<td className="text-red-400 ">{pay.status}</td>
            }
            {
                pay.status === 'paid' ? <td><button  disabled className="btn bg-teal-500">Accept payment</button></td>        :<td><button onClick={() => handleStatus(pay._id)} className="btn bg-teal-500">Accept payment</button></td>
            }
          </tr>)
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentManagement;