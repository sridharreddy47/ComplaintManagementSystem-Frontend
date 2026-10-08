import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/users/register", user);

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="container">

      <h1>Register</h1>

      <form onSubmit={registerUser}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;