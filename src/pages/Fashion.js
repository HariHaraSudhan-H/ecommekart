import React, { useEffect, useState } from "react";
import { getProductsOfCategory } from "../api";
import Product from "../Components/Product";
import styles from "../Styles/home.module.css";
import { fashionCategories, freqCategories } from "../utils/constants";
import SubCategory from "../Components/SubCategory";

const Fashion = (props) => {
  const [categoryBackgroundImage, setBackgroundImage] = useState("");
  useEffect(() => {
    setBackgroundImage(freqCategories[3].backgroundImage);
  }, []);
  return (
    <div className={styles.productsContainer}>
      <div
        className={styles.categoryTitle}
        // style={{ backgroundImage: `url(${categoryBackgroundImage})` }}
      >
        {props.name.charAt(0).toUpperCase() + props.name.substring(1)}
      </div>
      {fashionCategories.map((fashionCategory, index) => {
        return (
          <SubCategory fashionCategory={fashionCategory}/>
        );
      })}
    </div>
  );
};

export default Fashion;
