import React, { useState } from "react";

import Banner from "../../components/Banner/Banner";
import Products from "../../components/Products/Products";
import Search from "../../components/Search/Search";

const Shop = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Banner />

      <Search search={search} setSearch={setSearch} />

      <Products search={search} />
    </div>
  );
};

export default Shop;
