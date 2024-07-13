import React from "react";

const Footer = () => {
  return (
    <footer className="text-black py-8">
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-slate-950"></hr>
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} EventApp. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <p className="text-gray-400 hover:text-white cursor-default">
            Privacy Policy
          </p>
          <p className="text-gray-400 hover:text-white cursor-default">
            Terms of Service
          </p>
          <p className="text-gray-400 hover:text-white cursor-default">
            Contact Us
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
