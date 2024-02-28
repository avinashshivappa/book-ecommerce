import React, { useContext } from "react";
import "./cart-items-container.styles.css";
import CartItemCard from "../../cards/cart-item-card/CartItemCard";
import { CartContext } from "../../../App";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

const CartItemsContainer = () => {
  const { cartItems, totalAmount } = useContext(CartContext);
  const stripeKey =
    "pk_test_51OneNBSHOETjbeJuqpXc7uBQAIRiQcpQEfbybvVUU1wVUu2AXkZ64IxKYnJaN1rYPqDUE0b1Wzy8WjIVuedpi45F00kQr9cA20";
  const navigate = useNavigate();

  const onToken = (token) => {
    console.log(token);
    alert("Your Payment has been processed");
    navigate("/books");
    //to remove cart items after payment
    window.location.reload(false);
    
    
  };

  
  return (
    <section>
      <div className="cart-items-container">
        <div className="container">
          {totalAmount === 0 ? (
            <h2>Currently your cart is empty</h2>
          ) : (
            <React.Fragment>
              <h2>Cart</h2>

              {cartItems.map((item) => (
                <CartItemCard key={item.id} bookData={item} />
              ))}

              <h2>Total Amount = ₹{totalAmount} </h2>

              <StripeCheckout
                name="Book Checkout"
                description="Please fill in the details below"
                amount={totalAmount * 100}
                currency="INR"
                stripeKey={stripeKey}
                token={onToken}
                billingAddress
                
              >
                <button className="button-primary">Proceed to Checkout</button>
              </StripeCheckout>
            </React.Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartItemsContainer;
