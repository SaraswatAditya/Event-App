import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShareAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [hostData, setHostData] = useState(null);
  const [image, setImage] = useState(null);
  const [hostUsername, setHostUsername] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data);
        setHostUsername(response.data.createdBy.username);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (hostUsername) {
      const fetchHost = async () => {
        try {
          const response2 = await axios.get(`/api/user/${hostUsername}`);
          setHostData(response2.data);
        } catch (error) {
          console.error("Error fetching host:", error);
        }
      };

      fetchHost();
    }
  }, [hostUsername]);

  useEffect(() => {
    if (event && event.image) {
      setImage(`${import.meta.env.VITE_SERVER_DOMAIN}${event.image}`);
      // console.log("Image is ",image)
    }
  }, [event]);

  const handleShare = () => {
    const eventUrl = window.location.href;
    navigator.clipboard.writeText(eventUrl);
    toast.success("Event link copied to clipboard!");
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const formatEventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const startDateStr = start.toLocaleDateString(undefined, options);
    const startTimeStr = start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endDateStr = end.toLocaleDateString(undefined, options);
    const endTimeStr = end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (startDateStr === endDateStr) {
      return `${startDateStr} ${startTimeStr} to ${endTimeStr}`;
    } else {
      return `${startDateStr} ${startTimeStr} to ${endDateStr} ${endTimeStr}`;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <div className="border-2 mt-2 shadow-2xl rounded-md mb-2">
        <h1 className="ml-2 text-3xl font-bold mb-4 p-1">{event.name}</h1>
        {hostData && (
          <div className="flex items-center mb-5">
            <img
              className="ml-2 w-14 h-14 rounded-full mr-2"
              src={`${import.meta.env.VITE_SERVER_DOMAIN}${hostData.image}`}
              alt={hostData.username}
            />
            <div>
              <p className="text-left">Hosted By</p>
              <p className="text-left font-bold">
                {hostData.firstName || event.createdBy.username}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:space-x-1">
        <div className="flex-1">
          <img
            src={image}
            alt="Event"
            className="h-64 w-full md:w-3/3 hover:scale-105 transition-all duration-500 object-cover rounded-lg border-2 shadow-lg"
          />
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0 bg-gray-100 p-4 rounded-lg hover:shadow-lg">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            <p className="text-gray-600">
              <strong>Location:</strong> {event.location}
            </p>
          </div>
          <div className="flex items-center mb-2">
            <FaClock className="mr-2 text-blue-500" />
            <p className="text-gray-600 text-">
              <strong>When:</strong>{" "}
              {formatEventDate(event.date, event.endDate)}
            </p>
          </div>
          <button
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 mt-4"
            onClick={handleShare}
          >
            <FaShareAlt className="mr-2" /> Share
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
        <h2 className="text-xl font-bold mb-2">Details</h2>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
