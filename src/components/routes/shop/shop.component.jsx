import { useContext } from "react";
import "./shop.styles.scss";

import { ProductContext } from "../../../context/products.context";
import ProductCard from "../../product-card/product-card.component";

const Shop = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Shop;
