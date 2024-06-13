import React, { useEffect, useState } from "react";
import { getallevents, deleteEvent, addEvent } from "../Apis/EventApi";
import { getallcategories } from "../Apis/CategoryApi";

const CategoryTable = (props) => {
  const { isLighttheme } = props;
  const [CategoryData, setCategoryData] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const getAllCategoriesResponse = await getallcategories();
        console.log("Get All categories -->", getAllCategoriesResponse);
        setCategoryData(getAllCategoriesResponse.data);
        sessionStorage.setItem(
          "CategoryData",
          JSON.stringify(getAllCategoriesResponse.data)
        );
      } catch (error) {
        console.error("Error fetching category  data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  const [filterName, setFilterName] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const filteredData = CategoryData.filter(
    (cat) =>
      cat.categories_name.toLowerCase().includes(filterName.toLowerCase())
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
          const filteredData = CategoryData.filter(
            (event) => event._id !== eventId
          );
          setCategoryData(filteredData);
          console.log("Updated CategoryData", filteredData);
          sessionStorage.setItem("CategoryData", JSON.stringify(filteredData));
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
      setCategoryData([...CategoryData, response.data]);
      sessionStorage.setItem(
        "CategoryData",
        JSON.stringify([...CategoryData, response.data])
      );
      console.log("Event added successfully:", response.data);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  return (
    <div className="p-5 h-[475px] overflow-auto">
      <div className="Input text-black element flex gap-10 mb-4 py-2 justify-between">
        <div className="flex gap-10">
          <input
            className="outline-none px-3 py-1 rounded-md"
            type="text"
            placeholder="Filter by name"
            value={filterName}
            onChange={handleNameChange}
          />
        </div>
      </div>
      <table className="w-full border  ">
        <thead className="border h-14">
          <tr>
            <th className="border">S.No.</th>
            <th className="border">Category_Name </th>
            <th className="border">Category_Description</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((category, index) => (
            <tr key={index} className="border h-16">
              <td className="border text-center">{++index}</td>
              <td className="border text-center">{category.categories_name}</td>
              <td className="border text-center">{category.description}</td>
              <td className=" flex justify-center items-center h-16">
                <button
                  className="w-32 px-3 py-2 bg-[#1976D2] text-white rounded-lg"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsViewDialogOpen(true);
                  }}
                >
                  View Category
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isViewDialogOpen && selectedCategory && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div
            className={`w-[500px] p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] ${
              isLighttheme
                ? "bg-zinc-100 text-black"
                : "bg-[#1E0338] text-white"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-center">
              Event Details
            </h2>
            <p>Categories_id : {selectedCategory._id}</p>
            <p>Categories_name : {selectedCategory.categories_name}</p>
            <p>Categories_Description : {selectedCategory.description}</p>
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

export default CategoryTable;
