import React from "react";
import { Audio } from "react-loader-spinner";

import styles from "../Styles/detailProduct.module.css";
import { CircularProgress, LinearProgress } from "@mui/material";
const Loader = () => {
  return (
    <div className={styles.spinner}>
      {/* <Audio height={150} width={150} color="blue" /> */}
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Loader;
