import { useQuery } from "@tanstack/react-query";
import useSecret from "../../../Hook/useSecret";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { useRef } from "react";

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
    const userDataRef = useRef(null);
  const handlePrint =() => {
    const input = userDataRef.current;

    html2canvas(input).then( ( canvas) => {
      const imgData =  canvas.toDataURL('image/png');
      const pdf = new jsPDF("portrait", "px", [800, 800]);
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('download.pdf');
    });
  };
    
    return (
        <div>
           <div ref={userDataRef}className="overflow-x-auto container border">
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
            <td className="">{sales.sellerEmail.map((email ,index)=> <p key={index} > {email}</p>)}</td>
            <td>{sales.buyerEmail}</td>
            <td>{sales.price}</td>
          </tr>)
      }
    
    </tbody>
  </table>
</div>
<div className="mx-auto">
       <button onClick={handlePrint} className="btn bg-teal-600">Print</button>
       </div>
        </div>
    );
};

export default SalesReport;










