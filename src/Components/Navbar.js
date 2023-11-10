import React, { useEffect, useState } from "react";
import styles from "../Styles/navbar.module.css";
import { getSearchResults } from "../api";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { connect } from "react-redux";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Navbar = (props) => {
  const [searchText, setSearchText] = useState("");
  const {searchMode, setSearchMode} = props;
  const [searchData, setData] = useState([]);
  const navigate = useNavigate();

  
  const getSearchData = async () => {
    const data = await getSearchResults(searchText);
    setData(data.data.products.slice(0, 5));
    console.log(data.data);
  };
  const handleSearchChange = async (e) => {
    {setSearchMode(true);
    setSearchText(e.target.value);}
    console.log("hii", e.target.value.length);
    const temp = await getSearchData();
  };
  const handleSearch = async () => {
    if(searchText.length==0){
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

  const handleOutsideClick = (e)=>{
    const inputElement = document.getElementById("searchInput");
    if(!inputElement.contains(e.target)){
      setSearchMode(false);
    }else{
      setSearchMode(true);
    }
  }

  return (
    <div className={styles.navbar} onClick={handleOutsideClick}>
      <Link className={styles.navBrand} to="/">
        {/* <img src="https://img.icons8.com/fluency/48/online-shop.png" /> */}
        <span>Ec_kart</span>
      </Link>
      <div className={styles.searchContainer}>
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
                    <img src={data.thumbnail} width="40px" height="40px"/>
                    <h5 className={styles.searchProductTitle}>{data.title}</h5>
                  </div>
                );
              })}
            </div>
          ) : (
            null
          )}
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          <img
            src="https://cdn.icon-icons.com/icons2/1659/PNG/512/3844432-magnifier-search-zoom_110300.png"
            alt="Search_button"
          />
        </button>
      </div>
      <div className={styles.authContainer}>
        <Link className={styles.cartIcons} to="/user/profile">
          <img src="https://img.icons8.com/ios/50/user--v1.png" />
          <span>User</span>
        </Link>
        <Link className={styles.cartIcons} to="">
          <img src="https://img.icons8.com/ios/50/hearts--v1.png" />
          {/* <FavoriteBorderIcon/> */}
          <span>Wishlist</span>
        </Link>
        <Badge badgeContent={props.cart.length} color="success">
          <Link className={styles.cartIcons} to="/user/cart">
            <img src="https://img.icons8.com/ios/50/shopping-cart--v1.png" />
            <span>Cart</span>
          </Link>
        </Badge>
      </div>
    </div>
  );
};

const callback = (state) => {
  console.log(state);
  return {
    ...state,
  };
};

export default connect(callback)(Navbar);
