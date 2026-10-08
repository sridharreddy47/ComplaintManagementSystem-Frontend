import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-title">
        Complaint Management System
      </div>

      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        {token ? (
          <>
            <Link to="/complaints">
              Submit Complaint
            </Link>

            <Link to="/my-complaints">
              My Complaints
            </Link>

            {role === "ADMIN" && (
              <Link to="/admin">
                Admin Dashboard
              </Link>
            )}

            <span className="welcome">
              Hi, {name}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
