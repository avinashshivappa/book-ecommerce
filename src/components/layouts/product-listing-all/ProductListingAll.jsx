
import "./productListingAll.styles.css";
import ProductListingCard from "../../cards/product-listing-card/ProductListingCard";
import { BookData } from "../../../util/BookData";

const ProductListingAll = () => {
  return (
    <section className="product-listing-all-container">
      <div className="container">

        <div className="grid-container">
          {BookData.map((book) => {
            return (
              <div className="grid-item" key={book.id}>
                <ProductListingCard bookData={book} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductListingAll;
