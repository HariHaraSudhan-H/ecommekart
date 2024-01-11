import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import { HashRouter as Router } from "react-router-dom";
import { ecomData } from "./Redux/Reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(ecomData);
// console.log(store.getState());
export function isFavouriteFromList(productID){
  let check = false;
  const favourites = store.getState().favourites;
  favourites.map((item)=>{
    if(item.id===productID){
      check = true;
    }
    return null
  })
  return check;
}

export function isItemInCart(productID){
  let check = false;
  const cart = store.getState().cart;
  cart.map((item)=>{
    if(item.data.id===productID){
      check = true;
    }
    return null
  })
  return check;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
