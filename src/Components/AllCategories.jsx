import React, { useEffect, useState } from 'react'
import { deleteCategory, getAllCategory } from '../api/apiInterface';

const AllCategories = () => {
    const [category, setCategory] = useState([]);
    const [filterCategoryId, setfilterCategoryId] = useState("");
    const [filterCategoryName, setFilterCategoryName] = useState("");
  
    useEffect(() => {
      const fetchCategoryData = async () => {
        const getAllLeadsResponse = await getAllCategory();
        setCategory(getAllLeadsResponse.data)
  
      };
      fetchCategoryData();
    }, []);
    

    const filteredCategories = category.filter((item) =>
    
    item._id.includes(filterCategoryId) &&
    item.categories_name.toLowerCase().includes(filterCategoryName.toLowerCase())
     
);
  
      const handleCategoryIdChange = (event) => {
        setfilterCategoryId(event.target.value);
    };
  
    const handleCategoryNameChange = (event) => {
        setFilterCategoryName(event.target.value);
    };

    const handleDeleteUser= async (categoriesId)=>{
        console.log(categoriesId);
        try {
            await deleteCategory(categoriesId)
            // const getAllLeadsResponse= await getAllCategory();
            // setCategory(getAllLeadsResponse) 
        } catch (error) {
            throw error;
        }
    }
  
    return (
      <div className=" p-5 h-full overflow-scroll overflow-x-hidden">
        <div className='flex justify-between mb-4'>
        <h1 className=' mb-5 text-3xl font-bold'>Categories</h1>
        <div className="Input element flex gap-10 mb-4">
          <input
            className="outline-none px-2 py-1 text-xl rounded-xl"
            type="text"
            placeholder="Filter by CategoryID"
            value={filterCategoryId}
            onChange={handleCategoryIdChange}
          />
          <input
            className="outline-none px-2 py-1 text-xl rounded-xl"
            type="text"
            placeholder="Filter by Category_name"
            value={filterCategoryName}
            onChange={handleCategoryNameChange}
          />
        </div>
        </div>
        <table className="w-full  rounded-3xl border-black ">
          <thead className="border h-14">
            <tr>
              <th className="border">S.No.</th>
              <th className="border">Categories ID</th>
              <th className="border">Categories_name</th>
              <th className="border">CreatedAt</th>
              <th className="border">UpdatedAt</th>
              <th className="border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category,index) => (
              <tr key={category._id} className="border h-10">
                <td className="border text-center">{index+1}</td>
                <td className="border text-center">{category._id}</td>
                <td className="border text-center">{category.categories_name}</td>
                <td className="border text-center">{category.createdAt}</td>
                <td className="border text-center">{category.updatedAt}</td>
                <td className="border flex justify-center items-center gap-5">
                  <button
                    className="w-32 px-3 py-2 bg-[#1976D2] text-white rounded-lg flex items-center justify-center"
                    onClick={() => handleViewUser(category._id)}
                  >
                    View User
                  </button>
                </td>
                <td className="border flex justify-center items-center gap-5">
                  <button
                    className="w-32 px-3 py-2 bg-[#DE300B] text-white rounded-lg flex items-center justify-center"
                    onClick={() => handleDeleteUser(category._id)}
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default AllCategories
