import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaEllipsisV } from 'react-icons/fa';

const UserDashboard = () => {
  const [events, setEvents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { apiData } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/events/user/${apiData?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
        // console.log('Events are ', response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (window.confirm(`Are you sure you want to delete this event?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/events/delete/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(events.filter(event => event._id !== eventId));
        navigate('/events');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const toggleDropdown = (eventId) => {
    setDropdownOpen(dropdownOpen === eventId ? null : eventId);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    const [month, day] = formattedDate.split(' ');
    return { month: month.toUpperCase(), day };
  };

  const formatDateTime = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZoneName: 'short' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const checkStatus = (date) => {
    return new Date(date) > new Date() ? 'Upcoming' : 'Past Event';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hello, {apiData?.username}</h1>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">My Events</h1>
        <Link
          to="/events/create"
          className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-lg hover:bg-blue-700 transition-all duration-500"
        >
          Create Event
        </Link>
      </div>
      {events.length === 0 ? (
        <p>You have not created any events yet.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg ">
          <thead className="bg-slate-200 rounded-lg shadow-sm">
            <tr>
              <th className="w-2/3 py-3 px-4 text-left">Event</th>
              <th className="w-1/6 py-3 px-4 text-center">Status</th>
              <th className="w-1/6 py-3 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const { month, day } = formatDate(event.date);
              return (
                <tr key={event._id} className="border-b hover:shadow-md transition-all duration-500">
                  <td className="py-3 px-4 ">
                    <div className="flex items-center">
                      <div className="mr-10 text-center">
                        <div className="text-lg font-bold text-rose-600">{month}</div>
                        <div className="text-2xl font-bold">{day}</div>
                      </div>
                      <div className="mr-10 hover:shadow-xl ">
                        <img src={event.image} alt={event.name} className="w-20 h-20 object-cover" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">{event.name}</h2>
                        <p>{event.location}</p>
                        <p>{formatDateTime(event.date)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">{checkStatus(event.date)}</td>
                  <td className="py-3 px-4 text-right static">
                    {dropdownOpen !== event._id ? (<button 
                      className="focus:outline-none rounded-full p-5 hover:shadow-md hover:bg-slate-100"
                      onClick={() => toggleDropdown(event._id)}
                    >
                      <FaEllipsisV />
                    </button>):(
                      <div ref={dropdownRef} className="absolute right-15 w-40 bg-white border rounded shadow-lg">
                        <Link to={`/events/update/${event._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                          Edit
                        </Link>
                        <Link to={`/events/${event._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="block w-full text-right px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <hr className="w-8 h-8 mx-auto my-8 bg-gray-200 border-0 rounded md:my-12 dark:bg-neutral-950"></hr>
    </div>
  );
};

export default UserDashboard;
