import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import UserTable from "./UserTable";

const MainPage = () => {
  const [isLighttheme, setisLighttheme] = useState(false);
  console.log("isLighttheme", isLighttheme);
  return (
    <div className={`h-screen w-screen   flex  ${
      isLighttheme ? "bg-white text-[#1E0338]" : "bg-[#1E0338] text-white"
    }`}>
      <nav className="h-[99.5%] w-[20%]  flex flex-col items-center gap-4 pt-14 border-r">
        <button className="flex justify-center items-center hover:text-white hover:bg-slate-800 h-10 w-40 px-7 py-3 font-semibold rounded-lg bg-zinc-200 text-zinc-800">
          Home
        </button>
        <button className="flex justify-center items-center hover:text-white hover:bg-slate-800 h-10 w-40 px-7 py-3 font-semibold rounded-lg bg-zinc-200 text-zinc-800">
          About
        </button>
      </nav>
      <div className="ControlPannel  py-2 h-full w-[80%] ">
        <div className="h-16 py-2 flex gap-[300px] items-center border-b border-collapse mb-5 px-2">
          <h1 className=" flex justify-center items-center font-semibold rounded-lg px-3 py-2 bg-[#1976D2] text-white w-56">
            Admin Panel
          </h1>
          <h1 className=" flex justify-center items-center font-semibold rounded-lg px-3 py-2 text-[#1976D2] bg-white w-56">
            Admin Name
          </h1>
          <div
            className={`border w-20 rounded-3xl flex absolute z-[999] right-[1%] bg-[#1E0338] ${
              isLighttheme ? "justify-end" : "justify-start"
            }`}
          >
            <button
              onClick={() => setisLighttheme(!isLighttheme)}
              className="h-10 w-10 rounded-3xl bg-red-200"
            ></button>
          </div>
        </div>
        <div className="OptionPanel w-full h-40 border-b flex items-center justify-evenly p-4">
          <div className="cursor-pointer h-32 w-32 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 rounded-xl flex flex-col items-center justify-center gap-2">
            <FaRegCircleUser className="text-5xl text-white pr-1" />
            <h1 className="text-white text-xl">View Users</h1>
          </div>
          <div className="cursor-pointer h-32 w-32 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 rounded-xl flex flex-col items-center justify-center gap-2">
            <FaRegCircleUser className="text-5xl text-white pr-1" />
            <h1 className="text-white text-xl">Category</h1>
          </div>
          <div className="cursor-pointer h-32 w-32 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 rounded-xl flex flex-col items-center justify-center gap-2">
            <FaRegCircleUser className="text-5xl text-white pr-1" />
            <h1 className="text-white text-xl">Location</h1>
          </div>
          <div className="cursor-pointer h-32 w-32 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 rounded-xl flex flex-col items-center justify-center gap-2">
            <FaRegCircleUser className="text-5xl text-white pr-1" />
            <h1 className="text-white text-xl">View User</h1>
          </div>
        </div>
        <div className="py-3 h-[475px]">
          {/* Display changed component heree */}
          <UserTable isLighttheme={isLighttheme} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
