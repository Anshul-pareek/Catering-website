// SelectedItemsContext.js

import React, { createContext, useContext, useState } from 'react';

// Create the context
const SelectedItemsContext = createContext();

// Custom hook to use the SelectedItemsContext
export const useSelectedItems = () => useContext(SelectedItemsContext);

// Provider component
export const SelectedItemsProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState({
    breakfast: new Set(),
    lunch: new Set(),
    dinner: new Set(),
    snacks: new Set(),
  });
  const [customerDetails, setCustomerDetails] = useState({});
  const [venueDetails, setVenueDetails] = useState([]);

  // Function to add an item by category
  const addItem = (item, category) => {
    setSelectedItems((prevItems) => {
      const newItems = { ...prevItems };
      newItems[category].add(item);
      return newItems;
    });
  };

  // Function to remove an item by item ID and category
  const removeItem = (itemId, category) => {
    setSelectedItems((prevItems) => {
      const newItems = { ...prevItems };
      newItems[category] = new Set([...newItems[category]].filter(item => item.items_id !== itemId));
      return newItems;
    });
  };

  // Function to clear all items
  const clearItems = () => {
    setSelectedItems({
      breakfast: new Set(),
      lunch: new Set(),
      dinner: new Set(),
      snacks: new Set(),
    });
  };

  // Function to set customer details
  const setCustomer = (details) => {
    setCustomerDetails(details);
  };

  // Function to set venue details
  const setVenue = (details) => {
    setVenueDetails(details);
  };

  return (
    <SelectedItemsContext.Provider value={{ 
      selectedItems, 
      addItem, 
      removeItem, 
      clearItems, 
      customerDetails, 
      setCustomer, 
      venueDetails, 
      setVenue 
    }}>
      {children}
    </SelectedItemsContext.Provider>
  );
};

export { SelectedItemsContext }; // Export the context
