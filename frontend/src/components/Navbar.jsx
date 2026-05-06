import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-black text-white p-4 flex justify-between">

      <div className="flex gap-6">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/leads">Leads</Link>
      </div>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
};

export default Navbar;