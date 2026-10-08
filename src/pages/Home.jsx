import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  return (
    <div className="home">

      <div className="home-content">

        <h1>Complaint Management System</h1>

        <p className="home-subtitle">
          Submit, track and manage complaints easily.
        </p>

        {token ? (
          <>
            <h3>Welcome, {name}</h3>

            <div className="home-buttons">

              <Link to="/complaints">
                <button>
                  Submit Complaint
                </button>
              </Link>

              <Link to="/my-complaints">
                <button>
                  My Complaints
                </button>
              </Link>

              {role === "ADMIN" && (
                <Link to="/admin">
                  <button>
                    Admin Dashboard
                  </button>
                </Link>
              )}

            </div>
          </>
        ) : (
          <div className="home-buttons">

            <Link to="/login">
              <button>
                Login
              </button>
            </Link>

            <Link to="/register">
              <button>
                Register
              </button>
            </Link>

          </div>
        )}

      </div>

      <div className="features">

        <div className="feature-card">
          <h2>Submit Complaints</h2>
          <p>
            Easily submit complaints with details such as
            category, priority and location.
          </p>
        </div>

        <div className="feature-card">
          <h2>Track Complaints</h2>
          <p>
            Users can view their complaints and monitor
            the current status.
          </p>
        </div>

        <div className="feature-card">
          <h2>Admin Management</h2>
          <p>
            Administrators can view, update and manage
            complaints efficiently.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Home;

