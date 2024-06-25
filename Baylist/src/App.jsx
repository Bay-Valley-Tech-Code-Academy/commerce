import './App.css'

//router
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import Login from './routes/login';
import Account from './routes/account';
import Notifications from './routes/notifications';
import Cart from './routes/cart';
import Search from './routes/search';
import Signup from './routes/signup';
import Favorites from './routes/favorites';
import Checkout from './routes/checkout';
import ProductDetail from './routes/product';
import UserPage from './routes/user';
import SellerDashboard from './routes/sellerdashboard';
import NotFound from './routes/notfound';
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Define your routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer/>
      </div>
  );
}
export default App
