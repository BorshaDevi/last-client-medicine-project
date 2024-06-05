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
        <div>
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