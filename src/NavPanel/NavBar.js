import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "./navpanel.css";

export let NavBar = ({ searchProduct, resetFilterProducts }) => {
  let [search, setSearch] = useState("");
  let onSearch = (e) => {
    e.preventDefault();
    if (search) searchProduct({ search });
    else resetFilterProducts();
  };
  return (
    <div>
      <div className="nav-bar flex vw-97 vh-5 flex-around">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div
            className="logo"
            onClick={() => {
              resetFilterProducts();
              setSearch("");
            }}
          >
            e-shop
          </div>
        </Link>
        <form className="flex">
          <input
            type="text"
            className="search-input"
            placeholder="Search Products through name and category"
            name="search"
            value={search}
            onInput={(e) => setSearch(e.target.value)}
          />
          <input
            type="image"
            alt="submit"
            src="https://img.icons8.com/color/28/000000/search--v2.png"
            onClick={onSearch}
          />
        </form>
        <Link to="/wishlist">
          <img
            src="https://img.icons8.com/color/30/000000/like--v3.png"
            alt="favourite"
            width="30px"
            height="30px"
          />
        </Link>
        <Link to="/cart">
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            alt="cart"
            width="30px"
            height="30px"
          />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
