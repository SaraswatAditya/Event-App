import React from 'react';
import Footer from './Footer';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="text-center mt-8">
          <p className="text-lg">
            Reach us directly at <a href="mailto:adityasaraswat.dev@gmail.com" className="text-blue-700 hover:underline">adityasaraswat.dev@gmail.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
