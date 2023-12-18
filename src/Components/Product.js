import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "../Styles/product.module.css";
import { isFavouriteFromList } from "..";
import { connect } from "react-redux";
import { addFavourites, removeFavourites } from "../Redux/Actions";
const Product = (props) => {
  const { dispatch, favourites, cart } = props;
  const [isFavourite, setFavourite] = useState(false);
  useEffect(() => {
    const check = isFavouriteFromList(props.product.id);
    setFavourite(check);
  }, [props]);
  const handleWishlist = () => {
    if (isFavourite) {
      const newFav = favourites.filter((item) => item.id != props.product.id);
      dispatch(removeFavourites(newFav));
    } else {
      const newFav = [...favourites, props.product];
      dispatch(addFavourites(newFav));
    }
    setFavourite(!isFavourite);
  };
  return (
    <div className={styles.productContainer}>
      <img src={props.product.images[0]} />
      <Link className={styles.productTitle} to={`/product/${props.product.id}`}>
        {props.product.title}
      </Link>
      {/* <div style={{ alignSelf: "self-start" }}>
        <div className={styles.originalPrice}>
          Rs.{" "}
          {Math.round(
            props.product.price * (100 / (100 - props.product.discountPercentage)) * 100
          ) / 100}
        </div>
        Rs.{props.product.price}
      </div> */}
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
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};

export default connect(callback)(Product);
