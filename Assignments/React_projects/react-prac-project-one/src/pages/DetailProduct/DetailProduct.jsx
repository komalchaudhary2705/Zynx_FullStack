import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DetailProduct.css";
import { FaStar } from "react-icons/fa";
const DetailProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
        );

        setProduct(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="detail-container">
      <div className="detail-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="detail-info">
        <span className="category">{product.category}</span>

        <h1>{product.title}</h1>

        <div className="rating">
          <FaStar /> {product.rating} / 5
        </div>

        <h2>${product.price}</h2>

        <p className="description">{product.description}</p>

        <div className="extra-info">
          <p>Brand: {product.brand}</p>

          <p>Stock: {product.stock}</p>
        </div>

        <div className="buttons">
          <button className="cart-btn">Add To Cart</button>

          <button className="buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
