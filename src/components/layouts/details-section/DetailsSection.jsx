import { useState, useEffect, useContext } from "react";
import "./detailsSection.styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BookData } from "../../../util/BookData";
import { CartContext, UserContext } from "../../../App";

const DetailsSection = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({});

  const user = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    let newData = BookData.filter((book) => book.id === parseInt(id));
    //parseint used because book.id is integer and id is string so === equal gives errror

    setBookData(newData[0]);
  }, []);

  const handleAddToCart = () => {
    if (user) {
      //add to cart
      setCartItems([...cartItems, bookData]);
      alert(`The book ${bookData.book_name} is added to the cart`)
    } else {
      navigate("/login");
      alert("Please Login or SignUp First..");
    }
  };

  return (
    <section className="detail-section-container">
      <div className="container">
        <div className="flex-container">
          <div className="book-img-container">
            <img src={bookData.book_url} alt="book" />
          </div>

          <div className="book-detail-container">
            <h2>{bookData.book_name}</h2>
            <p className="text-primary">{bookData.author_name}</p>
            <p className="book-description">{bookData.book_description}</p>
            <p>
              <b>Language:</b> {bookData.language}
            </p>
            <p>
              <b>Book Length:</b> {bookData.print_length}
            </p>
            <h3>₹{bookData.price}</h3>
            <Link to='/cart' onClick={handleAddToCart} className="button-primary">
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
