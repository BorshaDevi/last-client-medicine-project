
import useAuth from '../../../../Hook/useAuth';
import NavDashborad from '../../../../Components/NavDashborad/NavDashborad';
import { GiMedicines } from "react-icons/gi";
import { MdWorkHistory } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
const SellerDashBoard = () => {
    const {user}=useAuth()
    return (
        <div>
                  <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
    <a href="#">
        <img className="max-w-scree-full h-6 sm:h-7" src="https://i.ibb.co/VgGN3mf/31560524-14.jpg" alt=""/>
    </a>

    

    <div className="flex flex-col justify-between flex-1 mt-6">
        <ul>

            <NavDashborad name={'Manage Medicines'} address='/dashboard/manageMedicines' icon={GiMedicines}></NavDashborad>
            <NavDashborad name={'Payment History'} address='/dashboard/manageHistory' icon={MdWorkHistory}></NavDashborad>
            <NavDashborad name={'Ask For Advertisement'} address='/dashboard/advertisement' icon={RiAdvertisementLine }></NavDashborad>
          
            
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

export default SellerDashBoard;