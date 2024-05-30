import React, { useState } from 'react';

const Form = ({ onClose, selectedItems }) => {
  const [formData, setFormData] = useState({
    // Add your form fields here (e.g., name, email, additional notes)
    name: '',
    email: '',
    notes: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Process the form data here (e.g., submit to server, display confirmation)
    console.log('Form submitted:', formData);

    // Optionally, close the form after submission
    onClose();
  };

  return (
    <div className="form-container">
      <h2>Additional Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields here */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="notes">Additional Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Form;
