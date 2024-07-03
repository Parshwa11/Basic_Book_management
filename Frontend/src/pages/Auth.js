import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../api";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = isSignup
        ? await signUp(formData)
        : await signIn(formData);
      localStorage.setItem("profile", JSON.stringify(data));

      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>{isSignup ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {isSignup && (
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
        <button type="button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
