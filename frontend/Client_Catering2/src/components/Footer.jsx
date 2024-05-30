import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="px-4 py-4"> {/* Reduced padding */}
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="mt-4 grow md:ml-12 md:mt-0">
            <p className="text-base font-semibold text-gray-700">
              © 2024 Annapurna Caters
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
