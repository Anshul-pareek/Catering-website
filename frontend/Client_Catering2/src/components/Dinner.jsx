import React, { useState, useEffect } from 'react';
import { getItemsByCategory } from '../utils/ApiFunctions.js';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../css/items.css';
import { useSelectedItems } from '../contexts/SelectedItemsContext.jsx';

const Dinner = () => {
  const [dinnerItems, setDinnerItems] = useState([]); // Ensure it's initialized as an array
  const navigate = useNavigate();
  const { addItem, removeItem } = useSelectedItems();
  const [selectedCardIds, setSelectedCardIds] = useState(new Set());

  const handleCardClick = (item) => {
    const newSelectedCardIds = new Set(selectedCardIds);
    if (newSelectedCardIds.has(item.items_id)) {
      newSelectedCardIds.delete(item.items_id);
      removeItem(item.items_id, 'dinner'); // Include category parameter
    } else {
      newSelectedCardIds.add(item.items_id);
      addItem(item, 'dinner'); // Include category parameter
    }
    setSelectedCardIds(newSelectedCardIds);
  };

  const isAllCardsSelected = () => {
    return selectedCardIds.size === dinnerItems.length;
  };

  useEffect(() => {
    const fetchDinnerItems = async () => {
      try {
        const itemsData = await getItemsByCategory(4);
        if (Array.isArray(itemsData)) {
          setDinnerItems(itemsData);
        } else {
          console.error('Unexpected response format:', itemsData);
          setDinnerItems([]); // Set to an empty array if response is unexpected
        }
      } catch (error) {
        console.error('Error fetching dinner items:', error);
        setDinnerItems([]); // Set to an empty array on error
      }
    };

    fetchDinnerItems();
  }, []);

  const handleSkip = () => {
    navigate('/customerMenu');
  };

  const handleNext = () => {
    navigate('/summary');
  };

  return (
    <>
      <Header />
      <div className="center-content">
        <div className="container mx-auto mt-4">
          <h1 className="heading">Dinner Menu</h1>
          <div className={`cards ${isAllCardsSelected() ? 'all-selected' : ''}`}>
            {Array.isArray(dinnerItems) && dinnerItems.map(item => (
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
          <div className="navigation-buttons">
            <button className="skip-button" onClick={handleSkip}>
              Skip
            </button>
            <button className="next-button" onClick={handleNext}>
              Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dinner;
