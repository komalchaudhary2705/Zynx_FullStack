import React, { useState, useEffect } from "react";

import Banner from "../../components/Banner/Banner";
import Search from "../../components/Search/Search";
import Products from "../../components/Products/Products";
import Pagination from "../../components/Pagination/Pagination";

const Shop = () => {
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const limit = 28;

  const totalProducts = 194;

  const totalPages = Math.ceil(totalProducts / limit);

  // Reset pagination when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div>
      <Banner />

      <Search search={search} setSearch={setSearch} />

      <Products search={search} currentPage={currentPage} limit={limit} />

      {!search && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default Shop;
