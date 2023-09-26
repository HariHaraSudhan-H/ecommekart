import React, { useState } from "react";
import styles from "../Styles/navbar.module.css";
import { getSearchResults } from "../api";

const Navbar = (props) => {
    const [searchText,setSearchText] = useState("");
    const handleSearch = ()=>{
        const data = getSearchResults(searchText).data;
        console.log(data);
    }
  return (
    <div className={styles.navbar}>
      <h1>Ecommekart</h1>
      <div className={styles.searchContainer}>
        <input type="text" onChange={(e)=>{setSearchText(e.target.value)}}/>
        <button className={styles.searchButton} onClick={handleSearch}>
          <img
            src="https://cdn.icon-icons.com/icons2/1659/PNG/512/3844432-magnifier-search-zoom_110300.png"
            alt="Search_button"
          />
        </button>
      </div>
      <div className={styles.authContainer}>
        <h3>SignIn</h3>
        <h3>SignUp</h3>
      </div>
    </div>
  );
};

export default Navbar;
