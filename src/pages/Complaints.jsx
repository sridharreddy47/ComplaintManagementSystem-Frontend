import { useState } from "react";
import axios from "axios";

function Complaints() {
  const [complaint, setComplaint] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    location: "",
    userName: localStorage.getItem("name") || ""
  });

  const handleChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value
    });
  };

  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/complaints",
        complaint,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Complaint submitted successfully!");

      setComplaint({
        title: "",
        description: "",
        category: "",
        priority: "Medium",
        location: "",
        userName: localStorage.getItem("name") || ""
      });

    } catch (error) {
      console.log(error);
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="container">

      <h1>Submit Complaint</h1>

      <form onSubmit={submitComplaint}>

        <label>Your Name</label>
        <input
          type="text"
          name="userName"
          placeholder="Enter your name"
          value={complaint.userName}
          onChange={handleChange}
          required
        />

        <label>Complaint Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter complaint title"
          value={complaint.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Describe your complaint"
          value={complaint.description}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={complaint.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Road">Road</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>

        <label>Priority</label>
        <select
          name="priority"
          value={complaint.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="Enter complaint location"
          value={complaint.location}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Submit Complaint
        </button>

      </form>

    </div>
  );
}

export default Complaints;






