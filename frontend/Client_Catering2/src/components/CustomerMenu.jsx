import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import '../css/Category.css'; 

const CustomerMenu = () => {
  return (
    <>
      <Header />
      <div className="cards-container-menu">
        {/* Card 1: Breakfast */}
        <div className="card-menu">
          <div className="information-menu">
            <div className="tag-menu">Breakfast</div>
            <h2 className="title-menu">Start Your Day Right</h2>
            <p className="info-menu"></p>
            <Link to="/breakfast" className="button-menu">View Details</Link>
          </div>
        </div>

        {/* Card 2: Lunch */}
        <div className="card-menu">
          <div className="information-menu">
            <div className="tag-menu">Lunch</div>
            <h2 className="title-menu">Midday Delights</h2>
            <p className="info-menu"></p>
            <Link to="/lunch" className="button-menu">View Details</Link>
          </div>
        </div>

        {/* Card 3: Snacks */}
        <div className="card-menu">
          <div className="information-menu">
            <div className="tag-menu">Snacks</div>
            <h2 className="title-menu">Quick Bites</h2>
            <p className="info-menu"></p>
            <Link to="/snacks" className="button-menu">View Details</Link>
          </div>
        </div>

        {/* Card 4: Dinner */}
        <div className="card-menu">
          <div className="information-menu">
            <div className="tag-menu">Dinner</div>
            <h2 className="title-menu">Evening Feasts</h2>
            <p className="info-menu"></p>
            <Link to="/dinner" className="button-menu">View Details</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerMenu;
