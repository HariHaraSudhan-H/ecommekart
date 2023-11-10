import React, { useState } from "react";
import { connect } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../Redux/Actions";
import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "../Styles/cart.module.css";

const CartProduct = (props) => {
  const { product } = props;
  // const [qty,setQty] = useState(props.product.qty);
  let sum = 0;
  const handleQtyIncrease = () => {
    // setQty(qty+1);
    updateCart(product.qty + 1);
  };

  const handleQtyDecrease = () => {
    updateCart(product.qty - 1);
  };

  const updateCart = (qty) => {
    // let newCart = props.cart.filter((item) => item.data.id !== product.data.id);
    // console.log(newCart);
    // if (qty != 0) {
    //   newCart = [...newCart, { ...product, qty: qty }];
    // }
    let newCart = props.cart;
    if (qty !== 0) {
      newCart.map((item) => {
        if (item.data.id === product.data.id) {
          product.qty = qty;
        }
      });
      newCart = [...newCart];
    } else {
      newCart = props.cart.filter((item) => item.data.id !== product.data.id);
      newCart = [...newCart];
    }
    props.dispatch(addItemToCart(newCart));
  };
  const handleRemoveFromCart = () => {
    const newCart = props.cart.filter(
      (item) => product.data.id !== item.data.id
    );
    props.dispatch(removeItemFromCart(newCart));
  };

  return (
    <div className={styles.cartProductContainer}>
      <img src={product.data.thumbnail} />
      <div className={styles.cartProductDetails}>
        {product.data.title}
        <snap>Rs. {product.data.price*product.qty}</snap>
        {/* <ButtonGroup variant="contained"> */}
        <div className={styles.buttonGroup}>
          <Button color="error" size="small" variant="outlined" onClick={handleQtyDecrease}>
            -
          </Button>
          <Typography sx={{ width: "20%", textAlign: "center" }} my={1}>
            {product.qty}
          </Typography>
          <Button onClick={handleQtyIncrease} variant="outlined" color="success">
            +
          </Button>
          <Button onClick={handleRemoveFromCart}>{<DeleteIcon />}</Button>
        </div>
        {/* </ButtonGroup> */}
      </div>
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};

export default connect(callback)(CartProduct);
