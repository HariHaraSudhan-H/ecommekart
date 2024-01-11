import React, { useEffect, useState } from "react";
import styles from "../Styles/navbar.module.css";
import { getSearchResults } from "../api";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { connect } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Navbar = (props) => {
  const [searchText, setSearchText] = useState("");
  const { searchMode, setSearchMode, WishlistMode, setWishListMode } = props;
  const [searchData, setData] = useState([]);
  const [isMobile, setMobile] = useState(window.innerWidth>800?false:true);
  const navigate = useNavigate();

  const getSearchData = async () => {
    const data = await getSearchResults(searchText);
    setData(data.data.products.slice(0, 5));
  };
  const handleSearchChange = async (e) => {
    {
      setSearchMode(true);
      setSearchText(e.target.value);
    }
    const temp = await getSearchData();
  };
  const handleSearch = async () => {
    if (searchText.length == 0) {
      setData([]);
      setSearchMode(false);
      return;
    }
    const temp = await getSearchData();
    setSearchText("");
    return navigate(`/search/${searchText}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchText.length !== 0) {
      handleSearch();
      setSearchMode(false);
    }
  };
  const handleWishListMode = () => {
    setWishListMode(true);
  };

  // const handleOutsideClick = (e) => {
  //   const inputElement = document.getElementById("searchInput");
  //   const WishlistIcon = document.getElementById("WishListIcon");
  //   if (!inputElement.contains(e.target) || !WishlistIcon.contains(e.target)) {
  //     setSearchMode(false);
  //     // setWishListMode(false);
  //   } else {
  //     setSearchMode(true);
  //     setWishListMode(true);
  //   }
  // };

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth > 800) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  },[]);

  return (
    <>
    <div className={styles.navbar}>
      <Link className={styles.navBrand} to="/">
        <img src="https://img.icons8.com/fluency/48/online-shop.png" />
        <span>Ec_kart</span>
      </Link>
      {!isMobile&&<div className={styles.searchContainer}>
        <div className={styles.searchWrap}>
          <input
            type="text"
            id="searchInput"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
          {searchMode ? (
            <div className={styles.searchResultsContainer}>
              {searchData.map((data) => {
                return (
                  <div
                    className={styles.searchProduct}
                    onClick={(e) => {
                      navigate(`/product/${data.id}`);
                      setSearchMode(false);
                    }}
                  >
                    <img src={data.thumbnail} width="40px" height="40px" />
                    <h5 className={styles.searchProductTitle}>{data.title}</h5>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          <img
            src="https://cdn.icon-icons.com/icons2/1659/PNG/512/3844432-magnifier-search-zoom_110300.png"
            alt="Search_button"
          />
        </button>
      </div>}
      <div className={styles.authContainer}>
        <Link className={styles.cartIcons} to="/user/profile">
          <img src="https://img.icons8.com/ios/50/user--v1.png" />
          <span>User</span>
        </Link>
        
        <Link
          className={styles.cartIcons}
          id="WishListIcon"
          onClick={handleWishListMode}
          to={isMobile&&"/user/wishlist"}
        >
          <img
            src={
              WishlistMode && !isMobile
                ? "https://img.icons8.com/fluency/48/like.png"
                : "https://img.icons8.com/ios/50/hearts--v1.png"
            }
          />
          {/* <FavoriteBorderIcon/> */}
          <span>Wishlist</span>
        </Link>
        {WishlistMode && !isMobile ? (
          <div className={styles.wishList}>
            {props.favourites.length > 0 ? (
              props.favourites.map((item) => {
                return (
                  <div
                    className={styles.searchProduct}
                    onClick={(e) => {
                      navigate(`/product/${item.id}`);
                      setSearchMode(false);
                    }}
                  >
                    <img src={item.thumbnail} width="40px" height="40px" />
                    <h5 className={styles.searchProductTitle}>{item.title}</h5>
                  </div>
                );
              })
            ) : (
              <div className={styles.searchProduct}>Empty!!!</div>
            )}
          </div>
        ) : (
          <></>
        )}
        <Badge badgeContent={props.cart.length} color="success">
          <Link className={styles.cartIcons} to="/user/cart">
            <img src="https://img.icons8.com/ios/50/shopping-cart--v1.png" />
            <span>Cart</span>
          </Link>
        </Badge>
      </div>
    </div>
    {isMobile&&<div className={styles.searchContainerMobile}>
        <div className={`${styles.searchWrap} ${styles.searchWrapMobile}`}>
          <input
            type="text"
            id="searchInput"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
          {searchMode ? (
            <div className={styles.searchResultsContainer}>
              {searchData.map((data) => {
                return (
                  <div
                    className={styles.searchProduct}
                    onClick={(e) => {
                      navigate(`/product/${data.id}`);
                      setSearchMode(false);
                    }}
                  >
                    <img src={data.thumbnail} width="40px" height="40px" />
                    <h5 className={styles.searchProductTitle}>{data.title}</h5>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          <img
            src="https://cdn.icon-icons.com/icons2/1659/PNG/512/3844432-magnifier-search-zoom_110300.png"
            alt="Search_button"
          />
        </button>
      </div>}
    </>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};

export default connect(callback)(Navbar);
