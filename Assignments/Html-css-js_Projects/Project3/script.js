const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const totalProducts = document.getElementById("total");
const totalValue = document.getElementById("value");

let products = [];

// ----------------------------------
// Fetch products
// ----------------------------------

const getProducts = async () => {
  try {
    productsContainer.innerHTML = `
            <p>Loading products...</p>
        `;

    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("Products could not be loaded.");
    }

    const data = await response.json();

    products = data;

    displayProducts(products);

    updateInfo(products);
  } catch (error) {
    productsContainer.innerHTML = `
            <p>Unable to load products.</p>
        `;

    console.log(error);
  }
};

const displayProducts = (productList) => {
  if (productList.length === 0) {
    productsContainer.innerHTML = `
            <p>No products found.</p>
        `;

    return;
  }

  productsContainer.innerHTML = productList

    .map(({ title, price, image }) => {
      return `
                <div class="product">

                    <img
                        src="${image}"
                        alt="${title}"
                    >

                    <h2>
                        ${title}
                    </h2>

                    <p class="price">
                        Price: $${price}
                    </p>

                </div>
            `;
    })

    .join("");
};

const updateInfo = (productList) => {
  // Count products

  totalProducts.textContent = productList.length;

  // Calculate total price

  const total = productList.reduce(
    (sum, product) => {
      return sum + product.price;
    },

    0,
  );

  totalValue.textContent = total.toFixed(2);
};

const searchProducts = () => {
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter(({ title }) => {
    return title.toLowerCase().includes(searchText);
  });

  displayProducts(filteredProducts);
};

const addProduct = (newProduct) => {
  products = [...products, newProduct];

  displayProducts(products);

  updateInfo(products);
};

const showProducts = (...items) => {
  console.log(items);
};

searchInput.addEventListener("input", searchProducts);

getProducts();
