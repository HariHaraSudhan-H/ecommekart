import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchData } from "../Redux/Actions";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import { getCategories, getCompleteProducts } from "../api";
import Categories from "./Categories";
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

const App = (props)=> {
  // dispatch = this.props.dispatch;
  // const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [WishlistMode, setWishListMode] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  useEffect(()=> {
    const getProducts = async () => {
      const {store} = props;
      const response = await getCompleteProducts();
      console.log(response);
      const products = response.data.products;
      // localStorage.setItem("products", products);
      // setProducts(products);
      props.dispatch(fetchData(products));
      // store.subscribe(() => {
      //     console.log(this.props);
      //     // this.forceUpdate(); 
      //   });
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

    // console.log(this.props);
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
          <Route path="/product/:productid" element={<Product />} />
          <Route path="/search/:q" element={<Search />} />
        </Routes>
        <Footer/>
        <Notification/>
      </div>
    );
}

const callback = (state) => {
  console.log(state);
  return {
    ...state
  };
};

export default connect(callback)(App);

// const getCategoriesList = async ()=>{
//   const response = await getCategories();
//   const categories = response.data;
//   console.log(response);
//   setCategories(categories);
// }