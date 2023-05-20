import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <p className="text-white text-sm md:text-base">&copy; 2023 Your Company. All rights reserved.</p>
              <p className="text-gray-300 text-sm md:text-base mx-3">|</p>
              <p className="text-gray-300 text-sm md:text-base">Powered by <span className="text-white">Your Company</span></p>
            </div>
          </div>
        </footer>
      );
}

export default Footer
