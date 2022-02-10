import { useParams, useNavigate, Link } from "react-router-dom";
import "./product.css";

export let Product = ({ productInfo, addToCart, cartProducts }) => {
  let params = useParams();
  let navigate = useNavigate();
  let product = productInfo.filter(
    (prod) => prod.id === parseInt(params.productId)
  )[0];
  let addProdToCart = () => {
    addToCart(product);
    navigate("/cart");
  };
  return (
    <div className="flex flex-evenly vw-80 center-div">
      <div className="flex flex-column">
        <div
          key={product.id}
          className="product-image-card flex flex-center vw-20 vh-40"
        >
          <img alt="Not found" src={product.image} width="100%" height="100%" />
        </div>
        {cartProducts.some((prod) => prod.id === product.id) ? (
          <Link to="/cart">
            <button className="addToCart">Go to Cart</button>
          </Link>
        ) : (
          <button className="addToCart" onClick={addProdToCart}>
            Add to Cart
          </button>
        )}
      </div>
      <div className="vw-50 product-desc">
        <h3 className="">{product.title}</h3>
        <div className="flex ">
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
        <h3 className="">₹{product.price}</h3>
        <p>{product.description}</p>
        {/* <button className="addToCart">Add to Cart</button> */}
      </div>
    </div>
  );
};
