import React,{useContext} from 'react'
import { UserContext } from "../../context/UserContex"
import Navbar  from './Navbar';

// const DashboardLayout = () => {
//     const {user} = useContext(UserContext);
//   return (
//     <div>
//       <Navbar activeMenu={activeMenu} />
        
//       {/* {user && <div className='container mt-auito pt-4 pb-4'> {children} </div>} */}
//     </div> 
//   )
// }

// export default DashboardLayout


const DashboardLayout = ({ activeMenu, children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user ? (
        <div className='container mt-auto pt-4 pb-4'>{children}</div>
      ) : (
        <div>User not authenticated. Please log in.</div>
      )}
    </div>
  );
};

export default DashboardLayout
