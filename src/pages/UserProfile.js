import React from "react";

import styles from "../Styles/profile.module.css";
const UserProfile = () => {
  return (
    <div className={styles.userContainer}>
      <header>
        <img src="https://img.icons8.com/3d-fluency/94/person-male--v6.png" />
        <h1>Hi Guest!!</h1>
      </header>
      <main>
        <h3>Personal Information</h3>
        <div className={styles.detailsContainer}>
          <h5>Email</h5>
          <span>guest@gmail.com</span>
        </div>
        <div className={styles.detailsContainer}>
          <h5>Mobile Number</h5>
          <span>9543691982</span>
        </div>
        <div className={styles.detailsContainer}>
          <h5>Permanent Address</h5>
          <span>
            B-1, 2nd floor, A-block, Swagath Residency, 17th East cross street,
            Near ambiga theatre, Anna Nagar,Madurai-625020
          </span>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
