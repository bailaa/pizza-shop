import './scss/app.scss'
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {
  Router,
  Route,
  Link,
} from "react-router-dom";
import Cart from './pages/Cart';

function App() {
  return (
    <div id="root">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Router>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Router>
          </div>
          <ul className="Pagination_root__uwB0O">
            <li className="previous disabled">
              <a className=" " tabIndex="-1" role="button" aria-disabled="true" aria-label="Previous page" rel="prev">&lt;</a>
            </li>
            <li className="selected">
              <a rel="canonical" role="button" tabIndex="-1" aria-label="Page 1 is your current page" aria-current="page">1</a>
            </li>
            <li>
              <a rel="next" role="button" tabIndex="0" aria-label="Page 2">2</a>
            </li>
            <li>
              <a role="button" tabIndex="0" aria-label="Page 3">3</a>
            </li>
            <li className="next">
              <a className="" tabIndex="0" role="button" aria-disabled="false" aria-label="Next page" rel="next">&gt;</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
