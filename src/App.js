import "./styles.css";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ProductList } from "./ProductList/ProductList";
import { NavBar } from "./NavPanel/NavBar";
import { Loader } from "./Loader";
import { Routes, Route } from "react-router-dom";
import { Product } from "./Product/Product";
import { Cart } from "./Cart/Cart";
import { Wishlist } from "./Wishlist/Wishlist";
export let ProductListContext = createContext(null);

export let App = () => {
  let initialstate = {
    productInfo: [],
    isLoad: false,
    position: 0,
    filterProducts: [],
    cartProducts: [],
    favProducts: []
  };
  let [state, setState] = useState(initialstate);
  let loadNextCards = () => {
    setState((prevState) => ({
      ...prevState,
      position: prevState.position + 6
    }));
  };
  let loadPrevCards = () => {
    setState((prevState) => ({
      ...prevState,
      position: prevState.position - 6
    }));
  };

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setState((prevState) => ({
        ...prevState,
        productInfo: response.data,
        isLoad: true,
        filterProducts: response.data
      }));
    });
  }, []);
  let searchProduct = (filters) => {
    let { productInfo } = state;
    let filterProducts = [];

    if (filters["category"]) {
      filterProducts = productInfo.filter(
        (product) => product.category === filters.category
      );
    }
    if (filters["minprice"]) {
      filterProducts = (filterProducts[0]
        ? filterProducts
        : productInfo
      ).filter((product) => product.price >= parseInt(filters.minprice, 10));
    }
    if (filters["maxprice"]) {
      filterProducts = (filterProducts[0]
        ? filterProducts
        : productInfo
      ).filter((product) => product.price <= parseInt(filters.maxprice, 10));
    }
    if (filters["search"]) {
      filterProducts = (filterProducts[0]
        ? filterProducts
        : productInfo
      ).filter(
        (product) =>
          product.category.includes(filters.search) ||
          product.title.includes(filters.search)
      );
    }
    if (
      filters["search"] ||
      filters["category"] ||
      filters["minprice"] ||
      filters["maxprice"]
    ) {
      setState((prevState) => ({
        ...prevState,
        filterProducts: filterProducts
      }));
    }
  };

  let resetFilterProducts = () =>
    setState((previousState) => ({
      ...previousState,
      filterProducts: previousState.productInfo
    }));

  let addToCart = (product) =>
    setState((previousState) => ({
      ...previousState,
      cartProducts: [...previousState.cartProducts, product]
    }));
  let incCountToCart = (index) => {
    setState((previousState) => ({
      ...previousState,
      cartProducts: [
        ...previousState.cartProducts.filter((prod, i) => i < index),
        {
          ...previousState.cartProducts[index],
          count: previousState.cartProducts[index].count
            ? previousState.cartProducts[index].count + 1
            : 2
        },
        ...previousState.cartProducts.filter((prod, i) => i > index)
      ]
    }));
  };
  let decCountToCart = (index) => {
    setState((previousState) => ({
      ...previousState,
      cartProducts: [
        ...previousState.cartProducts.filter((prod, i) => i < index),
        {
          ...previousState.cartProducts[index],
          count: previousState.cartProducts[index].count
            ? previousState.cartProducts[index].count - 1
            : 1
        },
        ...previousState.cartProducts.filter((prod, i) => i > index)
      ]
    }));
  };
  let remToCart = (product) => {
    setState((previousState) => ({
      ...previousState,
      cartProducts: [
        ...previousState.cartProducts.filter(({ id }) => id !== product.id)
      ]
    }));
  };

  let addToFav = (product) =>
    setState((previousState) => ({
      ...previousState,
      favProducts: [...previousState.favProducts, product]
    }));
  let remToFav = (product) =>
    setState((previousState) => ({
      ...previousState,
      favProducts: previousState.favProducts.filter(
        (prod) => prod.id !== product.id
      )
    }));

  let {
    productInfo,
    isLoad,
    position,
    filterProducts,
    cartProducts,
    favProducts
  } = state;
  return isLoad ? (
    <Routes>
      <Route
        path="/"
        element={
          <NavBar
            searchProduct={searchProduct}
            resetFilterProducts={resetFilterProducts}
          />
        }
      >
        <Route
          path="/"
          element={
            <ProductListContext.Provider
              value={{ searchProduct, resetFilterProducts }}
            >
              <ProductList
                loadNextCards={loadNextCards}
                loadPrevCards={loadPrevCards}
                cardsFromPosition={position}
                productInfo={filterProducts}
                allProducts={productInfo}
                currentPosition={position}
                favProducts={favProducts}
                addToFav={addToFav}
                remToFav={remToFav}
                addToCart={addToCart}
                cartProducts={cartProducts}
                remToCart={remToCart}
              />
            </ProductListContext.Provider>
          }
        />
        <Route
          path={`/product/:productId`}
          element={
            <Product
              productInfo={filterProducts}
              addToCart={addToCart}
              cartProducts={cartProducts}
            />
          }
        />
        <Route
          path="cart"
          element={
            <Cart
              cartProducts={cartProducts}
              incCountToCart={incCountToCart}
              decCountToCart={decCountToCart}
              remToCart={remToCart}
            />
          }
        />
        <Route
          path="wishlist"
          element={<Wishlist favProducts={favProducts} remToFav={remToFav} />}
        />
      </Route>
    </Routes>
  ) : (
    <Loader />
  );
};
