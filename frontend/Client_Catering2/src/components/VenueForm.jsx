// VenueForm.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../css/VenueForm.css";
import Footer from './Footer';
import Header from './Header';
import { createVenues } from '../utils/ApiFunctions'; // Import the function

export default function VenueForm() {
  const { customerId } = useParams(); 
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Breakfast' },
    { id: 2, name: 'Lunch' },
    { id: 3, name: 'Snacks' },
    { id: 4, name: 'Dinner' }
  ];

  const initialFormData = categories.reduce((acc, category) => {
    acc[category.id] = {
      venue: '',
      occasion: '',
      functionDate: '',
      numberOfPersons: ''
    };
    return acc;
  }, {});

  const [venueFormData, setVenueFormData] = useState(initialFormData);

  const handleChange = (e, categoryId) => {
    const { name, value } = e.target;
    setVenueFormData((prevFormData) => ({
      ...prevFormData,    
      [categoryId]: {
        ...prevFormData[categoryId],
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const venueData = categories.reduce((acc, category) => {
        const formData = venueFormData[category.id];
        if (formData.venue !== '' || formData.occasion !== '' || formData.functionDate !== '' || formData.numberOfPersons !== '') {
          acc.push({
            ...formData,
            categoryId: category.id
          });
        }
        return acc;
      }, []);
  
      const response = await createVenues(customerId, venueData);
      console.log('Venue created:', response);
  
      setVenueFormData(initialFormData);
      navigate('/customerMenu', { state: { venueDetails: venueData } }); // Pass venue details as state
    } catch (error) {
      console.error('Error creating venue:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="center-container">
        <div className="venue-form-container">
          <h2 className="form-heading">Venue Form</h2>
          <form onSubmit={handleSubmit} className="venue-form">
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
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>
                      <input
                        type="text"
                        name="venue"
                        value={venueFormData[category.id].venue}
                        onChange={(e) => handleChange(e, category.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="occasion"
                        value={venueFormData[category.id].occasion}
                        onChange={(e) => handleChange(e, category.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="functionDate"
                        value={venueFormData[category.id].functionDate}
                        onChange={(e) => handleChange(e, category.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="numberOfPersons"
                        value={venueFormData[category.id].numberOfPersons}
                        onChange={(e) => handleChange(e, category.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
