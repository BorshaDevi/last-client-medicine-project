import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useSecret from "../../Hook/useSecret";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { useRef } from "react";

const InvoicePage = () => {
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
    const totalAmount=userPaymentHistory.reduce((total,item)=>total + item.price,0)
    return (
        <>
        <div ref={userDataRef} className="mt-10 mb-10  container border">
            
           <div className="flex ">
           <div className="w-10 flex rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://i.ibb.co/VgGN3mf/31560524-14.jpg" />
          
        </div>
        <h1 className="ml-5 mt-3 text-xl">Indigo <span className="uppercase text-teal-600 font-bold">Medicine</span></h1>
           </div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Medicine Name</th>

        <th>Prices</th>

      </tr>
      
    </thead>
    <tbody>
      {/* row 1 */}
     
            {
               userPaymentHistory.map((invoice , index) =>  <tr key={invoice._id}>
                <th>{index +1}</th>
                <td>{invoice.date}</td>
                <td>
                    {
                        invoice.medicineNames.map((name ,index) =><p key={index}>{name}</p>)
                    }
                </td>
                <td>{invoice.price}</td>
              </tr>
               ) 
            }
           <tr>
           <td className="flex justify-end">Total Price:</td>
           <td>{totalAmount}</td>
           </tr>
        
    </tbody>
  </table>
</div>

        </div>
       <div className="mx-auto">
       <button onClick={handlePrint} className="btn bg-teal-600">Print</button>
       </div>
        </>
    );
};

export default InvoicePage;