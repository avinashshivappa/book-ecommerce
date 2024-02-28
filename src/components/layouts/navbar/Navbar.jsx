import { useContext } from "react";
import "./navbar.styles.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import Cart from "../../../assets/books-images/cart.svg";
import { getAuth, signOut } from "firebase/auth";
import app from "../../../firebase/Firebase";

const Navbar = ({ darkTheme, darkText }) => {
  const user = useContext(UserContext);

  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showLoginandSingUp = (
    <nav className="nav-links-container">
      <Link to="/" className={`${darkText ? "nav-links-dark" : "nav-links"}`}>
        Home
      </Link>

      <Link
        to="/books"
        className={`${darkText ? "nav-links-dark" : "nav-links"}`}
      >
        Books
      </Link>

      <Link
        to="/login"
        className={`${darkText ? "nav-links-dark" : "nav-links"}`}
      >
        Login
      </Link>

      <Link
        to="/signup"
        className={`${darkText ? "nav-links-dark" : "nav-links"}`}
      >
        Sign up
      </Link>
    </nav>
  );

  const showLogoutAndCart = (
    <nav className="nav-links-container">
      <Link to="/" className={`${darkText ? "nav-links-dark" : "nav-links"}`}>
        Home
      </Link>

      <Link
        to="/books"
        className={`${darkText ? "nav-links-dark" : "nav-links"}`}
      >
        Books
      </Link>

      <a
        onClick={handleLogout}
        className={`${darkText ? "nav-links-dark" : "nav-links"}`}
      >
        Logout
      </a>
      <Link to="/cart" className="cart-link">
        <img src={Cart} />
      </Link>
    </nav>
  );

  return (
    <section
      className={`navbar-container ${
        darkTheme ? "background-dark relative" : "background-transparent"
      }`}
    >
      <div className="container flex justify-between align-center">
        <a href="#" className="logo">
          Books<span className="text-primary">mart</span>
        </a>
        {user ? showLogoutAndCart : showLoginandSingUp}
      </div>
    </section>
  );
};

export default Navbar;
