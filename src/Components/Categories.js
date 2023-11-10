import React from "react";

import styles from "../Styles/categories.module.css";
import { Link } from "react-router-dom";
import { freqCategories } from "../utils/constants";
const Categories = (props) => {
  const { categories } = props;
  return (
    <div className={styles.freqCategories}>
      {freqCategories.map((category) => {
        const categoryName = category.title.toLowerCase();
        return (
          <Link className={styles.category} to={`/${categoryName}`} key={category.id}>
            <img src={category.image}/>
            <span className={styles.categoryTitle}>{category.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
