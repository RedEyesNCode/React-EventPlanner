import React, { useState } from "react";

const UserData = [
  {
    sno: 1,
    userId: "user1",
    fullName: "John Doe",
    empId: "EMP001",
    mpin: "1234",
  },
  {
    sno: 2,
    userId: "user2",
    fullName: "Jane Smith",
    empId: "EMP002",
    mpin: "5678",
  },
  {
    sno: 3,
    userId: "user3",
    fullName: "Alice Johnson",
    empId: "EMP003",
    mpin: "91011",
  },
  {
    sno: 3,
    userId: "user3",
    fullName: "Alice Johnson",
    empId: "EMP003",
    mpin: "91011",
  },
  {
    sno: 3,
    userId: "user3",
    fullName: "Alice Johnson",
    empId: "EMP003",
    mpin: "91011",
  },
  {
    sno: 3,
    userId: "user3",
    fullName: "Alice Johnson",
    empId: "EMP003",
    mpin: "91011",
  },
  {
    sno: 3,
    userId: "user3",
    fullName: "Alice Johnson",
    empId: "EMP003",
    mpin: "91011",
  },
  {
    sno: 3,
    userId: "user3",
    fullName: "Alice Johnson",
    empId: "EMP003",
    mpin: "91011",
  },
  {
    sno: 3,
    userId: "user3",
    fullName: "Alice Johnson",
    empId: "EMP003",
    mpin: "91011",
  },
  {
    sno: 3,
    userId: "user3",
    fullName: "Alice Johnson",
    empId: "EMP003",
    mpin: "91011",
  },
];

const UserTable = () => {
  const [filterName, setFilterName] = useState("");
  const [filterNumber, setFilterNumber] = useState("");

  const filteredData = UserData.filter(
    (user) =>
      user.fullName.toLowerCase().includes(filterName.toLowerCase()) &&
      user.empId.includes(filterNumber)
  );

  const handleNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setFilterNumber(event.target.value);
  };

  const handleViewUser = (userId) => {
    // Logic to view user details
    console.log("View user:", userId);
  };

  const handleDeleteUser = (userId) => {
    // Logic to delete user
    console.log("Delete user:", userId);
  };

  return (
    <div className=" p-5 h-full overflow-scroll">
      <div className="Input element flex gap-10 mb-4">
        <input
          className="outline-none px-2 py-1"
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={handleNameChange}
        />
        <input
          className="outline-none px-2 py-1"
          type="text"
          placeholder="Filter by number"
          value={filterNumber}
          onChange={handleNumberChange}
        />
      </div>
      <table className="w-full border ">
        <thead className="border h-14">
          <tr>
            <th className="border">S.No.</th>
            <th className="border">User ID</th>
            <th className="border">Full Name</th>
            <th className="border">Emp ID</th>
            <th className="border">MPIN</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
         {filteredData.map((user) => (
        <tr key={user.userId} className="border h-10">
      <td className="border text-center">{user.sno}</td>
      <td className="border text-center">{user.userId}</td>
      <td className="border text-center">{user.fullName}</td>
      <td className="border text-center">{user.empId}</td>
      <td className="border text-center">{user.mpin}</td>
      <td className="border flex justify-center items-center gap-5">
        <button className="w-32 px-3 py-2 bg-[#1976D2] text-white rounded-lg flex items-center justify-center" onClick={() => handleViewUser(user.userId)}>
          View User
        </button>
        
      </td>
      <td className="border flex justify-center items-center gap-5">
      <button className="w-32 px-3 py-2 bg-[#DE300B] text-white rounded-lg flex items-center justify-center" onClick={() => handleDeleteUser(user.userId)}>
          Delete User
        </button>
        
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default UserTable;
