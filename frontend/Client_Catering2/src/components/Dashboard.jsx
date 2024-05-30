import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import image from '../assets/image.jpg';

export default function Dashboard() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white overflow-hidden">
      <Header />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 lg:py-24 lg:px-8 h-full flex flex-col justify-between my-custom-margin">
        <div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
                Welcome
              </h1>
              <p className="mt-6 text-lg text-gray-800">
                Your ultimate destination for exceptional catering services.
              </p>
              <Link to="/customer-form" className="mt-8 inline-block py-3 px-6 text-lg font-semibold leading-normal text-white bg-black rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Order Now
              </Link>
            </div>
            <div className="relative">
              <div className="image-container">
                <img
                  className="object-cover w-full h-full"
                  src={image}
                  alt="Catering Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
