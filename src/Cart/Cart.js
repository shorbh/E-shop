// import React, { useParams } from "react";
import "./cart.css";
export let Cart = ({
  cartProducts,
  incCountToCart,
  decCountToCart,
  remToCart
}) => {
  let itemsPrice = cartProducts
    ?.reduce(
      (prevVal, curVal) =>
        prevVal + (curVal.count ? curVal.count : 1) * curVal.price,
      0
    )
    .toFixed(2);
  let totalPrice = itemsPrice;
  return cartProducts.length ? (
    <div className="flex cart">
      <div className="cart__product">
        {cartProducts.map((product, index) => (
          <div className="flex flex-between flex-center cart__card" key={index}>
            <div className="flex flex-center cart__card--desc">
              <img
                src={product.image}
                className="cart__card--image"
                alt="product"
              />
              <div className="flex flex-column">
                <h3>{product.title}</h3>
                <div className="flex">
                  <p
                    className="margin-2"
                    style={{
                      width: "25px",
                      height: "20px",
                      backgroundColor: "#388e3c",
                      color: "white"
                    }}
                  >
                    {product.rating.rate}
                  </p>
                  <p className="margin-2">({product.rating.count})</p>
                </div>
                <div className="flex">
                  <h3 className="margin-2">₹{product.price}</h3>
                  <div className="flex">
                    <button
                      disabled={product.count <= 1}
                      onClick={() => decCountToCart(index)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="cart__count--input"
                      value={product.count ? product.count : 1}
                      readOnly
                    />
                    <button
                      disabled={product.count >= 5}
                      onClick={() => incCountToCart(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://img.icons8.com/small/16/000000/filled-trash.png"
              height="20px"
              alt="delete"
              onClick={(e) => remToCart(product)}
              className="cart__card--delete"
            />
          </div>
        ))}
      </div>
      <div className="cart__price">
        <p>Price Details</p>
        <hr />
        <div className="flex flex-between">
          <p>Price({cartProducts.length} items)</p>
          <p>₹{itemsPrice}</p>
        </div>
        <hr />
        <div className="flex flex-between">
          <p>Total</p>
          <p>₹{totalPrice}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-center vh-90">
      <img
        src="https://img.icons8.com/ios/200/000000/empty-box.png"
        alt="empty cart"
      />
    </div>
  );
};
