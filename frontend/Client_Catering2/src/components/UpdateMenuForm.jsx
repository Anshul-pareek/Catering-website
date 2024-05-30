// UpdateMenu.jsx
import React, { useState, useEffect } from 'react';
import { updateItem, getItemByIds } from '../utils/ApiFunctions';
import { useLocation,useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function UpdateMenu() {
  const { id: itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const itemData = location.state.itemData || {};

  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    categoryIds: [],
  });

  useEffect(() => {
    if (itemId) {
      fetchItemData(itemId);
    }
  }, [itemId]);

  const fetchItemData = async (itemId) => {
    try {
      const itemData = await getItemByIds(itemId);
      setFormData({
        itemName: itemData.itemName || '',
        itemDescription: itemData.itemDescription || '',
        categoryIds: itemData.categoryIds || [],
      });
      
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;
    if (type === 'checkbox') {
      const newCategoryIds = [...formData.categoryIds];
      if (checked) {
        newCategoryIds.push(value);
      } else {
        const index = newCategoryIds.indexOf(value);
        if (index !== -1) {
          newCategoryIds.splice(index, 1);
        }
      }
      newValue = newCategoryIds;
    } else {
      newValue = value;
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem(itemId, formData); // Pass formData as the second argument
      console.log('Menu item updated successfully');
      navigate('/adminPanel');
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };
  

  return (
    <>
      <Header />
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Update Menu Item
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="itemName" className="text-base font-medium text-gray-900">
                    Item Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="itemName"
                      name="itemName"
                      placeholder={itemData.itemName}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="itemDescription" className="text-base font-medium text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="itemDescription"
                      name="itemDescription"
                      placeholder={itemData.itemDescription}
                      onChange={handleChange}
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                        name="categoryIds"
                        value="1"
                        checked={formData.categoryIds.includes('1')}
                        onChange={handleChange}
                      />
                      <span className="ml-2 text-sm text-gray-700">Breakfast</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        name="categoryIds"
                        value="2"
                        checked={formData.categoryIds.includes('2')}
                        onChange={handleChange}
                      />
                      <span className="ml-2 text-sm text-gray-700">Lunch</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        name="categoryIds"
                        value="3"
                        checked={formData.categoryIds.includes('3')}
                        onChange={handleChange}
                      />
                      <span className="ml-2 text-sm text-gray-700">Snacks</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        name="categoryIds"
                        value="4"
                        checked={formData.categoryIds.includes('4')}
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
                    Update
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
