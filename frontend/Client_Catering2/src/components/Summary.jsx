// Summary.jsx

import React, { useState } from 'react';
import { useSelectedItems } from '../contexts/SelectedItemsContext';
import Header from './Header';
import '../css/Summary.css';
import { sendToMail } from '../utils/ApiFunctions.js';

const Summary = () => {
  const { selectedItems, removeItem, customerDetails, venueDetails } = useSelectedItems();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSendToMail = async () => {
    const htmlContent = generateHtml(selectedItems, customerDetails, venueDetails);
    try {
      await sendToMail(email, htmlContent);
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailSent(false);
    }
  };

  const generateHtml = (selectedItems, customerDetails, venueDetails) => {
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Order Summary</h1>
        <div>
          <h1>Customer Details</h1>
    `;
    // Check if customerDetails is defined
    if (customerDetails) {
      htmlContent += `
        <p>Name: ${customerDetails.customerName}</p>
        <p>Phone: ${customerDetails.customerPhone}</p><br>
      `;
    }
    htmlContent += `</div>`;

    // Include venue details
    if (venueDetails && venueDetails.length > 0) {
      htmlContent += `<h2>Venue Details</h2>`;
      htmlContent += `<table>`;
      htmlContent += `
        <tr>
          <th>Category</th>
          <th>Venue</th>
          <th>Occasion</th>
          <th>Function Date</th>
          <th>Number of Persons</th>
        </tr>
      `;
      venueDetails.forEach((venue) => {
        htmlContent += `
          <tr>
            <td>${venue.categoryId}</td>
            <td>${venue.venue}</td>
            <td>${venue.occasion}</td>
            <td>${venue.functionDate}</td>
            <td>${venue.numberOfPersons}</td>
          </tr>
        `;
      });
      htmlContent += `</table>`;
    }

    const categories = ['breakfast', 'lunch', 'dinner', 'snacks'];

    categories.forEach(category => {
      htmlContent += `<h2>${capitalize(category)}</h2>`;
      htmlContent += `<table>`;
      htmlContent += `
        <tr>
          <th>Item Name</th>
          <th>Description</th>
        </tr>
      `;

      const items = selectedItems[category] || [];
      items.forEach(item => {
        htmlContent += `
          <tr>
            <td>${item.itemName}</td>
            <td>${item.itemDescription}</td>
          </tr>
        `;
      });

      htmlContent += `</table>`;
    });

    htmlContent += `
        </body>
        </html>
      `;

    return htmlContent;
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      <Header />
      <div className="container-summary mx-auto mt-4">
        <div className="email-section">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendToMail}>Send to Mail</button>
          {emailSent && <p>Email sent!</p>}
        </div>
        <div className="customer-details">
          <h2>Customer Details</h2>
          {customerDetails && (
            <div>
              <p>Name: {customerDetails.customerName}</p>
              <p>Phone: {customerDetails.customerPhone}</p>
            </div>
          )}
        </div>
        <div className="venue-details">
         
          {venueDetails && venueDetails.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Venue</th>
                  <th>Occasion</th>
                  <th>Function Date</th>
                  <th>Number of Persons</th>
                </tr>
              </thead>
              <tbody>
                {venueDetails.map((venue, index) => (
                  <tr key={index}>
                    <td>{venue.categoryId}</td>
                    <td>{venue.venue}</td>
                    <td>{venue.occasion}</td>
                    <td>{venue.functionDate}</td>
                    <td>{venue.numberOfPersons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {Object.keys(selectedItems).map((category) => (
          <div key={category} className="category-summary">
            <h2>{capitalize(category)}</h2>
            <ul>
              {[...selectedItems[category]].map(item => (
                <li key={item.items_id} className="item">
                  <div className="item-details">
                    <span>{item.itemName} - {item.itemDescription}</span>
                    <button
                      className="remove-button"
                      onClick={() => removeItem(item.items_id, category)}
                    >
                      &times;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Summary;
