import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Dashboard from './components/Dashboard';
import CustomerForm from './components/CustomerForm';
import Cart from './components/Cart';
import Menu from './components/AdminPanel';
import MenuForm from './components/MenuForm';
import CustomerMenu from './components/CustomerMenu';
import AdminLogin from './components/adminLogin';
import UpdateMenuForm from './components/UpdateMenuForm';
import Breakfast from './components/Breakfast';
import Lunch from './components/Lunch';
import Dinner from './components/Dinner';
import Snacks from './components/Snacks';
import VenueForm from './components/VenueForm';
import Summary from './components/Summary';
import { SelectedItemsProvider } from './contexts/SelectedItemsContext';

// Use createRoot to render the React application
const root = createRoot(document.getElementById('root'));

// Render the application inside createRoot
root.render(
  <SelectedItemsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customer-form" element={<CustomerForm />} />
        <Route path="/VenueForm/:customerId" element={<VenueForm />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/customerMenu" element={<CustomerMenu />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/adminPanel" element={<Menu />} />
        <Route path="/UpdateMenuForm/:id" element={<UpdateMenuForm />} />
        <Route path="/menuForm" element={<MenuForm />} />
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/dinner" element={<Dinner />} />
        <Route path="/snacks" element={<Snacks />} />
      </Routes>
    </Router>
  </SelectedItemsProvider>
);
