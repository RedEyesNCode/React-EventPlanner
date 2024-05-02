import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here

    // After successful login, navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen bg-zinc-800 flex items-center justify-center">
      <div className="h-[340px] w-[320px] bg-zinc-100 rounded-lg px-10 py-5 flex flex-col items-center">
        <h1 className="font-bold text-xl">Event Planner CRM</h1>
        <form className="flex flex-col mt-8 mb-5 gap-2">
          <label className="font-semibold" htmlFor="name">
            ADMIN NAME :
          </label>
          <input
            className="outline-none px-5 py-2 mb-3"
            id="name"
            type="text"
            name="name"
          />
          <label className="font-semibold" htmlFor="password">
            ADMIN PASSWORD :
          </label>
          <input
            className="outline-none px-5 py-2"
            id="password"
            type="text"
            name="password"
          />
        </form>
        <button
          className="px-7 py-2 font-semibold bg-[#1976D2] text-white rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
