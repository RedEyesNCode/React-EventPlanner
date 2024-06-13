import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  addUser,
  updateUser,
} from "../Apis/apiInterface";
import { createVenue, deleteVenue, getAllVenue, updateVenue } from "../Apis/VenueApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VenueTable = (props) => {
  const { isLighttheme } = props;
  const [VenueData, setVenueData] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    venue_name: "",
    venue_address: "",
    venue_capacity: "",
    venue_contact_person: "",
    contact_email_phone: "",
    additional_services: "",
    parking_facility: "",
    alcohol_permission: "",
    cost: "",
    payment_terms: "",
    security_needs: "",
    event_id: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewVenue(formData);
    console.log("Form Data:", formData);
    setFormData({
      venue_name: "",
      venue_address: "",
      venue_capacity: "",
      venue_contact_person: "",
      contact_email_phone: "",
      additional_services: "",
      parking_facility: "",
      alcohol_permission: "",
      cost: "",
      payment_terms: "",
      security_needs: "",
      event_id: "",
    });

    setIsAddDialogOpen(false);
  };
  const createNewVenue = async (formData) => {
    try {
      const response = await createVenue(formData);
      setVenueData([...VenueData, response.data]);
      if (response.status === "Success") toast.success(response.message);

      sessionStorage.setItem(
        "VenueData",
        JSON.stringify([...VenueData, response.data])
      );
      console.log("Venue added successfully:", response.data);
    } catch (error) {
      console.error("Error adding venue:", error);
    }
  };
  const handleUpdateVenue = async (e) => {
    e.preventDefault();
    let obj = {...formData,venueId:formData._id};
    console.log("Form Data:", obj);
    await updateVenueData(obj);
    setFormData({
      venue_name: "",
      venue_address: "",
      venue_capacity: "",
      venue_contact_person: "",
      contact_email_phone: "",
      additional_services: "",
      parking_facility: "",
      alcohol_permission: "",
      cost: "",
      payment_terms: "",
      security_needs: "",
      event_id: "",
    });

    setIsUpdateDialogOpen(false);
  };
  const updateVenueData = async (formData) => {
    try {
      const response = await updateVenue(formData);
      // setVenueData([...VenueData, response.data]);
      if(response.status === "Success") toast.warning(response.message);

      sessionStorage.setItem(
        "VenueData",
        JSON.stringify([...VenueData, response.data])
      );
      console.log("Venue updated successfully:", response);
    } catch (error) {
      console.error("Error in updating Venue:", error);
    }
  };
  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const getAllVenueResponse = await getAllVenue();
        console.log("Get All Venue -->", getAllVenueResponse);
        setVenueData(getAllVenueResponse.data);
        console.log("For venue data -> " , getAllVenueResponse)
        sessionStorage.setItem(
          "VenueData",
          JSON.stringify(getAllVenueResponse.data)
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchVenueData();
  }, [formData]);
  const [filterName, setFilterName] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const filteredData = VenueData.filter(
    (Venue) =>
      (Venue.venue_name || "").toLowerCase().includes(filterName.toLowerCase()) &&
      (Venue.cost || "").includes(filterNumber)
  );
  const handleViewUser = (user) => {
    setSelectedVenue(user);
    setIsDialogOpen(true);
  };
  const handleDeleteVenue = async (venueId) => {
    try {
      const deleteData = async () => {
        try {
          const deletedVenue = await deleteVenue(venueId);
          const filteredData = VenueData.filter(
            (venue) => venue._id !== venueId
          );
          setVenueData(filteredData);
          if (deletedVenue.status === "Success")
            toast.error(deletedVenue.message);
          console.log("Updated VenueData", filteredData);
          sessionStorage.setItem("VenueData", JSON.stringify(filteredData));
          console.log("Sucessfully deleted Venue -->", deletedVenue);
        } catch (error) {
          console.error("Error deleting Venue data:", error);
        }
      };

      await deleteData(); // Wait for deleteData function to complete
    } catch (error) {
      console.error("Error handling Venue deletion:", error);
    }
  };
  const [images, setImages] = useState([]);
  const handleViewImages = () => {
    setImages(selectedVenue.images);
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
            placeholder="Filter by Cost"
            value={filterNumber}
            onChange={(event) => setFilterNumber(event.target.value)}
          />
        </div>
        <button
          className=" w-32 px-3 py-2 bg-green-400 font-bold text-white rounded-lg flex items-center justify-center"
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add Venue
        </button>
      </div>
      <table className="w-full border   ">
        <thead className="border h-14">
          <tr>
            <th className="border">S.No.</th>
            <th className="border">Name </th>
            <th className="border">Contact Person </th>
            <th className="border">Location </th>
            <th className="border">Mobile Number</th>
            <th className="border">Cost</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((venue, index) => (
            <tr key={index} className="border">
              <td className="border text-center">{++index}</td>
              <td className="border text-center">{venue.venue_name}</td>
              <td className="border text-center">
                {venue.venue_contact_person}
              </td>
              <td className="border text-center">{venue.venue_address}</td>
              <td className="border text-center">
                {venue.contact_email_phone}
              </td>
              <td className="border text-center">{venue.cost}</td>
              <td className="border flex flex-col justify-center items-center gap-1 py-3">
                <button
                  className="w-32 px-3 py-2 bg-[#1976D2] text-white rounded-lg flex items-center justify-center"
                  onClick={() => handleViewUser(venue)}
                >
                  View Venue
                </button>
                <button
                  onClick={() => handleDeleteVenue(venue._id)}
                  className="w-32 px-3 py-2 bg-[#DE300B] text-white rounded-lg flex items-center justify-center"
                >
                  Delete Venue
                </button>
                <button
                  onClick={() => {
                    setFormData(venue);
                    setIsUpdateDialogOpen(true);
                  }}
                  className="w-32 px-3 py-2 bg-yellow-400 text-white rounded-lg flex items-center justify-center"
                >
                  Update Venue
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDialogOpen && selectedVenue && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div
            className={` p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] w-[400px] ${
              isLighttheme
                ? "bg-zinc-100 text-black"
                : "bg-[#1E0338] text-white"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-center">
              Venue Details
            </h2>
            {/* Venue details */}
            <p>Name : {selectedVenue.venue_name}</p>
            <p>Contact Person : {selectedVenue.venue_contact_person}</p>
            <p>Address : {selectedVenue.venue_address}</p>
            <p>Mobile : {selectedVenue.contact_email_phone}</p>
            <p>Cost : {selectedVenue.cost}</p>

            {/* Button to view all images */}
            <button
              onClick={handleViewImages}
              className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg"
            >
              View All Images
            </button>

            {/* Display all images */}
            {images.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mt-4 mb-2">All Images</h3>
                <div className="flex gap-2  overflow-x-scroll max-h-[500px] ">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="max-w-[200px] max-h-[200px] object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setIsDialogOpen(false);
                setImages([]);
              }}
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
            className={`relative px-16 py-5 min-w-1/3 rounded-lg flex flex-col gap-3 text-[20px] ${
              isLighttheme
                ? "bg-zinc-100 text-black"
                : "bg-[#1E0338] text-black"
            }`}
          >
            <h2 className=" text-xl font-semibold mb-4 text-center text-white">
              ADD NEW VENUE
            </h2>
            <button
              className="absolute top-0 right-0"
              onClick={() => setIsAddDialogOpen(false)}
            >
              ❌
            </button>
            <div className="flex gap-5">
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Venue Name"
                  name="venue_name"
                  value={formData.venue_name}
                  onChange={handleInputChange}
                />

                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Venue address"
                  name="venue_address"
                  value={formData.venue_address}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Venue capacity"
                  name="venue_capacity"
                  value={formData.venue_capacity}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Additional Services"
                  name="additional_services"
                  value={formData.additional_services}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Venue contact person"
                  name="venue_contact_person"
                  value={formData.venue_contact_person}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter contact details"
                  name="contact_email_phone"
                  value={formData.contact_email_phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Parking Facility"
                  name="parking_facility"
                  value={formData.parking_facility}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Alcohol Permission"
                  name="alcohol_permission"
                  value={formData.alcohol_permission}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Cost"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Payment Terms & Conditions"
                  name="payment_terms"
                  value={formData.payment_terms}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none"
                  placeholder="Enter Security needs"
                  name="security_needs"
                  value={formData.security_needs}
                  onChange={handleInputChange}
                />
                <select
                  className="p-2 rounded-lg outline-none"
                  name="event_id"
                  value={formData.event_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Event</option>
                  {JSON.parse(sessionStorage.getItem("EventData")).map(
                    (event) => (
                      <option key={event._id} value={event._id}>
                        {event.event_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
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
          
          className={`relative px-16 py-5 min-w-1/3 rounded-lg flex flex-col gap-3 text-[20px] ${
            isLighttheme
              ? "bg-zinc-100 text-black"
              : "bg-[#1E0338] text-black"
          }`}
        >
          <h2 className=" text-xl font-semibold mb-4 text-center text-white">
            UPDATE VENUE
          </h2>
          <button
            className="absolute top-0 right-0"
            onClick={() =>  setIsAddDialogOpen(false)}
          >
            ❌
          </button>
          <div className="flex gap-5">
            <div className="flex flex-col gap-5">
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Venue Name"
                name="venue_name"
                value={formData.venue_name}
                onChange={handleInputChange}
              />

              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Venue address"
                name="venue_address"
                value={formData.venue_address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Venue capacity"
                name="venue_capacity"
                value={formData.venue_capacity}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Additional Services"
                name="additional_services"
                value={formData.additional_services}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Venue contact person"
                name="venue_contact_person"
                value={formData.venue_contact_person}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter contact details"
                name="contact_email_phone"
                value={formData.contact_email_phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Parking Facility"
                name="parking_facility"
                value={formData.parking_facility}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Alcohol Permission"
                name="alcohol_permission"
                value={formData.alcohol_permission}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Cost"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Payment Terms & Conditions"
                name="payment_terms"
                value={formData.payment_terms}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="p-2 rounded-lg outline-none"
                placeholder="Enter Security needs"
                name="security_needs"
                value={formData.security_needs}
                onChange={handleInputChange}
              />
              <select
                className="p-2 rounded-lg outline-none"
                name="event_id"
                value={formData.event_id}
                onChange={handleInputChange}
              >
                <option value="">Select Event</option>
                {JSON.parse(sessionStorage.getItem("EventData")).map(
                  (event) => (
                    <option key={event._id} value={event._id}>
                      {event.event_name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleUpdateVenue}
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

export default VenueTable;
