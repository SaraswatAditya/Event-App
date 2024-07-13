import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import convertToBase64 from "../helper/convert";
import eventImage from "../assets/Images/12.jpg";
import { FaUpload } from "react-icons/fa";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: "",
      endDate: "",
      location: "",
      image: "",
      category: "",
      tags: "",
      visibility: "public",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Event name is required"),
      description: Yup.string().required("Description is required"),
      date: Yup.date().required("Date is required"),
      endDate: Yup.date().required("End date is required"),
      location: Yup.string().required("Location is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      try {
        values = await Object.assign(values, {
          image: file || "",
        });
        console.log(values);
        const token = localStorage.getItem("token");
        const response = await axios.post("/api/events/create", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(`/events/${response.data.event._id}`);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="relative">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            <img
              src={file || eventImage}
              className="h-40 w-full object-cover rounded-md"
              alt="Event"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md cursor-pointer">
              <FaUpload className="text-white text-2xl" />
            </div>
          </label>
          <input
            onChange={onUpload}
            type="file"
            id="image"
            name="image"
            className="hidden"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="datetime-local"
              name="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm"
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-500 text-sm">{formik.errors.date}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="datetime-local"
              name="endDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
              className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm"
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <div className="text-red-500 text-sm">
                {formik.errors.endDate}
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="text-red-500 text-sm">{formik.errors.location}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="mt-1 block h-8 w-full rounded-md border-gray-300 shadow-sm"
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tags}
            className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Visibility
          </label>
          <select
            name="visibility"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.visibility}
            className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
