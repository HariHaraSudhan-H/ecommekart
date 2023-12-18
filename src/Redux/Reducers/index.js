import {
  ADD_FAVOURITES,
  ADD_ITEMS_CART,
  FETCH_DATA,
  REMOVE_FAVOURITES,
  REMOVE_ITEMS_CART,
  UPDATE_NOTIFICATION,
} from "../Actions";

const intialState = {
  data: [],
  cart: [],
  favourites: [],
  notification: {
    open: false,
    severity: "success",
    message: ""
  }
};
export function ecomData(state = intialState, action) {
  switch (action.type) {
    case ADD_ITEMS_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case REMOVE_ITEMS_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case ADD_FAVOURITES:
      return {
        ...state,
        favourites: action.favourites,
      };
    case REMOVE_FAVOURITES:
      return {
        ...state,
        favourites: action.favourites,
      };
    case FETCH_DATA:
      return {
        ...state,
        data: action.data,
      };
    case UPDATE_NOTIFICATION:
      return{
        ...state,
        notification: action.notification
      }
    default:
      return state;
  }
}
