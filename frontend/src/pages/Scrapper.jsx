import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { request } from "../store/apiSlice.js";
import c from "../c";
import { current } from "@reduxjs/toolkit";
import ProductDetail from "../components/ProductCard.jsx";

export default function Scrapper() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(
    "https://www.amazon.com/Apple-MacBook-Air-Retina-Display/dp/B09DGRPM53/ref=sr_1_1?crid=3CT6TT1QDTW99&keywords=macbook+air&qid=1703672914&sprefix=macbook%2Caps%2C424&sr=8-1"
  );
  const [product, setProduct] = useState("");
  function updateProduct(data) {
    setProduct(data.obj);
  }
  const onSearchSubmit = (e) => {
    e.preventDefault();
    //  valid amazon url?
    const url = new URL(search);
    const { hostname } = url;
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      // GET
      dispatch(
        request({
          method: "GET",
          url: `${c.baseUrl}/scrapper/amazon/?search=${search}`,
          options: {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          },
          isLoader: true,
          // isOk: true,
          callback: updateProduct,
        })
      );
    }
    setSearch("");
  };
  return (
    <main>
      <section>
        <div className="📃 💪⬇️">
          <h2 className="👇2">Scrapper</h2>
          <p className="👇4">Scrap any products from amazon for now!</p>
          <form className="💪 📏f" onSubmit={onSearchSubmit}>
            {/* search */}
            <div className="💪1">
              <label htmlFor="search">Search for product:</label>
              <input
                className="📏f"
                type="text"
                id="search"
                name="search"
                placeholder="Enter track name here"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            {/* submit button */}
            <button className="🛎️ 👆a" type="submit">
              Scrap
            </button>
          </form>
          <ProductDetail product={product} />
        </div>
      </section>
    </main>
  );
}
