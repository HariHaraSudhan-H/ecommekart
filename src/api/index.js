const customFetch = async (url, { customConfig }) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

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

export const getSearchResults = (searchText)=>{
    return customFetch(`https://dummyjson.com/products/search?q=${searchText}`,{
        method: 'GET'
    })
}
