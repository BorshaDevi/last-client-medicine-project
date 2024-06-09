import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";
import useAuth from "../../../Hook/useAuth";


const SellerPaymentHistory = () => {
    const axiosSecret=useSecret()
    const {user}=useAuth()
    const {data : sellerPaymentHistory =[]  }=useQuery({
        queryKey:['sellerPaymentHistory'],
        queryFn:async()=>{
            const  sellerPayment=await axiosSecret.get(`/sellerPaymentHistory/${user?.email}`)
            console.log(sellerPayment.data)
            return sellerPayment.data
        }
    })
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Buyer Email</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        sellerPaymentHistory.map(pay => <tr key={pay._id} className="bg-base-200">
            <th>1</th>
            <td>{pay.buyerEmail}</td>
            <td>${pay.price}</td>
            <td>{pay.status}</td>
          </tr>)
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default SellerPaymentHistory;