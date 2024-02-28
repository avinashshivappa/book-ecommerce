import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import app from "./firebase/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import HomePage from "./pages/homepage/HomePage";
import BooksPage from "./pages/bookspage/BooksPage";
import CartPage from "./pages/cartpage/CartPage";
import BookDetailsPage from "./pages/bookdetailspage/BookDetails";
import SignUp from "./pages/signup-page/SignUp";
import Login from "./pages/loginpage/Login";
import ScrollToTop from "./components/util/ScrollToTop";
import SearchPage from "./pages/searchpage/SearchPage";

export const UserContext = createContext({});
export const CartContext = createContext({});

const App = () => {
  const auth = getAuth(app);

  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //

      if (user) {
        setAuthenticatedUser(user);
      } else {
        setAuthenticatedUser(null);
      }
    });
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total = total + parseInt(item.price);
    });
    setTotalAmount(total);
  }, [cartItems]);

  return (
    <ScrollToTop>
      <UserContext.Provider value={authenticatedUser}>
        <CartContext.Provider value={{ cartItems, totalAmount, setCartItems }}>
          <Routes>
            {/*Static route */}
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/* Dynamic route = it takes id */}
            <Route path="/book-details/:id" element={<BookDetailsPage />} />
          </Routes>
        </CartContext.Provider>
      </UserContext.Provider>
    </ScrollToTop>
  );
};

export default App;
