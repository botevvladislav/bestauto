import React from 'react';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import { Route, Routes } from 'react-router-dom';
import AutopartsPage from './pages/AutopartsPage';
import LeasingPage from './pages/LeasingPage';
import WarrantyPage from './pages/WarrantyPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import EditCarsPage from './pages/EditCarsPage';
import { auth } from './firebase-config';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/autoparts" element={<AutopartsPage />} />
        <Route path="/leasing" element={<LeasingPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/admin" element={<LoginPage />} />
        <Route
          path="/edit-cars"
          element={<EditCarsPage />}
          guard={(props) => {
            if (auth.currentUser) {
              return true;
            } else {
              return false;
            }
          }}
        />
      </Routes>
  );
}

export default App;