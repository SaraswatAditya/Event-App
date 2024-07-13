import React from 'react';
import Footer from './Footer';

const Services = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-2">Event Planning</h3>
              <p className="text-gray-700">Comprehensive event planning services to ensure your event is a success.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-2">Venue Selection</h3>
              <p className="text-gray-700">We help you find the perfect venue for your event.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-2">Catering Services</h3>
              <p className="text-gray-700">Delicious catering options tailored to your event’s needs.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
