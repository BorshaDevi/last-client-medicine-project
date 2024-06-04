
import { Outlet } from 'react-router-dom';

import AdminDashBorad from '../../Pages/DashBoradPage/AdminDashBorad/AdminDashBorad';
import useRole from '../../Hook/useRole';

const DashBoard = () => {
    const [role]=useRole()
    console.log(role)
    return (
        <div>
            <div>
           <AdminDashBorad></AdminDashBorad>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;