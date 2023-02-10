import './scss/app.scss'
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {
  Routes,
  Route
} from "react-router-dom";
import Cart from './pages/Cart';
import { useState } from 'react';
import React from 'react';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div id="root">
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
