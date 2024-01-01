import React from "react";
import { Link } from "react-router-dom";

const ProductDetail = ({ product }) => {
  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <div className="📃 💪⬇️ 🃏 👆7 fadeInUp">
      <h3 className="👇2">{product.title}</h3>
      <img className="👇4 📏h6" src={product.image} alt="lorem" />
      {/* stars */}
      <p>Stars: {product.stars}</p>
      <div className="📦 📐h 📏f 👇4">
        <div
          className="💙 📐h 📏f"
          style={{ width: `${(product.stars / 5) * 100}%` }}
        ></div>
      </div>
      {/* table */}
      <div style={{ overflowX: "auto" }} className="📏f 👇4">
        <table className="📏f">
          <thead>
            <tr>
              <th>averagePrice</th>
              <th>currentPrice</th>
              <th>highestPrice</th>
              <th>discountRate</th>
              <th>isOutOfStock</th>
              <th>lowestPrice</th>
              <th>originalPrice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {product.currency}
                {product.averagePrice}
              </td>
              <td>
                {product.currency}
                {product.currentPrice}
              </td>
              <td>
                {product.currency}
                {product.highestPrice}
              </td>
              <td>{product.discountRate}</td>
              <td>{product.isOutOfStock}</td>
              <td>
                {product.currency}
                {product.lowestPrice}
              </td>
              <td>
                {product.currency}
                {product.originalPrice}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="🦵 👇4">{product.description}</p>
      <Link className="🛎️" to={product.search} target="_blank">
        Go to original page
      </Link>
    </div>
  );
};

export default ProductDetail;
