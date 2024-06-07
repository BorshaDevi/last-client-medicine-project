
import { IoMdEye } from 'react-icons/io';
import useSecret from '../../Hook/useSecret';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';


const EyeDetail = () => {
    const {id}=useParams()
    const axiosSecret=useSecret()
    console.log(id)
    const {data : eyeDetail}=useQuery({
        queryKey:['eyeDetail'],
        queryFn:async()=>{
            
      const result=await axiosSecret.get(`/medicineDetail/${id}`)
      console.log(eyeDetail)
      return(result.data)
        }
    })
    
    
   
    
    return (
        <div>
            <label htmlFor="my_modal_6" className="btn ml-3 mt-4"><IoMdEye/></label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
  <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold"></h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>
        </div>
    );
};

export default EyeDetail;