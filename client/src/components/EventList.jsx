import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
        console.log("Events are ", response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-gray-600">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">{event.location}</p>
            <Link to={`/events/${event._id}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
