import React, { useState } from 'react';
import { createCustomer } from '../utils/ApiFunctions'; // Import createCustomer
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../css/Form.css'; // Import your CSS
import { useSelectedItems } from '../contexts/SelectedItemsContext'; // Import useSelectedItems

export default function CustomerForm() {
  const [customer, setCustomer] = useState({
    customerName: '',
    customerPhone: '',
  });

  const navigate = useNavigate();
  const { setCustomer: setSelectedCustomer } = useSelectedItems(); // Destructure setCustomer from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCustomer(customer);
      const customerId = response.customer_id; // Assuming API returns customerId
      console.log('Customer created:', response);
      console.log('id', customerId)
      setSelectedCustomer(customer); // Set customer details in context
      navigate(`/VenueForm/${customerId}`); // Redirect to VenueForm with customerId
    } catch (error) {
      console.error('Error creating customer:', error);
      // Handle errors (display error message to user)
    }
  };

  return (
    <>
      <Header />
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Enter your Details
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="customerName" className="form-label">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      className={`form-input oval-border`}
                      type="text"
                      placeholder="Full Name"
                      id="customerName"
                      name="customerName"
                      value={customer.customerName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="customerPhone" className="form-label">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      className={`form-input oval-border`}
                      type="text"
                      placeholder="Phone Number"
                      id="customerPhone"
                      name="customerPhone"
                      value={customer.customerPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
