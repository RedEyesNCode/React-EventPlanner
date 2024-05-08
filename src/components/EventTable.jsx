import React, { useEffect, useState } from "react";
import { getallevents, deleteEvent, addEvent } from "../Apis/EventApi";

const EventTable = (props) => {
  const { isLighttheme } = props;
  const [EventData, setEventData] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const getAllEventsResponse = await getallevents();
        console.log("Get All Events -->", getAllEventsResponse);
        setEventData(getAllEventsResponse.date);
        sessionStorage.setItem(
          "EventData",
          JSON.stringify(getAllEventsResponse.date)
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  const [filterName, setFilterName] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const filteredData = EventData.filter(
    (event) =>
      event.event_name.toLowerCase().includes(filterName.toLowerCase()) ||
      event.Status.includes(filterNumber)
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

  const handleDeleteUser = async (eventId) => {
    try {
      const deleteData = async () => {
        try {
          const deletedEvent = await deleteEvent(eventId);
          console.log("Sucessfully deleted event -->", deletedEvent);

          // Filter the UserData and update state after successful deletion
          const filteredData = EventData.filter(
            (event) => event._id !== eventId
          );
          setEventData(filteredData);
          console.log("Updated EventData", filteredData);
          sessionStorage.setItem("EventData", JSON.stringify(filteredData));
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
    event_name: "",
    event_type: "",
    start_date: "",
    end_date: "",
    Status: "",
    userId: "",
    location_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(formData);
    setFormData({
      event_name: "",
      event_type: "",
      start_date: "",
      end_date: "",
      Status: "",
      userId: "",
      location_id: "",
    });

    setIsAddDialogOpen(false);
  };

  const createEvent = async (formData) => {
    try {
      const response = await addEvent(formData);
      setEventData([...EventData, response.data]);
      sessionStorage.setItem(
        "EventData",
        JSON.stringify([...EventData, response.data])
      );
      console.log("Event added successfully:", response.data);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  return (
    <div className=" p-5 h-[550px] overflow-scroll">
      <div className="Input text-black element flex gap-10 mb-4 py-2 justify-between">
        <div>
          <input
            className="outline-none px-2 py-1"
            type="text"
            placeholder="Filter by name"
            value={filterName}
            onChange={handleNameChange}
          />
          <input
            className="outline-none px-2 py-1 ml-5"
            type="text"
            placeholder="Filter by number"
            value={filterNumber}
            onChange={handleNumberChange}
          />
        </div>
        <button
          className=" w-32 px-3 py-2 bg-green-400 font-bold text-white rounded-lg flex items-center justify-center"
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add Event
        </button>
      </div>
      <table className="w-full border  ">
        <thead className="border h-14">
          <tr>
            <th className="border">S.No.</th>
            <th className="border">Created By </th>
            <th className="border">Event Name </th>
            <th className="border">Event Type</th>
            <th className="border">Status</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((event, index) => (
            <tr key={index} className="border h-10">
              <td className="border text-center">{++index}</td>
              <td className="border text-center">{event.userId}</td>
              <td className="border text-center">{event.event_name}</td>
              <td className="border text-center">{event.event_type}</td>
              <td className="border text-center">{event.Status}</td>
              <td className="border flex justify-center items-center gap-5">
                <button
                  className="w-32 px-3 py-2 bg-[#1976D2] text-white rounded-lg flex items-center justify-center"
                  onClick={() => {setSelectedEvent(event); setIsViewDialogOpen(true)}}
                >
                  View Event
                </button>
              </td>
              <td className="border flex justify-center items-center gap-5">
                <button
                  onClick={() => handleDeleteUser(event._id)}
                  className="w-32 px-3 py-2 bg-[#DE300B] text-white rounded-lg flex items-center justify-center"
                >
                  Delete Event
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
              Create Event
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
              placeholder="Event Name"
              name="event_name"
              value={formData.event_name}
              onChange={handleInputChange}
            />

            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Event Type"
              name="event_type"
              value={formData.event_type}
              onChange={handleInputChange}
            />
            <input
              type="date"
              className="p-2 rounded-lg outline-none"
              placeholder="Start_date in dd/mm/yyyy"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
            />
            <input
              type="date"
              className="p-2 rounded-lg outline-none"
              placeholder="End_date in dd/mm/yyyy"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Status"
              name="Status"
              value={formData.Status}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter ID of user"
              name="userId"
              required={true}
              value={formData.userId}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="Enter ID of location"
              name="location_id"
              required={true}
              value={formData.location_id}
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
      {isViewDialogOpen && selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div
            className={`w-[500px] p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] ${
              isLighttheme
                ? "bg-zinc-100 text-black"
                : "bg-[#1E0338] text-white"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-center">Event Details</h2>
            <p>Event_name : {selectedEvent.event_name}</p>
            <p>Event_type : {selectedEvent.event_type}</p>  
            <p>Start_date : {selectedEvent.start_date.split("T")[0]}</p>
            <p>End_date : {selectedEvent.end_date.split("T")[0]}</p>
            <p>Status : {selectedEvent.Status}</p>
            <p>Description : {selectedEvent.description}</p>
            <p>User_Id : {selectedEvent.userId}</p>
            <p>Locaion_Id : {selectedEvent.location_id}</p>
            <button
              onClick={() => setIsViewDialogOpen(false)}
              className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTable;
