import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "../Styles/navbar.module.css";
import { Navigate } from "react-router-dom";
import { addFavourites, removeFavourites } from "../Redux/Actions";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Wishlist = (props) => {
  const [isFavourite, setFavourite] = useState(false);
  const { favourites, dispatch } = props;
  const handleWishlist = () => {
    if (isFavourite) {
      const newFav = favourites.filter((item) => item.id !== props.product.id);
      dispatch(removeFavourites(newFav));
    } else {
      const newFav = [...favourites, props.product];
      dispatch(addFavourites(newFav));
    }
    setFavourite(!isFavourite);
  };

  return (
    <div className={styles.wishlistContainer}>
      <h3>Favourites</h3>
      <main className={styles.wishlistMainContainer}>
        {props.favourites.length > 0 ? (
          props.favourites.map((item) => {
            return (
              <div
                className={styles.searchProduct}
                onClick={(e) => {
                  Navigate(`/product/${item.id}`);
                  // setSearchMode(false);
                }}
              >
                <img src={item.thumbnail} width="40px" height="40px" />
                <h5 className={styles.searchProductTitle}>{item.title}</h5>
                {/* <button className={styles.wishlistIcon} onClick={handleWishlist}>
                <img src="https://img.icons8.com/material-rounded/24/FA5252/like--v1.png" />
              </button> */}
                <Button
                  onClick={handleWishlist}
                  className={styles.deleteButton}
                >
                  {<DeleteIcon />}
                </Button>
              </div>
            );
          })
        ) : (
          <div className={styles.searchProduct}>Empty</div>
        )}
      </main>
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};

export default connect(callback)(Wishlist);
