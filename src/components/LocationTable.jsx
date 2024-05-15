import React, { useEffect, useState } from "react";
import { getallevents, deleteEvent, addEvent } from "../Apis/EventApi";
import { getAllLocations ,deleteLocation,addLocation} from "../Apis/LocationApi";
import { ToastContainer, toast } from "react-toastify";

const LocationTable = (props) => {
  const { isLighttheme } = props;
  const [LocationData, setLocationData] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const LocationResponse = await getAllLocations();
        console.log("Get All Locations -->", LocationResponse);
        setLocationData(LocationResponse.date);
        sessionStorage.setItem(
          "LocationData",
          JSON.stringify(LocationResponse.date)
        );
      } catch (error) {
        console.error("Error fetching category  data:", error);
      }
    };

    fetchLocationData();
  }, []);

  const [filterName, setFilterName] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const filteredData = LocationData.filter(
    (location) =>
      location.venue_name.toLowerCase().includes(filterName.toLowerCase()) &&
      location.address
        .toLocaleLowerCase()
        .includes(filterNumber.toLocaleLowerCase())
  );

  const handleNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setFilterNumber(event.target.value);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      const deleteData = async () => {
        try {
          const deletedEvent = await deleteLocation(locationId);
          console.log("Sucessfully deleted event -->", deletedEvent);

          // Filter the UserData and update state after successful deletion
          const filteredData = LocationData.filter(
            (location) => location._id !== locationId
          );
          setLocationData(filteredData);
          console.log("Updated LocationData", filteredData);
          sessionStorage.setItem("LocationData", JSON.stringify(filteredData));
        } catch (error) {
          console.error("Error deleting user data:", error);
        }
      };

      await deleteData();
    } catch (error) {
      console.error("Error handling user deletion:", error);
    }
  };

  const [formData, setFormData] = useState({
    venue_name: "",
    address: "",
    capacity: "",
    contact_number: "",
    contact_name: "",
    website: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLocation(formData);
    setFormData({
        venue_name: "",
        address: "",
        capacity: "",
        contact_number: "",
        contact_name: "",
        website: ""
    });
    toast.success("Location added successfully");
    setIsAddDialogOpen(false)
  };

  const createLocation = async (formData) => {
    try {
      const response = await addLocation(formData);
      setLocationData([...LocationData, response.data]);
      sessionStorage.setItem(
        "LocationData",
        JSON.stringify([...LocationData, response.data])
      );
      console.log("Location added successfully:", response.data);
    } catch (error) {
      console.error("Error adding Location:", error);
    }
  };
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  return (
    <div className=" p-5 h-full overflow-scroll">
      <div className="Input text-black element flex gap-10 mb-4 py-2 justify-between">
        <div className="flex gap-10">
          <input
            className="outline-none px-3 py-1 rounded-md"
            type="text"
            placeholder="Filter by name"
            value={filterName}
            onChange={handleNameChange}
          />
          <input
            className="outline-none px-3 py-1 rounded-md "
            type="text"
            placeholder="Filter by Description"
            value={filterNumber}
            onChange={handleNumberChange}
          />
        </div>
        <button
          className=" w-32 px-3 py-2 bg-green-400 font-bold text-white rounded-lg flex items-center justify-center"
          onClick={() =>  setIsAddDialogOpen(true)}
        >
          Add Location
        </button>
      </div>
      <table className="w-full border  ">
        <thead className="border h-14">
          <tr>
            <th className="border">S.No.</th>
            <th className="border">Location_Name </th>
            <th className="border">Location_Description</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((location, index) => (
            <tr key={index} className="border h-16">
              <td className="border text-center">{++index}</td>
              <td className="border text-center">{location.venue_name}</td>
              <td className="border text-center">{location.address}</td>
              <td className=" flex justify-center items-center h-16 gap-5 -px-20">
                <button
                  className="w-32 px-3 py-2 bg-[#1976D2] text-white rounded-lg"
                  onClick={() => {
                    setSelectedLocation(location);
                    setIsViewDialogOpen(true);
                  }}
                >
                  View Location
                </button>
                <button
                  className="min-w-32 px-3 py-2 bg-red-600 text-white rounded-lg"
                  onClick={() => {
                    handleDeleteLocation(location._id);
                  }}
                >
                  Delete Location
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isViewDialogOpen && selectedLocation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div
            className={`w-[500px] p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] ${
              isLighttheme
                ? "bg-zinc-100 text-black"
                : "bg-[#1E0338] text-white"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-center">
              Location Details
            </h2>
            <p>Location_id : {selectedLocation._id}</p>
            <p>Location_name : {selectedLocation.venue_name}</p>
            <p>Location_Description : {selectedLocation.address}</p>
            <button
              onClick={() => setIsViewDialogOpen(false)}
              className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isAddDialogOpen &&
        (
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
                Add Location
              </h2>
              <button
                className="absolute top-0 right-0"
                onClick={handleCloseDialog}
              >
                ❌
              </button>
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Location Name"
                name="venue_name"
                value={formData.venue_name}
                onChange={handleInputChange}
              />

              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Location address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter contact number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter contact name"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter website link"
                name="website"
                value={formData.website}
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
        <ToastContainer />
    </div>
  );
};

export default LocationTable;
