import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Cart = ({ cartItems, setCartItems }) => {
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.items_id !== itemId);
    setCartItems(updatedCart);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Cart</h2>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.items_id}>
                  <td>{item.items_id}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemDescription}</td>
                  <td>{item.category}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.items_id)}>
                      Remove
                    </button>
                    {/* You can replace this with an Edit button with a similar onClick handler */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No items in cart</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
