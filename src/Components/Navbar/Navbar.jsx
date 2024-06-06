import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hook/useAuth";



const Navbar = () => {
    const {user,logOut}=useAuth()
  const handleLogout=()=>{
        logOut()
        .then(res => {
           console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
  }
    const navLink= 
       <>
       <li><NavLink to='/' className={({ isActive,  }) =>
     isActive ? 'underline text-teal-500 font-bold' : ""
  }>Home</NavLink></li>


       <li><NavLink to='/shop' className={({ isActive,  }) =>
     isActive ? 'underline text-teal-500 font-bold' : ""
  }>Shop</NavLink></li>
       <li>
  <details>
          <summary>Language</summary>
          <ul className="p-2 z-50">
            <li><a>English</a></li>
            <li><a>Bangla</a></li>
          </ul>
        </details>
  
  </li>

       <li><NavLink to='/cart' className={({ isActive,  }) =>
     isActive ? 'underline text-teal-500 font-bold' : ""
  }><button className="btn">
  <IoCartOutline />
  <div className="badge badge-secondary">+99</div>
</button>
  </NavLink></li>
       </>
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       
        {navLink}
      </ul>
    </div>
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://i.ibb.co/VgGN3mf/31560524-14.jpg" />
        </div>
      </div>
    <a className="btn btn-ghost text-xl">Indigo <span className="text-teal-500 font-bold text-2xl">Medicine</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        {navLink}
      
    </ul>
  </div>
  <div className="navbar-end">
    {
        user ? 
        <>
         <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>User Profile</li>
        <li><NavLink to='dashboard' className={({ isActive,  }) =>
     isActive ? 'underline text-teal-500 font-bold' : ""
  }>Dashboard</NavLink></li>
        <li><button onClick={handleLogout}   className="btn">Log out</button></li>
      </ul>
    </div>
        </> 
        
        : <Link to='/login'><button className="hover:bg-teal-400 btn">Join Us</button></Link>
    }
  </div>
</div>
        </div>
    );
};

export default Navbar;