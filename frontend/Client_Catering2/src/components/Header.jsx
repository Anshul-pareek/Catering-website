import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    name: 'AdminPanel',
    to: '/AdminLogin',
  },
  {
    name: 'Menu',
    to: '/customer-form',
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      <nav className={`navbar bg-gradient-to-b from-black to-black py-4 fixed top-0 left-0 w-full text-white ${isMenuOpen ? 'mask' : ''}`} style={{ zIndex: 1000 }}>
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div className="inline-flex items-center space-x-2">
            <Link to="/" className="app__navbar-logo">
              <span className="font-bold">Annapoorna Caters</span>
            </Link>
          </div>
          <div className="hidden lg:block app__navbar-links">
            <ul className="inline-flex space-x-8 list">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.to} className="app__navbar-links-link">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="menu" />
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden app__navbar-smallscreen_overlay">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2">
                  <span>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 50 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Your SVG path here */}
                    </svg>
                  </span>
                  <span className="font-bold">DevUI</span>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-4 app__navbar-smallscreen_links">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="app__navbar-smallscreen_links-link"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Button text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
