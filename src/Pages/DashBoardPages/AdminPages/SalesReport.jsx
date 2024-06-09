import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";


const SalesReport = () => {
    const axiosSecret=useSecret()
    const {data : salesReport =[]  }=useQuery({
        queryKey:['salesReport'],
        queryFn:async()=>{
            const  saleReport=await axiosSecret.get(`/salesReport?status=paid`)
            console.log(saleReport.data)
            return saleReport.data
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
        <th>Name</th>
        <th>Seller Email</th>
        <th>Buyer Email</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        salesReport.map((sales , index) =><tr key={sales._id}>
            <th>{index +1}</th>
            <td className="flex">
                {
                    sales.medicineNames.map(name => name)
                }
            </td>
            <td className="">{sales.sellerEmail.map(email=> email)}</td>
            <td>{sales.buyerEmail}</td>
            <td>{sales.price}</td>
          </tr>)
      }
    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default SalesReport;










