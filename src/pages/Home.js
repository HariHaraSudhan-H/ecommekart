import React, { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import Product from "../Components/Product";
import styles from "../Styles/home.module.css";
import { connect } from "react-redux";
import Loader from "../Components/Loader";

const Home = (props) => {
  const [bestDeals, setBestDeals] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    console.log(props.data);
    if (props.data[1]) {
      const deals = getBestDeals();
      const sugg = getBestDeals();
      console.log(deals);
      setBestDeals(deals);
      setSuggested(sugg);
      setLoading(false);
    }
  }, [props.data]);
  const getBestDeals = () => {
    let bestDeals = [];
    for (let i = 0; i < 5; i++) {
      const num = Math.floor(Math.random() * 99);
      console.log(num);
      bestDeals[i] = props.data[num];
    }
    return bestDeals;
  };
  return (
    <div>
      <Categories />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <div className={styles.homeTitles}>Best Deals!!</div>
          </div>
          <div className={styles.productsContainer}>
            {bestDeals.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
          <div>
            <div className={styles.homeTitles}>Suggested for you!</div>
          </div>
          <div className={styles.productsContainer}>
            {suggested.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

const callback = (state) => {
  console.log(state);
  return {
    ...state,
  };
};

export default connect(callback)(Home);
