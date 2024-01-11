import React, { useEffect, useState } from "react";
import { getProductsOfCategory } from "../api";
import Product from "../Components/Product";
import styles from "../Styles/home.module.css";
import { freqCategories } from "../utils/constants";
import Loader from "../Components/Loader";
const Category = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getProductsOfCategory(props.name);
      const Outputdata = response.data;
      setData(Outputdata.products);
      freqCategories.map((category) => {
        if (props.name === category.title.toLowerCase()) {
          console.log(true);
        }
        return null;
      });
      setLoading(false);
    };
    getData();
  }, [props.name]);
  return (
    <>
      <div
        className={styles.categoryTitle}
      >
        {props.name.charAt(0).toUpperCase() + props.name.substring(1)}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.productsList}>
          {data.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
      )}
    </>
  );
};

export default Category;
