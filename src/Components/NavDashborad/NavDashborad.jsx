import { NavLink } from "react-router-dom";


const NavDashborad = ({name, address ,icon:Icon}) => {
    return (
        <div className="mb-5">
          
             <li><NavLink to={address} className={({ isActive,  }) =>
     isActive ? 'underline bg-teal-500 font-bold text-teal-500' : ""
  }>
  <div className="flex">
  <Icon className="mt-1 mr-3" />
  <span className="font-bold text-xl" >{name}</span>
  </div>
  </NavLink></li>
        </div>
    );
};

export default NavDashborad;