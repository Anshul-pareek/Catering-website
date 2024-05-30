import React, { useState } from 'react';
import { createMenuItem } from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function MenuForm() {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    category: [], // Changed from 'options' to 'category'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;
    if (type === 'checkbox') {
      const newCategory = [...formData.category];
      if (checked) {
        newCategory.push(value);
      } else {
        const index = newCategory.indexOf(value);
        if (index !== -1) {
          newCategory.splice(index, 1);
        }
      }
      newValue = newCategory;
    } else {
      newValue = value;
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createMenuItem(formData.itemName, formData.itemDescription, formData.category);
      console.log('Menu item created:', response);
      setFormData({
        itemName: '',
        itemDescription: '',
        category: [],
      });
      navigate('/adminPanel');
    } catch (error) {
      console.error('Error creating menu item:', error);
    }
  };

  return (
    <>
      <Header />
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Enter Menu Item Details
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="itemName" className="text-base font-medium text-gray-900">
                    Item Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Item Name"
                      id="itemName"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="itemDescription" className="text-base font-medium text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Description"
                      id="itemDescription"
                      name="itemDescription"
                      value={formData.itemDescription}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-base font-medium text-gray-900">Category</label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        name="category"
                        value="1"
                        onChange={handleChange}
                      />
                      <span className="ml-2 text-sm text-gray-700">Breakfast</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        name="category"
                        value="2"
                        onChange={handleChange}
                      />
                      <span className="ml-2 text-sm text-gray-700">Lunch</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        name="category"
                        value="3"
                        onChange={handleChange}
                      />
                      <span className="ml-2 text-sm text-gray-700">Snacks</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        name="category"
                        value="4"
                        onChange={handleChange}
                      />
                      <span className="ml-2 text-sm text-gray-700">Dinner</span>
                    </label>
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
      <Footer />
    </>
  );
}
