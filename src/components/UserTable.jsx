import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  addUser,
  updateUser,
} from "../Apis/apiInterface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const UserTable = (props) => {
  const { isLighttheme } = props;
  const [UserData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [paymentsDialogOpen, setpaymentsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    PhoneNumber: "",
    Address: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(formData);
    setFormData({
      name: "",
      email: "",
      PhoneNumber: "",
      Address: "",
      password: "",
    });

    setIsAddDialogOpen(false);
  };
  const createUser = async (formData) => {
    try {
      const response = await addUser(formData);
      setUserData([...UserData, response.data]);
      if (response.status === "Success") toast.success(response.message);

      sessionStorage.setItem(
        "UserData",
        JSON.stringify([...UserData, response.data])
      );
      console.log("User added successfully:", response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await updateUserData(formData);
    setFormData({
      name: "",
      email: "",
      PhoneNumber: "",
      Address: "",
      password: "",
    });

    setIsUpdateDialogOpen(false);
  };
  const updateUserData = async (formData) => {
    try {
      const response = await updateUser(formData);
      toast.warning(response.message);
      console.log("User updated successfully:", response);
    } catch (error) {
      console.error("Error in updating user:", error);
    }
  };
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
  }, [isAddDialogOpen]);
  const [filterName, setFilterName] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const filteredData = UserData && UserData.filter(
    (user) =>
      user && 
      user.name.toLowerCase().includes(filterName.toLowerCase()) &&
      user.PhoneNumber.includes(filterNumber)
  );
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const confirmDeleteUser = (userId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteUser(userId)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleDeleteUser = async (userId) => {
    try {
      const deleteData = async () => {
        try {
          console.log(userId);
          const deletedUser = await deleteUser(userId);
          const filteredData = UserData.filter((user) => user._id !== userId);
          setUserData(filteredData);
          if (deletedUser.status === "Success")
            toast.error(deletedUser.message);
          console.log("Updated UserData", filteredData);
          sessionStorage.setItem("userData", JSON.stringify(filteredData));
          console.log("Successfully deleted user -->", deletedUser);
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
    <div className="p-5 h-[475px] overflow-auto">
      <div className="Input text-black element flex gap-10 mb-4 py-2 justify-between">
        <div className="flex gap-10">
          <input
            className="outline-none px-3 py-1 rounded-md"
            type="text"
            placeholder="Filter by name"
            value={filterName}
            onChange={(event) => setFilterName(event.target.value)}
          />
          <input
            className="outline-none px-3 py-1 rounded-md"
            type="text"
            placeholder="Filter by number"
            value={filterNumber}
            onChange={(event) => setFilterNumber(event.target.value)}
          />
        </div>
        <button
          className=" w-32 px-3 py-2 bg-green-400 font-bold text-white rounded-lg flex items-center justify-center"
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add User
        </button>
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
          {filteredData && filteredData.map((user, index) => (
            <tr key={index} className="border">
              <td className="border text-center">{++index}</td>
              <td className="border text-center">{user.name}</td>
              <td className="border text-center">{user.email}</td>
              <td className="border text-center">{user.PhoneNumber}</td>
              <td className="border text-center">{user.Address}</td>
              <td className="border flex flex-col justify-center items-center gap-1 py-3">
                <button
                  className="w-32 px-3 py-2 bg-[#1976D2] text-white rounded-lg flex items-center justify-center"
                  onClick={() => handleViewUser(user)}
                >
                  View User
                </button>
                <button
                  onClick={() => confirmDeleteUser(user._id)}
                  className="w-32 px-3 py-2 bg-[#DE300B] text-white rounded-lg flex items-center justify-center"
                >
                  Delete User
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setpaymentsDialogOpen(true);
                    console.log(user);
                  }}
                  className="w-32 px-2 py-2 bg-green-400 text-white rounded-lg flex items-center justify-center"
                >
                  View Payments
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDialogOpen && selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div
            className={` p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] ${
              isLighttheme
                ? "bg-zinc-100 text-black"
                : "bg-[#1E0338] text-white"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-center">User Details</h2>
            <p>Name : {selectedUser.name}</p>
            <p>Email : {selectedUser.email}</p>
            <p>Mobile : {selectedUser.PhoneNumber}</p>
            <p>Address : {selectedUser.Address}</p>
            <p>Subscription Status : {selectedUser.isPaid ? "Active":"Expired"}</p>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isAddDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className={`relative px-16 py-5 w-1/3 rounded-lg flex flex-col items-left gap-3 text-[20px] ${
              isLighttheme
                ? "bg-zinc-100 text-black"
                : "bg-[#1E0338] text-black"
            }`}
          >
            <h2 className=" text-xl font-semibold mb-4 text-center text-white">
              ADD NEW USER
            </h2>
            <button
              className="absolute top-0 right-0"
              onClick={() => setIsAddDialogOpen(false)}
            >
              ❌
            </button>
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter Name"
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter Email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter PhoneNumber"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter Address"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter Password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {isUpdateDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <form
            onSubmit={handleUpdateUser}
            className={`relative px-16 py-5 w-1/3 rounded-lg flex flex-col items-left gap-3 text-[20px] ${
              isLighttheme
                ? "bg-zinc-100 text-black"
                : "bg-[#1E0338] text-black"
            }`}
          >
            <h2 className=" text-xl font-semibold mb-4 text-center text-white">
              UPDATE USER
            </h2>
            <button
              className="absolute top-0 right-0"
              onClick={() => setIsUpdateDialogOpen(false)}
            >
              ❌
            </button>
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter Name"
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter Email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter PhoneNumber"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter Address"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter Password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {paymentsDialogOpen && selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div
            className={` p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] ${
              isLighttheme
                ? "bg-zinc-100 text-black"
                : "bg-[#1E0338] text-white"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-center">User Details</h2>
            <p>Name : {selectedUser.name}</p>
            <p>Email : {selectedUser.email}</p>
            <p>Mobile : {selectedUser.PhoneNumber}</p>
            <p>Address : {selectedUser.Address}</p>
            <p>Subscription Status : {selectedUser.isPaid ? "Active":"Expired"}</p>

            {/* Render subscriptions */}
            <div>
              <h3 className="text-lg font-bold mb-2">Subscriptions:</h3>
              {selectedUser.subscriptions.length === 0 ? (
                <p>No history found for subscriptions</p>
              ) : (
                <ul className="list-disc pl-5">
                  {selectedUser.subscriptions.map((subscription, index) => (
                    <li key={index}>
                      Date: {new Date(subscription.date).toLocaleDateString()},
                      Amount: {subscription.amount} Rs
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => setpaymentsDialogOpen(false)}
              className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UserTable;
