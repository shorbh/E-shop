import React, { useEffect, useState } from "react";
import "./products.css";
import { Link } from "react-router-dom";
import { SideBar } from "../NavPanel/SideBar";

export let ProductList = (props) => {
  const {
    loadNextCards,
    loadPrevCards,
    cardsFromPosition,
    productInfo,
    currentPosition,
    allProducts,
    favProducts,
    addToFav,
    remToFav,
    addToCart,
    cartProducts,
    remToCart
  } = props;
  let products = new Set();
  allProducts.forEach((product) => products.add(product.category));
  let productCategories = [...products];

  let [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    let handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let addFav = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    if (favProducts.some((pro) => product.id === pro.id)) {
      remToFav(product);
    } else {
      addToFav(product);
    }
  };

  let toggleCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    if (cartProducts.some((pro) => product.id === pro.id)) {
      remToCart(product);
    } else {
      addToCart(product);
    }
  };

  let [showSideBar, setShowSideBar] = useState(false);
  let toggleSideBar = () => {
    setShowSideBar((prevState) => !prevState.showSideBar);
  };

  return (
    <div className="vh-90 flex pos-rel">
      {windowWidth < 104 ? (
        showSideBar && (
          <div className="menu-bar pos-abs">
            <SideBar productCategories={productCategories} />
            <img
              className="menu-bar--close"
              alt="close"
              src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"
              onClick={toggleSideBar}
            />
          </div>
        )
      ) : (
        <SideBar productCategories={productCategories} />
      )}
      <div
        className={`flex flex-column flex-between ${
          windowWidth > 704 ? "vw-80" : "vw-100"
        }`}
      >
        <div className="overflow-scroll-y cards vh-82">
          {productInfo
            .filter(
              (product, index) =>
                index >= cardsFromPosition && index < cardsFromPosition + 6
            )
            .map((product) => (
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "black" }}
                key={product.id}
              >
                <div key={product.id} className="card-name">
                  <img
                    alt="wishlist"
                    className="fav-icon"
                    src={
                      favProducts.some((prod) => prod.id === product.id)
                        ? "https://img.icons8.com/color/30/000000/like--v3.png"
                        : "https://img.icons8.com/ios/30/000000/like--v2.png"
                    }
                    onClick={(e) => addFav(e, product)}
                  />
                  <img
                    alt="cart"
                    className="cart-icon"
                    src={
                      cartProducts.some((prod) => prod.id === product.id)
                        ? "https://img.icons8.com/external-those-icons-lineal-those-icons/30/000000/external-cart-shopping-actions-those-icons-lineal-those-icons-8.png"
                        : "https://img.icons8.com/material-rounded/30/000000/add-shopping-cart.png"
                    }
                    onClick={(e) => toggleCart(e, product)}
                  />
                  <img
                    alt="Not found"
                    src={product.image}
                    height="150px"
                    className="product-image"
                  />
                  <h3 className="prod-desc">{product.title}</h3>
                  <div className="flex flex-center">
                    <p
                      className="prod-desc"
                      style={{
                        width: "25px",
                        height: "20px",
                        backgroundColor: "#388e3c",
                        color: "white"
                      }}
                    >
                      {product.rating.rate}
                    </p>
                    ({product.rating.count})
                  </div>
                  <h3 className="prod-desc">₹{product.price}</h3>
                </div>
              </Link>
            ))}
        </div>
        <div className="flex flex-center vh-7 productlist__footer">
          {currentPosition !== 0 && (
            <button
              className="productlist__footer--button"
              onClick={loadPrevCards}
            >
              Prev
            </button>
          )}
          {productInfo[currentPosition + 6] && (
            <button
              className="productlist__footer--button"
              onClick={loadNextCards}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
