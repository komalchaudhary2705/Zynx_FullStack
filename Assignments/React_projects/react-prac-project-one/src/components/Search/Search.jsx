import React from "react";
import "./Search.css";

const Search = ({ search, setSearch }) => {

  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>
  );
};

export default Search;