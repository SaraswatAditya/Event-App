import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaCheckCircle } from "react-icons/fa";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import Footer from "./Footer";
import { useSelector } from "react-redux";

// Component for the 3D model with animation
const ExhibitionBooth = () => {
  const group = useRef();
  const { scene, animations } = useGLTF("exhibition-booth-model.glb"); // Ensure to replace with the actual path to your model
  const { actions } = useAnimations(animations, group);

  useFrame(() => {
    if (actions) {
      actions["Animation"].play(); // Replace with the name of the animation
    }
  });

  return <primitive object={scene} ref={group} scale={[2.5, 2.5, 2.5]} />;
};

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.auth.active);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to EventApp</h1>
          <p className="text-xl mb-8">
            Discover, manage, and enjoy events with ease
          </p>
          {isAuthenticated ? (
            <Link
              to="/events"
              className="bg-yellow-400 text-blue-700 py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-500"
            >
              Browse Events
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-blue-700 py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-500"
            >
              Browse Events
            </Link>
          )}
        </div>
      </section>

      {/* 3D Section with Quote */}
      <section className="py-5 flex flex-col md:flex-row items-center justify-center">
        <div className="container mx-auto text-center md:text-left md:w-1/2">
          <Canvas style={{ height: "400px", width: "100%" }}>
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <ExhibitionBooth />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="container mx-auto text-center md:text-left md:w-1/2 p-6">
          <h2 className="text-3xl font-bold mb-4">
            "Creating moments that matter, one event at a time."
          </h2>
          <p className="text-xl">
            Join us to experience events like never before. Let's make your
            moments unforgettable!
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <FaCalendarAlt className="text-blue-700 text-5xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Manage Events</h3>
                <p className="text-gray-700">
                  Easily create and manage events with our intuitive platform.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <FaUsers className="text-blue-700 text-5xl mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Connect with Attendees
                </h3>
                <p className="text-gray-700">
                  Engage with your audience and build a community.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <FaCheckCircle className="text-blue-700 text-5xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Seamless Experience</h3>
                <p className="text-gray-700">
                  Enjoy a seamless and hassle-free event experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Upcoming Events
          </h2>
          <div className="flex flex-wrap -mx-4">
            {/* Sample Event Card */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Event"
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Event Name</h3>
                <p className="text-gray-700 mb-4">
                  Brief description of the event goes here.
                </p>
                <Link
                  to="/event/1"
                  className="bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-800"
                >
                  View Details
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Event"
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Event Name</h3>
                <p className="text-gray-700 mb-4">
                  Brief description of the event goes here.
                </p>
                <Link
                  to="/event/1"
                  className="bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-800"
                >
                  View Details
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Event"
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Event Name</h3>
                <p className="text-gray-700 mb-4">
                  Brief description of the event goes here.
                </p>
                <Link
                  to="/events/"
                  className="bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-800"
                >
                  View Details
                </Link>
              </div>
            </div>
            {/* Repeat Event Card for more events */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Create your first event today and start connecting with attendees!
          </p>
          {isAuthenticated ? (
            <Link
              to="/events/create"
              className="bg-yellow-400 text-blue-700 py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-500"
            >
              Create Event
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-blue-700 py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-500"
            >
              Browse Events
            </Link>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default HomePage;
