import NavDashborad from "../../../Components/NavDashborad/NavDashborad";
import { LuUsers2 } from "react-icons/lu";
import useAuth from "../../../Hook/useAuth";
import { BiCategory } from "react-icons/bi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FcSalesPerformance } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";

const AdminDashBorad = () => {
    const {user}=useAuth()
    return (
        <div className="">
            <div className="stats shadow md:ml-64">
  
  <div className="stat">
    <div className="stat-figure text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
    </div>
    <div className="stat-title">Total Likes</div>
    <div className="stat-value text-primary">25.6K</div>
    <div className="stat-desc">21% more than last month</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <div className="stat-title">Page Views</div>
    <div className="stat-value text-secondary">2.6M</div>
    <div className="stat-desc">21% more than last month</div>
  </div>
    </div>
             <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
    <a href="#">
        <img className="max-w-scree-full h-6 sm:h-7" src="https://i.ibb.co/VgGN3mf/31560524-14.jpg" alt=""/>
    </a>
      



    

    <div className="flex flex-col justify-between flex-1 mt-6">
        
        <ul>

            <NavDashborad name={'Manage Users'} address='/dashboard/manageUsers' icon={LuUsers2}></NavDashborad>
            <NavDashborad name={'Manage Category'} address='/dashboard/manageCategory' icon={BiCategory}></NavDashborad>
            <NavDashborad name={'Payment management'} address='/dashboard/paymentManage' icon={RiSecurePaymentFill}></NavDashborad>
            <NavDashborad name={'Sales Report'} address='/dashboard/salesReport' icon={FcSalesPerformance}></NavDashborad>
            <NavDashborad name={'Manage banner Advertise'} address='/dashboard/manageBanner' icon={FcAdvertising}></NavDashborad>
            
        </ul>

        <a href="#" className="flex items-center px-4 -mx-2">
            <img className="object-cover mx-2 rounded-full h-9 w-9" src={user?.display_URL} alt="avatar" />
            <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">{user?.displayName}</span>
        </a>
    </div>
</aside>


        </div>
    );
};

export default AdminDashBorad;