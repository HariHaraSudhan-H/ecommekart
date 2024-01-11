import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchData } from "../Redux/Actions";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import { getCompleteProducts } from "../api";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import "../index.css";
import Product from "../pages/Product";
import Fashion from "../pages/Fashion";
import Search from "../pages/Search";
import Footer from "./Footer";
import Notification from "./Notification";
import Wishlist from "./Wishlist";

const App = (props)=> {
  const [WishlistMode, setWishListMode] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  useEffect(()=> {
    const getProducts = async () => {
      const response = await getCompleteProducts();
      const products = response.data.products;
      props.dispatch(fetchData(products));
    };

    getProducts();
  },[])

  const handleOutsideClick = (e)=>{
    const WishlistIcon = document.getElementById("WishListIcon");
    const inputElement = document.getElementById("searchInput");
    if (!inputElement.contains(e.target) || !WishlistIcon.contains(e.target)) {
      setSearchMode(false);
      if(WishlistMode){

        setWishListMode(false);
        
      }
    }else {
      setSearchMode(true);
      setWishListMode(true);
    }
  }
    return (
      <div className="App" onClick={handleOutsideClick}>
        <Navbar searchMode={searchMode} setSearchMode={setSearchMode} WishlistMode={WishlistMode} setWishListMode={setWishListMode}/>
        <Routes>
          <Route path="/" element={<Home products={props.data} />} />
          <Route
            path="/smartphones"
            element={<Category name="smartphones" />}
            />
          <Route path="/laptops" element={<Category name="laptops" />} />
          <Route path="/furniture" element={<Category name="furniture" />} />
          <Route path="/fashion" element={<Fashion name="fashion" />} />
          <Route path="/automotive" element={<Category name="automotive" />} />
          <Route path="/groceries" element={<Category name="groceries" />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/user/wishlist" element={<Wishlist />} />
          <Route path="/product/:productid" element={<Product />} />
          <Route path="/search/:q" element={<Search />} />
        </Routes>
        <Footer/>
        <Notification/>
      </div>
    );
}

const callback = (state) => {
  return {
    ...state
  };
};

export default connect(callback)(App);