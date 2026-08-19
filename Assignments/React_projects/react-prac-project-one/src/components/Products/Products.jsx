import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link } from "react-router-dom";

const Products = ({ search = "", currentPage, limit }) => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let api = "https://dummyjson.com/products";

        // Search
        if (search.trim() !== "") {
          api = `https://dummyjson.com/products/search?q=${search}`;
        }

        // Pagination only when currentPage and limit exist
        else if (currentPage && limit) {
          const skip = (currentPage - 1) * limit;

          api = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        }

        const response = await axios.get(api);

        setProductsData(response.data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, currentPage, limit]);

  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  return (
    <div id="products-container">
      {productsData.length === 0 ? (
        <h2>No Products Found</h2>
      ) : (
        productsData.map((prod) => (
          <div className="product-card" key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title} />

            <h3>{prod.title}</h3>

            <p>{prod.description.slice(0, 100)}...</p>

            <div className="detail">
              <p>Price: ${prod.price}</p>

              <Link to={`/product/${prod.id}`} className="view-detail">
                View Detail
              </Link>
            </div>

            <button className="add-card">Add Cart</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Products;
