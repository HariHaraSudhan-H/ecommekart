// import { LOCALSTORAGE_TOKEN_KEY } from "../utils/constants";

const customFetch = async (url, {body, ...customConfig }) => {
  // const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  // const headers = { 'Content-Type': 'application/json' };

  // if(token){

  // }
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      return {
        data: data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getSearchResults = (searchText) => {
  return customFetch(`https://dummyjson.com/products/search?q=${searchText}`, {
    method: "GET",
  });
};

export const getCompleteProducts = () => {
  return customFetch("https://dummyjson.com/products?limit=0", {
    method: "GET",
  });
};

export const getCategories = ()=>{
  return customFetch("https://dummyjson.com/products/categories",{
    method : "GET"
  })
}

export const getProductsOfCategory = (category)=>{
  return customFetch(`https://dummyjson.com/products/category/${category}?limit=0`,{
    method : "GET"
  })
}

export const getSingleProduct = (id) =>{
  return customFetch(`https://dummyjson.com/products/${id}`,{
    method :"GET"
  })
}
