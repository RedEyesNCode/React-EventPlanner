import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "./Apis/apiInterface";

// const UserData = [
//   {
//     _id: "66348c0706c7ecdca3c72459",
//     name: "user2",
//     email: "user2@gmail.com",
//     PhoneNumber: "454545454",
//     Address: "user2address",
//     password: "123456",
//     isLoggedIn: false,
//     createdAt: "2024-05-03T07:02:31.818Z",
//     updatedAt: "2024-05-03T07:03:15.473Z",
//     __v: 0,
//   },
//   {
//     _id: "66348c0706c7ecdca3c72459",
//     name: "user2",
//     email: "user2@gmail.com",
//     PhoneNumber: "454545454",
//     Address: "user2address",
//     password: "123456",
//     isLoggedIn: false,
//     createdAt: "2024-05-03T07:02:31.818Z",
//     updatedAt: "2024-05-03T07:03:15.473Z",
//     __v: 0,
//   },
// ];

const UserTable = (props) => {
  const { isLighttheme } = props;
  const [UserData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // useEffect(() => {
  //   const userData = sessionStorage.getItem("userData");
  //   if (userData) {
  //     setUserData(JSON.parse(userData));
  //   }
  // }, []);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const getAllUsersResponse = await getAllUsers();
        console.log("Get All Users -->", getAllUsersResponse);
        setUserData(getAllUsersResponse.data);
        sessionStorage.setItem(
          "userData",
          JSON.stringify(getAllUsersResponse.data)
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCategoryData();
  }, []);
 

  const [filterName, setFilterName] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const filteredData = UserData.filter(
    (user) =>
      user.name.toLowerCase().includes(filterName.toLowerCase()) &&
      user.PhoneNumber.includes(filterNumber)
  );

  const handleNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setFilterNumber(event.target.value);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const deleteData = async () => {
        try {
          console.log(userId);
          const deletedUser = await deleteUser(userId);
          console.log("Sucessfully deleted user -->", deletedUser);

          // Filter the UserData and update state after successful deletion
          const filteredData = UserData.filter((user) => user._id !== userId);
          setUserData(filteredData);
          console.log("Updated UserData", filteredData);
          sessionStorage.setItem("userData", JSON.stringify(filteredData));
        } catch (error) {
          console.error("Error deleting user data:", error);
        }
      };

      await deleteData(); // Wait for deleteData function to complete
    } catch (error) {
      console.error("Error handling user deletion:", error);
    }
  };

  return (
    <div className=" p-5 h-[550px] overflow-scroll">
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
      <table className="w-full border  ">
        <thead className="border h-14">
          <tr>
            <th className="border">S.No.</th>
            <th className="border">Name </th>
            <th className="border">EMAIL </th>
            <th className="border">Mobile Number</th>
            <th className="border">Address</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index} className="border h-10">
              <td className="border text-center">{++index}</td>
              <td className="border text-center">{user.name}</td>
              <td className="border text-center">{user.email}</td>
              <td className="border text-center">{user.PhoneNumber}</td>
              <td className="border text-center">{user.Address}</td>
              <td className="border flex justify-center items-center gap-5">
              <button
                  className="w-32 px-3 py-2 bg-[#1976D2] text-white rounded-lg flex items-center justify-center"
                  onClick={() => handleViewUser(user)}
                >
                  View User
                </button>
              </td>
              <td className="border flex justify-center items-center gap-5">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="w-32 px-3 py-2 bg-[#DE300B] text-white rounded-lg flex items-center justify-center"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDialogOpen && selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
        <div className={` p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] ${isLighttheme ? "bg-zinc-100 text-black" : "bg-[#1E0338] text-white"  }`}>
          <h2 className="text-lg font-bold mb-4 text-center">User Details</h2>
          <p>Name : {selectedUser.name}</p>
          <p>Email : {selectedUser.email}</p>
          <p>Mobile : {selectedUser.PhoneNumber}</p>
          <p>Address : {selectedUser.Address}</p>
          <button onClick={handleCloseDialog} className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default UserTable;
