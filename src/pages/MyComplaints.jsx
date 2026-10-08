import { useEffect, useState } from "react";
import axios from "axios";

function MyComplaints() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {

    const getMyComplaints = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8080/complaints/my",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("My complaints:", response.data);

        setComplaints(response.data);

      } catch (error) {

        console.log("Error:", error);
        alert("Failed to load complaints");

      }

    };

    getMyComplaints();

  }, []);

  const getStatusClass = (status) => {

    if (status === "Pending") {
      return "status-pending";
    }

    if (status === "Assigned") {
      return "status-assigned";
    }

    if (status === "In Progress") {
      return "status-progress";
    }

    if (status === "Resolved") {
      return "status-resolved";
    }

    if (status === "Rejected") {
      return "status-rejected";
    }

    return "";
  };

  return (
    <div className="container">

      <h1>My Complaints</h1>

      {complaints.length === 0 ? (

        <p>No complaints found.</p>

      ) : (

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>

            {complaints.map((complaint) => (

              <tr key={complaint.id}>

                <td>{complaint.id}</td>

                <td>{complaint.title}</td>

                <td>{complaint.category}</td>

                <td>{complaint.priority}</td>

                <td>
                  <span
                    className={`status-badge ${getStatusClass(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </td>

                <td>{complaint.location}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default MyComplaints;

