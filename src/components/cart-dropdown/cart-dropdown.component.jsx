import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

import CartItem from "../cart-item/cart-item.component";

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
      </div>

      <Button>Go to checkout</Button>
    </div>
  );
};

export default CartDropDown;
