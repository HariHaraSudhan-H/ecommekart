import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../api";

import styles from "../Styles/detailProduct.module.css";
import { fashionCategories } from "../utils/constants";
import { connect } from "react-redux";
import {
  addFavourites,
  addItemToCart,
  removeFavourites,
  updateNotification,
} from "../Redux/Actions";
import Loader from "../Components/Loader";
import { isFavouriteFromList, isItemInCart } from "..";
import { Alert, Snackbar } from "@mui/material";
const Product = (props) => {
  const { dispatch, favourites, cart } = props;
  const { productid } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [isFavourite, setFavourite] = useState(false);
  const [isFashion, setFashion] = useState(false);
  const [isCart, setCart] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getSingleProduct(productid);
      const data = response.data;
      const cat = data.category;
      setData(data);
      setCategory(cat);
      const getCheck = checkFashion(cat);
      setFashion(getCheck);
      const getCart = isItemInCart(data.id);
      setCart(getCart);
      setLoading(false);
      const check = isFavouriteFromList(data.id);
      setFavourite(check);
    };
    getData();
  }, [productid]);

  const handleWishlist = () => {
    if (isFavourite) {
      const newFav = favourites.filter((item) => item.id !== data.id);
      console.log(newFav);
      dispatch(removeFavourites(newFav));
    } else {
      const newFav = [...favourites, data];
      dispatch(addFavourites(newFav));
    }
    setFavourite(!isFavourite);
    dispatch(updateNotification({
      open:true,
      severity:"success",
      message:!isFavourite?"Added to favourites successfully":"Removed from favourites successfully"
    }))
  };

  const checkFashion = (category) => {
    let check = false;
    const result = fashionCategories.filter((cat) => cat.title === category);
    if (result.length > 0) {
      check = true;
    }
    return check;
  };

  const handleAddToCart = () => {
    console.log(cart);
    if (!isCart) {
      // setOpen(true);
      const newCart = [...cart, { data: data, qty: 1 }];
      dispatch(addItemToCart(newCart));
      dispatch(updateNotification({
        open:true,
        severity:"success",
        message:"Added to cart successfully"
      }))
      setCart(true);
      console.log(props);
    }else{
      const newCart = cart.filter((item)=>item.data.id!==data.id);
      console.log(newCart);
      dispatch(addItemToCart([...newCart]));
      setCart(false);
    }
    dispatch(updateNotification({
      open:true,
      severity:"success",
      message:!isCart?"Added to cart successfully":"Removed from cart successfully"
    }))
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.productContainer}>
      <div className={styles.categoryPath}>
        {isFashion ? (
          <>
            <Link to="/">Home</Link>
            {" > "}
            <Link to="/fashion">Fashion</Link>
            {" > "}
            <Link to={`/fashion`}>
              {category.charAt(0).toUpperCase() + category.substring(1)}
            </Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link> {" > "}
            <Link to={`/${category}`}>
              {category.charAt(0).toUpperCase() + category.substring(1)}
            </Link>
          </>
        )}
      </div>
      <header className={styles.productMainContainer}>
        <img src={data.thumbnail} className={styles.thumbnail} />
        <div className={styles.detailsContainer}>
          <h4 className={styles.brand}>{data.brand}</h4>
          <div className={styles.productTitle}>{data.title}</div>
          <div>{data.description}</div>
          <div className={styles.priceContainer}>
            <div className={styles.originalPrice}>
              Rs.{" "}
              {Math.round(
                data.price * (100 / (100 - data.discountPercentage)) * 100
              ) / 100}
            </div>
            <div className={styles.discountPercentage}>
              {data.discountPercentage}%
            </div>
          </div>
          <div className={styles.sellingPrice}>Rs. {data.price}</div>
          {isCart ? (
            <button className={styles.cartButton} onClick={handleAddToCart}>
              Remove Cart
              <img src="https://img.icons8.com/ios-filled/50/FFFFFF/add-shopping-cart.png" />
            </button>
          ) : (
            <button className={styles.cartButton} onClick={handleAddToCart}>
              Add to Cart
              <img src="https://img.icons8.com/ios-filled/50/FFFFFF/add-shopping-cart.png" />
            </button>
          )}

          {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{horizontal:"right",vertical:"top"}}>
            <Alert
              onClose={handleClose}
              sx={{ width: "100%"}}
            >
              Added to cart!!
            </Alert>
          </Snackbar> */}
          {isFavourite ? (
            <button className={styles.wishlistIcon} onClick={handleWishlist}>
              <img src="https://img.icons8.com/material-rounded/24/FA5252/like--v1.png" />
            </button>
          ) : (
            <button className={styles.wishlistIcon} onClick={handleWishlist}>
              <img src="https://img.icons8.com/material-outlined/24/like--v1.png" />
            </button>
          )}
        </div>
      </header>

      <main>
        <div className={styles.productTitle}>Product Highlights</div>
        <div className={styles.images}>
          {data.images &&
            data.images.map((image, index) => {
              return <img src={image} key={index} />;
            })}
        </div>
      </main>
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};

export default connect(callback)(Product);
