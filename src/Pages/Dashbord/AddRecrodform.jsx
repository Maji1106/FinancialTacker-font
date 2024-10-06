import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useFinancialRecords } from "../../contexts/financial.context";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddRecord = () => {
  const [financial, setFinancial] = useState({
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: "",
    paymentMethod: "",
  });

  const navigate = useNavigate();
  const { user } = useUser();
  const { AddRecord } = useFinancialRecords();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancial((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !financial.category ||
      !financial.date ||
      !financial.amount ||
      !financial.paymentMethod ||
      !financial.description
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill out all required fields",
        icon: "error",
      });
      return;
    }

    const record = { ...financial, userID: user.id };

    try {
      const response = await AddRecord(record);

      if (response && (response.status === 200 || response.status === 201)) {
        Swal.fire({
          title: "Success",
          text: "Record added successfully",
          icon: "success",
        }).then(() => {
          navigate("/"); // Redirect to home
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to add record. Please try again later.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the record. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto bg-gradient-to-r from-indigo-200 to-purple-200 shadow-lg rounded-lg mt-20">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900">
        Add Financial Record
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category of Entry */}
        <div className="form-group">
          <label className="block text-gray-800 font-medium mb-2">Category</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="category"
            value={financial.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label className="block text-gray-800 font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={financial.date}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="block text-gray-800 font-medium mb-2">Description</label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter description"
            value={financial.description}
            onChange={handleChange}
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label className="block text-gray-800 font-medium mb-2">Amount</label>
          <input
            type="number"
            step="0.01"
            name="amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter amount"
            value={financial.amount}
            onChange={handleChange}
          />
        </div>

        {/* Payment Method */}
        <div className="form-group">
          <label className="block text-gray-800 font-medium mb-2">Payment Method</label>
          <select
            name="paymentMethod"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={financial.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="form-group mt-8">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors shadow-md"
          >
            Save Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecord;
