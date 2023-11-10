import React, { useEffect, useState } from "react";

import styles from "../Styles/home.module.css";
import Product from "./Product";
import { getProductsOfCategory } from "../api";
import Loader from "./Loader";
const SubCategory = (props) => {
  const [loading, setLoading] = useState(false);
  const { fashionCategory } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getProductsOfCategory(fashionCategory.title);
      const Outputdata = response.data.products;
      setData(Outputdata);
      setLoading(false);
      console.log(fashionCategory);
    };
    getData();
  }, []);
  return (
    <div className={styles.fashionCategoriesContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.fashionCategoryTitle}>
            {fashionCategory.title.charAt(0).toUpperCase() +
              fashionCategory.title.substring(1)}
          </div>
          <div className={styles.catProductsContainer}>
            {data.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SubCategory;
