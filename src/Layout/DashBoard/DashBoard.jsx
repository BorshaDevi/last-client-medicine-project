
import { Outlet } from 'react-router-dom';

import AdminDashBorad from '../../Pages/DashBoradPage/AdminDashBorad/AdminDashBorad';
import useRole from '../../Hook/useRole';
import SellerDashBoard from '../../Pages/DashBoradPage/AdminDashBorad/Seller/SellerDashBoard';
import UserDashBoard from '../../Pages/DashBoradPage/UserDashBoard/UserDashBoard';


const DashBoard = () => {
    const {role}=useRole()
    console.log(role)
    return (
        <div className='flex'>
            <div>
                {role.role === 'admin' && <AdminDashBorad></AdminDashBorad>  }
                {role.role === 'seller' && <SellerDashBoard></SellerDashBoard> }
                {role.role === 'user' && <UserDashBoard></UserDashBoard>  }
           {/* */}
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;