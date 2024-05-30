import React, { useState, useEffect } from 'react';
import { getItemsByCategory } from '../utils/ApiFunctions.js';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useSelectedItems } from '../contexts/SelectedItemsContext.jsx';
import '../css/items.css';

const Snacks = () => {
  const [snacksItems, setSnacksItems] = useState([]);
  const navigate = useNavigate();
  const { addItem, removeItem } = useSelectedItems();
  const [selectedCardIds, setSelectedCardIds] = useState(new Set());

  const handleCardClick = (item) => {
    const newSelectedCardIds = new Set(selectedCardIds);
    if (newSelectedCardIds.has(item.items_id)) {
      newSelectedCardIds.delete(item.items_id);
      removeItem(item.items_id, 'snacks');
    } else {
      newSelectedCardIds.add(item.items_id);
      addItem(item, 'snacks');
    }
    setSelectedCardIds(newSelectedCardIds);
  };

  const isAllCardsSelected = () => {
    return selectedCardIds.size === snacksItems.length;
  };

  useEffect(() => {
    const fetchSnacksItems = async () => {
      try {
        const itemsData = await getItemsByCategory(3);
        if (Array.isArray(itemsData)) {
          setSnacksItems(itemsData);
        } else {
          console.error('Unexpected response format:', itemsData);
          setSnacksItems([]);
        }
      } catch (error) {
        console.error('Error fetching snacks items:', error);
        setSnacksItems([]);
      }
    };

    fetchSnacksItems();
  }, []);

  const handleSkip = () => {
    navigate('/dinner'); // Change route to lunch
  };

  const handleNext = () => {
    navigate('/dinner'); // Change route to lunch
  };

  return (
    <div className="center-content">
      <Header />
      <div className="container mx-auto mt-4">
        <h1 className="heading">Snacks Menu</h1>
        <div className={`cards ${isAllCardsSelected() ? 'all-selected' : ''}`}>
          {snacksItems.map(item => (
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snacks;
