import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import useSecret from "../../../Hook/useSecret";


const PaymentHistory = () => {
    const axiosSecret=useSecret()
    const {user}=useAuth()
    const {data : userPaymentHistory =[]  }=useQuery({
        queryKey:['userPaymentHistory'],
        queryFn:async()=>{
            const  userPayment=await axiosSecret.get(`/userPaymentHistory/${user?.email}`)
            console.log(userPayment.data)
            return userPayment.data
        }
    })
    return (
        <div>
            <h1 className="text-center font-bold text-xl text-teal-600 mt-10">Your Payment History</h1>
            <div className="divider"></div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Status</th>
        <th>price</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
    {
        userPaymentHistory.map((pay , index) =>   <tr key={pay._id} className="bg-base-200">
            <th>{index +1 }</th>
            <td>{pay.status}</td>
            <td>${pay.price}</td>
            <td>${pay.date}</td>
          </tr>)
    }
     

    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;