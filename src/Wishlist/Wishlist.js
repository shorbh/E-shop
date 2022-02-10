import "./wishlist.css";

export let Wishlist = ({ favProducts, remToFav }) => {
  return favProducts.length ? (
    <div className="wishlist">
      <h3>My Wishlist</h3>

      {favProducts.map((product, index) => (
        <div
          className="flex flex-between flex-center wishlist__card"
          key={index}
        >
          <div className="flex flex-center wishlist__card--desc">
            <img
              src={product.image}
              className="wishlist__card--image"
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
              <h3 className="margin-2">₹{product.price}</h3>
            </div>
          </div>
          <img
            src="https://img.icons8.com/small/16/000000/filled-trash.png"
            height="20px"
            alt="delete"
            onClick={(e) => remToFav(product)}
            className="wishlist__card--delete"
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-center vh-90">
      <img
        src="https://img.icons8.com/ios/100/000000/wish-list.png"
        alt="No Wishlist yet"
      />
    </div>
  );
};
