import React from 'react';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-4">
            At EventApp, we are dedicated to providing exceptional event management services. Our team of experienced professionals is passionate about creating unforgettable events that leave a lasting impression.
          </p>
          <p className="text-lg mb-4">
            We believe in the power of well-organized and thoughtfully designed events. Whether it's a corporate gathering, a wedding, or a community event, we are here to make it memorable.
          </p>
          <p className="text-lg">
            Our mission is to bring your vision to life and ensure that every detail is executed flawlessly. Thank you for considering EventApp for your event management needs.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
