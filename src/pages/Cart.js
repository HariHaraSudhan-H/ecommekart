import React, { useEffect, useState } from "react";

import styles from "../Styles/cart.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartProduct from "../Components/CartProduct";
import { Button } from "@mui/material";
import { removeItemFromCart, updateNotification } from "../Redux/Actions";
const Cart = (props) => {
  const { cart, dispatch } = props;
  const [isMobile,setMobile] = useState(window.innerWidth>750?false:true)
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(props.cart.length);
  useEffect(() => {
    setLoading(true);
    setSize(cart.length);
    setLoading(false);
    const resize = () => {
      if (window.innerWidth > 750) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [cart]);
  const getTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((element) => {
      totalPrice += element.data.price * element.qty;
    });
    return Math.round(totalPrice * 100) / 100;
  };
  const getDiscountPrice = () => {
    let discountPrice = 0;
    cart.forEach((element) => {
      discountPrice +=
        element.data.price *
        (element.data.discountPercentage /
          (100 - element.data.discountPercentage)) *
        element.qty;
    });
    return Math.round(discountPrice * 100) / 100;
  };

  // const getQty = () => {
  //   let qty = 0;
  //   cart.forEach((element) => {
  //     qty = qty + element.qty;
  //   });
  //   return qty;
  // };

  const handlePlaceOrder = ()=>{
    dispatch(removeItemFromCart([]));
    dispatch(updateNotification({
      open:true,
      severity:"success",
      message:"Order placed successfully"
    }))
  }
  return (
    <div>
      {size === 0 ? (
        <main className={styles.cartContainer}>
          <img src="https://img.icons8.com/3d-fluency/94/empty-box.png" />
          <span>Your Cart is Empty!!</span>
          <Link to="/">Shop Now</Link>
        </main>
      ) : (
        <>
          <main className={styles.filledCartContainer}>
            <div className={styles.cartContainer}>
              <div className={styles.cartTitle}>Shopping Cart</div>
              <div className={styles.cartInnerContainer}>
                {cart &&
                  cart.map((product) => {
                    return <CartProduct product={product} key={product.id} />;
                  })}
              </div>
              {!isMobile&&<Button variant="contained" color="success" onClick={handlePlaceOrder}>
                Place Order
              </Button>}
            </div>
            <section className={styles.cartCostDetails}>
              <div>
                Price ({size} {size > 1 ? "items" : "item"}) :{" "}
                <span>{getDiscountPrice() + getTotalPrice()}</span>
              </div>
              <div>
                Discount : <span>{getDiscountPrice()}</span>
              </div>
              <div>
                Delivery Charges :{" "}
                <span style={{ color: "green", fontWeight: "500" }}>Free</span>
              </div>
              <div>
                Total Amount :{" "}
                <span style={{ fontWeight: "bold", color: "green" }}>
                  Rs.{getTotalPrice()}
                </span>
              </div>
              {isMobile&&<Button variant="contained" color="success" onClick={handlePlaceOrder}>
                Place Order
              </Button>}
            </section>
          </main>
        </>
      )}
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};

export default connect(callback)(Cart);
