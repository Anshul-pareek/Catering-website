import React, { useState, useEffect, useContext } from 'react';
import { getItemsByCategory } from '../utils/ApiFunctions.js';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../css/items.css'; // Import the shared CSS file for styling
import { SelectedItemsContext } from '../contexts/SelectedItemsContext.jsx';

const Lunch = () => {
  const [lunchItems, setLunchItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const { addItem, removeItem } = useContext(SelectedItemsContext); // Use context to add/remove items
  const [selectedCardIds, setSelectedCardIds] = useState(new Set()); // Track selected card IDs

  const handleCardClick = (item) => {
    const newSelectedCardIds = new Set(selectedCardIds); // Create a copy
    if (newSelectedCardIds.has(item.items_id)) {
      newSelectedCardIds.delete(item.items_id); // Deselect if already selected
      removeItem(item.items_id, 'lunch'); // Remove item from context
    } else {
      newSelectedCardIds.add(item.items_id); // Select if not already selected
      addItem(item, 'lunch'); // Add item to context
    }
    setSelectedCardIds(newSelectedCardIds);
  };

  const isAllCardsSelected = () => {
    return selectedCardIds.size === lunchItems.length; // Check if all cards are selected
  };

  useEffect(() => {
    const fetchLunchItems = async () => {
      try {
        const itemsData = await getItemsByCategory(2); // Category ID for lunch
        if (Array.isArray(itemsData)) {
          setLunchItems(itemsData);
        } else {
          console.error('Unexpected response format:', itemsData);
          setLunchItems([]);
        }
      } catch (error) {
        console.error('Error fetching lunch items:', error);
        setLunchItems([]);
      }
    };

    fetchLunchItems();
  }, []);

  const handleSkip = () => {
    navigate('/snacks'); // Redirect to /snacks route
  };

  const handleNext = () => {
    navigate('/snacks'); // Redirect to /snacks route
  };

  return (
    <div className="center-content"> {/* Container for centering content */}
      <Header />
      <div className="container mx-auto mt-4">
        <h1 className="heading">Lunch Menu</h1>
        <div className={`cards ${isAllCardsSelected() ? 'all-selected' : ''}`}>
          {lunchItems.map(item => (
            <div
              key={item.items_id}
              className={`card ${selectedCardIds.has(item.items_id) ? 'selected' : ''}`}
              onClick={() => handleCardClick(item)}
            >
              <div className="information">
                <div className="tag">Item ID: {item.items_id}</div>
                <h2 className="title">{item.itemName}</h2>
                {/* <p className="info">{item.itemDescription}</p> */}
              </div>
            </div>
          ))}
        </div>
        {/* Skip and Next Buttons */}
        <div className="navigation-buttons">
          <button className="skip-button" onClick={handleSkip}>
            Skip
          </button>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lunch;
