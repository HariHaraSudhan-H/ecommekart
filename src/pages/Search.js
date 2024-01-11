import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSearchResults } from "../api";
import Product from "../Components/Product";
import styles from "../Styles/home.module.css";

const Search = () => {
  const { q } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getResults = async () => {
      const response = await getSearchResults(q);
      const data = response.data.products;
      setData(data);
    };
    getResults();
  }, [q]);
  return (
    <div className={styles.searchResultsContainer}>
        <div className={styles.searchTitle}>Search Results for {q.charAt(0).toUpperCase() + q.substring(1)}</div>
      <div className={styles.productsContainer}>
        {data.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};

export default Search;
