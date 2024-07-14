import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white mt-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Quizzz. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://www.facebook.com" className="text-blue-500">
            Facebook
          </a>
          <a href="https://www.twitter.com" className="text-blue-400">
            Twitter
          </a>
          <a href="https://www.instagram.com" className="text-pink-600">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
