import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

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
        console.log("Event detail is ", response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-600 mb-2">
        {new Date(event.date).toLocaleString()} -{" "}
        {new Date(event.endDate).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-2">{event.location}</p>
      <p className="text-gray-600 mb-2">Category: {event.category}</p>
      <p className="text-gray-600 mb-2">Tags: {event.tags.join(", ")}</p>
      <p className="text-gray-600 mb-2">Visibility: {event.visibility}</p>
      {event.image && (
        <img src={event.image} alt={event.name} className="mt-4 rounded-lg" />
      )}
    </div>
  );
}

export default EventDetail;
