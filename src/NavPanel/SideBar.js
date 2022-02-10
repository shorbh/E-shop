import React, { useState, useContext } from "react";
import { ProductListContext } from "../App";

export let SideBar = (props) => {
  let { searchProduct, resetFilterProducts } = useContext(ProductListContext);
  let { productCategories } = props;
  let [filterProduct, setFilterProduct] = useState({
    category: "",
    minprice: "",
    maxprice: ""
  });
  let filter = (e) => {
    e.preventDefault();
    if (
      filterProduct.minprice &&
      filterProduct.maxprice &&
      filterProduct.minprice > filterProduct.maxprice
    ) {
      setFilterProduct((prevState) => ({
        ...prevState,
        minprice: "",
        maxprice: ""
      }));
      return;
    }
    searchProduct(filterProduct);
  };
  let resetFilters = () => {
    if (filterProduct.category)
      document.getElementById(filterProduct.category).checked = false;
    setFilterProduct({ category: "", minprice: "", maxprice: "" });
    resetFilterProducts();
  };
  return (
    <div className="side-bar vw-20 vh-75">
      <form>
        <div className="flex flex-center flex-between">
          <h2>Filters</h2>
          <p className="reset-filter" onClick={resetFilters}>
            Clear All
          </p>
        </div>
        <dl>
          <dt> Category </dt>
          {productCategories.map((category, index) => (
            <dd key={index}>
              <input
                onClick={(e) =>
                  setFilterProduct({ ...filterProduct, category: category })
                }
                type="radio"
                id={category}
                name="select_category"
                value={category}
              />
              <label htmlFor={category}>{category}</label>
            </dd>
          ))}
        </dl>
        <div>Price</div>
        <div className="flex flex-around">
          <input
            placeholder="Min"
            name="min-price"
            className="price-bar"
            type="number"
            min="1"
            onChange={(e) =>
              setFilterProduct({ ...filterProduct, minprice: e.target.value })
            }
            value={filterProduct.minprice}
          />
          <input
            placeholder="Max"
            name="max-price"
            className="price-bar"
            type="number"
            min="1"
            onChange={(e) =>
              setFilterProduct({ ...filterProduct, maxprice: e.target.value })
            }
            value={filterProduct.maxprice}
          />
        </div>
        <div className="flex flex-around">
          <button type="submit" onClick={filter} className="apply-filter">
            Apply
          </button>
          {/* <button>Clear All </button> */}
        </div>
      </form>
    </div>
  );
};
