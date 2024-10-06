import React, { useState } from "react";
import AddRecord from "./AddRecrodform"; // แก้ไขชื่อไฟล์เป็น AddRecordForm
import { FaPlus } from "react-icons/fa"; // ใช้ไอคอนจาก react-icons

const AddButton = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
  
    const toggleForm = () => {
      setIsFormVisible((prev) => !prev);
    };
  
    return (
      <div className="relative">
        {/* Button to open/close the form with an icon */}
        <button
          onClick={toggleForm}
          className="fixed bottom-4 right-4 bg-green-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-green-700 transition-all flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Record
        </button>
  
        {/* Conditionally render the form */}
        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
              <h2 className="text-lg font-semibold mb-4">Add New Record</h2>
              <AddRecord />
              {/* Button to close the form */}
              <button
                onClick={toggleForm}
                className="absolute top-3 right-3 text-red-600 hover:text-red-800 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default AddButton;