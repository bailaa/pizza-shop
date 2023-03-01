import './scss/app.scss'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import { Routes, Route } from "react-router-dom";
import Cart from './pages/Cart';
import { useState } from 'react';
import React from 'react';
import MainLayout from './layouts/MainLayout';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  // рут не в App.js, jsx начинается с враппера
  // и нет стэйта с [searchValue, setSearchValue]
  return (
    <div id="root">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
          </Route>
        </Routes>
      </SearchContext.Provider>
    </div >
  );
}

export default App;
