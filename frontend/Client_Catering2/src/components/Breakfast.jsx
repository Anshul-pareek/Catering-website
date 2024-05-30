import React, { useState, useEffect, useContext } from 'react';
import { getItemsByCategory } from '../utils/ApiFunctions.js';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../css/items.css'; // Import the shared CSS file for styling
import { SelectedItemsContext } from '../contexts/SelectedItemsContext.jsx';

const Breakfast = () => {
  const [breakfastItems, setBreakfastItems] = useState([]);
  const navigate = useNavigate();
  const { addItem, removeItem } = useContext(SelectedItemsContext);
  const [selectedCardIds, setSelectedCardIds] = useState(new Set());

  const handleCardClick = (item) => {
    const newSelectedCardIds = new Set(selectedCardIds);
    if (newSelectedCardIds.has(item.items_id)) {
      newSelectedCardIds.delete(item.items_id);
      removeItem(item.items_id, 'breakfast');
    } else {
      newSelectedCardIds.add(item.items_id);
      addItem(item, 'breakfast');
    }
    setSelectedCardIds(newSelectedCardIds);
  };

  useEffect(() => {
    const fetchBreakfastItems = async () => {
      try {
        const itemsData = await getItemsByCategory(1); // Category ID for breakfast
        if (Array.isArray(itemsData)) {
          setBreakfastItems(itemsData);
        } else {
          console.error('Unexpected response format:', itemsData);
          setBreakfastItems([]);
        }
      } catch (error) {
        console.error('Error fetching breakfast items:', error);
        setBreakfastItems([]);
      }
    };

    fetchBreakfastItems();
  }, []);

  const handleSkip = () => {
    navigate('/lunch');
  };

  const handleNext = () => {
    navigate('/lunch');
  };

  const isAllCardsSelected = () => {
    return selectedCardIds.size === breakfastItems.length;
  };

  return (
    <div className="center-content"> {/* Container for centering content */}
      <Header />
      <div className="container mx-auto mt-4">
        <h1 className="heading">Breakfast Menu</h1>
        <div className={`cards ${isAllCardsSelected() ? 'all-selected' : ''}`}>
          {breakfastItems.map(item => (
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

export default Breakfast;
