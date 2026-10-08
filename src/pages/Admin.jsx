import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const getComplaints = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://complaint-backend-oc9n.onrender.com/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComplaints(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to load complaints");

    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      const complaint = complaints.find(
        item => item.id === id
      );

      await axios.put(
        `https://complaint-backend-oc9n.onrender.com/complaints/${id}`,
        {
          ...complaint,
          status: status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      getComplaints();

    } catch (error) {

      console.log(error);
      alert("Failed to update status");

    }
  };

  const deleteComplaint = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://complaint-backend-oc9n.onrender.com/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      getComplaints();

    } catch (error) {

      console.log(error);
      alert("Failed to delete complaint");

    }
  };

  // Statistics

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    complaint => complaint.status === "Pending"
  ).length;

  const progressComplaints = complaints.filter(
    complaint => complaint.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    complaint => complaint.status === "Resolved"
  ).length;

  // Search and filters

  const filteredComplaints = complaints.filter((complaint) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      complaint.userName?.toLowerCase().includes(searchText) ||
      complaint.title?.toLowerCase().includes(searchText) ||
      complaint.location?.toLowerCase().includes(searchText);

    const matchesCategory =
      categoryFilter === "All" ||
      complaint.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      complaint.status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  return (
    <div className="container">

      <h1>Admin Dashboard</h1>

      {/* STATISTICS */}

      <div className="admin-stats">

        <div className="stat-card">
          <h2>{totalComplaints}</h2>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h2>{pendingComplaints}</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h2>{progressComplaints}</h2>
          <p>In Progress</p>
        </div>

        <div className="stat-card">
          <h2>{resolvedComplaints}</h2>
          <p>Resolved</p>
        </div>

      </div>

      {/* SEARCH AND FILTERS */}

      <div className="admin-filters">

        <input
          type="text"
          placeholder="Search by user, title or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="All">All Categories</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Road">Road</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

      {/* COMPLAINT COUNT */}

      <p className="filter-result">
        Showing {filteredComplaints.length} complaint(s)
      </p>

      {/* COMPLAINT TABLE */}

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Location</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredComplaints.length === 0 ? (

            <tr>
              <td colSpan="8">
                No complaints found.
              </td>
            </tr>

          ) : (

            filteredComplaints.map(complaint => (

              <tr key={complaint.id}>

                <td>{complaint.id}</td>

                <td>{complaint.userName}</td>

                <td>{complaint.title}</td>

                <td>{complaint.category}</td>

                
                <td>
  <span
    className={`priority-badge ${
      complaint.priority === "High"
        ? "priority-high"
        : complaint.priority === "Medium"
        ? "priority-medium"
        : "priority-low"
    }`}
  >
    {complaint.priority}
  </span>
</td>

                <td>

                  <span
                    className={`status-badge ${
                      complaint.status === "Pending"
                        ? "status-pending"
                        : complaint.status === "In Progress"
                        ? "status-progress"
                        : complaint.status === "Resolved"
                        ? "status-resolved"
                        : complaint.status === "Rejected"
                        ? "status-rejected"
                        : "status-assigned"
                    }`}
                  >
                    {complaint.status}
                  </span>

                </td>

                <td>{complaint.location}</td>

                <td>

                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      updateStatus(
                        complaint.id,
                        e.target.value
                      )
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Assigned">
                      Assigned
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                  <button
                    onClick={() =>
                      deleteComplaint(complaint.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Admin;

