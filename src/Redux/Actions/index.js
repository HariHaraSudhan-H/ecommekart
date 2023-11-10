export const ADD_ITEMS_CART = "ADD_ITEMS_CART";
export const REMOVE_ITEMS_CART = "REMOVE_ITEMS_CART";
export const FETCH_DATA = "FETCH_DATA";
export const ADD_FAVOURITES = "ADD_FAVOURITES";
export const REMOVE_FAVOURITES = "REMOVE_FAVOURITES";
 
export const addItemToCart = (cart)=>{
    return {
        type:ADD_ITEMS_CART,
        cart
    }
}

export const removeItemFromCart = (cart)=>{
    return {
        type:REMOVE_ITEMS_CART,
        cart
    }
}

export const fetchData = (data)=>{
    return {
        type:FETCH_DATA,
        data
    }
}

export const addFavourites = (favourites)=>{
    return{
        type:ADD_FAVOURITES,
        favourites
    }
}

export const removeFavourites = (favourites)=>{
    return{
        type:ADD_FAVOURITES,
        favourites
    }
}