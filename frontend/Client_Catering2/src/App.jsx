import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SelectedItemsProvider } from './contexts/SelectedItemsContext';
import { SessionProvider } from './contexts/SessionContext';
import CustomerMenu from './components/CustomerMenu'; // Ensure this import is correct
import Breakfast from './components/Breakfast';
import Lunch from './components/Lunch';
import Dinner from './components/Dinner';
import Snacks from './components/Snacks';
import Summary from './components/Summary';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <SessionProvider>
      <SelectedItemsProvider>
        <Router>
          <Header />
          <div className="container mx-auto mt-4">
            <Routes>
              <Route path="/" element={<CustomerMenu />} />
              <Route path="/breakfast" element={<Breakfast />} />
              <Route path="/lunch" element={<Lunch />} />
              <Route path="/dinner" element={<Dinner />} />
              <Route path="/snacks" element={<Snacks />} />
              <Route path="/orderSum" element={<Summary />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </SelectedItemsProvider>
    </SessionProvider>
  );
}

export default App;
