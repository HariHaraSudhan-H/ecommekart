import React, { useEffect, useState } from "react";
import { getProductsOfCategory } from "../api";
import Product from "../Components/Product";
import styles from "../Styles/home.module.css";
import { freqCategories } from "../utils/constants";
import Loader from "../Components/Loader";
const Category = (props) => {
  const [data, setData] = useState([]);
  const [categoryBackgroundImage, setBackgroundImage] = useState("");
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
          setBackgroundImage(category.backgroundImage);
          return null;
        }
      });
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <div className={styles.productsContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={styles.categoryTitle}
            // style={{ backgroundImage: `url(${categoryBackgroundImage})` }}
          >
            {props.name.charAt(0).toUpperCase() + props.name.substring(1)}
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

export default Category;
