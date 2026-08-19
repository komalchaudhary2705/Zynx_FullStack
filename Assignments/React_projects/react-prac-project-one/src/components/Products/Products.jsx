import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link } from "react-router-dom";
const Products = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await axios.get("https://dummyjson.com/products");

        console.log(resp.data.products);
        setProductsData(resp.data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div id="products-container">
      {productsData.map((prod) => (
        <div className="product-card" key={prod.id}>
          <img src={prod.thumbnail} alt={prod.title} />
          <h3>{prod.title}</h3>

          <p>{prod.description}</p>

          <div className="detail">
            <p>Price: ${prod.price}</p>
            <Link to={`/product/${prod.id}`}>View Detail</Link>
          </div>
          <button className="add-card">Add Card</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
