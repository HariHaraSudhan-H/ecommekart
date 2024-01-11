import React from "react";

import styles from "../Styles/detailProduct.module.css";
import { CircularProgress } from "@mui/material";
const Loader = () => {
  return (
    <div className={styles.spinner}>
      <img src="https://img.icons8.com/fluency/48/online-shop.png"/>
      <CircularProgress color="secondary" sx={{width:"50px",height:"50px"}}/>
    </div>
  );
};

export default Loader;
