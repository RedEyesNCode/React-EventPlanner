import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import UserTable from "./UserTable";

const MainPage = () => {
 
  return (
    <div className="h-screen w-screen  bg-slate-100 flex">
      <nav className="h-[99.5%] w-[20%] bg-slate-400 flex flex-col items-center gap-4 pt-14">
        <button className="flex justify-center items-center hover:text-white hover:bg-slate-800 h-10 w-40 px-7 py-3 font-semibold rounded-lg bg-zinc-200 text-zinc-800">
          Home
        </button>
        <button className="flex justify-center items-center hover:text-white hover:bg-slate-800 h-10 w-40 px-7 py-3 font-semibold rounded-lg bg-zinc-200 text-zinc-800">
          About
        </button>
      </nav>
      <div className="ControlPannel px-2 py-2 h-full w-[80%] ">
        <div className="h-16 py-2 flex justify-between items-center border-b border-collapse mb-5">
          <h1 className=" flex justify-center items-center font-semibold rounded-lg px-3 py-2 bg-[#1976D2] text-white w-56">
            Admin Panel
          </h1>
          <h1 className=" flex justify-center items-center font-semibold rounded-lg px-3 py-2 text-[#1976D2] bg-white w-56">
            Admin Name
          </h1>
        </div>
        <div className="OptionPanel w-full h-40 bg-[#66B6D2] flex items-center justify-evenly p-4">
          <div className="cursor-pointer h-32 w-32 bg-[#9003FC] rounded-xl flex flex-col items-center justify-center gap-2">
            <FaRegCircleUser className="text-5xl text-white pr-1" />
            <h1 className="text-white text-xl">View User</h1>
          </div>
          <div className="cursor-pointer h-32 w-32 bg-[#07EC73] rounded-xl flex flex-col items-center justify-center gap-2">
            <FaRegCircleUser className="text-5xl text-white pr-1" />
            <h1 className="text-white text-xl">View User</h1>
          </div>
          <div className="cursor-pointer h-32 w-32 bg-[#CB4335] rounded-xl flex flex-col items-center justify-center gap-2">
            <FaRegCircleUser className="text-5xl text-white pr-1" />
            <h1 className="text-white text-xl">View User</h1>
          </div>
          <div className="cursor-pointer h-32 w-32 bg-[#1976D2] rounded-xl flex flex-col items-center justify-center gap-2">
            <FaRegCircleUser className="text-5xl text-white pr-1" />
            <h1 className="text-white text-xl">View User</h1>
          </div>
        </div>
        <div className="py-3 h-[475px]">
          {/* Display changed component heree */}
          <UserTable/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
