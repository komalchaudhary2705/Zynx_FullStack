let products = [];

let filteredProducts = [];

const productList = document.getElementById("productList");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("error");

const totalProducts = document.getElementById("totalProducts");

const averagePrice = document.getElementById("averagePrice");

const totalValue = document.getElementById("totalValue");

// ==========================================
// API URL
// ==========================================

const API_URL = "https://dummyjson.com/products?limit=100";

// ==========================================
// FETCH PRODUCTS
// ==========================================

const fetchProducts = async () => {
  try {
    loading.style.display = "block";
    errorMessage.textContent = "";
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    const data = await response.json();

    // Destructuring
    const { products: fetchedProducts } = data;

    // Store products
    products = [...fetchedProducts];

    filteredProducts = [...products];

    // Render categories
    createCategories();

    // Render products
    renderProducts(filteredProducts);

    // Update statistics
    updateStatistics(filteredProducts);
  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    loading.style.display = "none";
  }
};

// ==========================================
// CREATE CATEGORIES
// ==========================================

const createCategories = () => {
  // Get unique categories
  const categories = [...new Set(products.map(({ category }) => category))];

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category;

    option.textContent = category;

    categoryFilter.appendChild(option);
  });
};

// ==========================================
// RENDER PRODUCTS
// ==========================================

const renderProducts = (productsToRender) => {
  productList.innerHTML = "";

  // No products
  if (productsToRender.length === 0) {
    productList.innerHTML = `
      <div class="empty">
        <h2>No products found</h2>
        <p>
          Try another search or category.
        </p>
      </div>
    `;

    return;
  }

  // map()
  const productHTML = productsToRender
    .map(({ title, description, price, rating, category, thumbnail }) => {
      return `
          <article class="product-card">

            <img
              src="${thumbnail}"
              alt="${title}"
            >

            <div class="product-content">

              <span class="category">
                ${category}
              </span>

              <h2>
                ${title}
              </h2>

              <p>
                ${description}
              </p>

              <div class="price">
                $${price}
              </div>

              <div class="rating">
                ⭐ ${rating}
              </div>

            </div>

          </article>
        `;
    })
    .join("");

  productList.innerHTML = productHTML;
};

// ==========================================
// SEARCH PRODUCTS
// ==========================================

const searchProducts = () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  const selectedCategory = categoryFilter.value;

  // filter()
  filteredProducts = products.filter(({ title, description, category }) => {
    const matchesSearch =
      title.toLowerCase().includes(searchValue) ||
      description.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);

  updateStatistics(filteredProducts);
};

// ==========================================
// UPDATE STATISTICS
// ==========================================

const updateStatistics = (items) => {
  // Total products
  const count = items.length;

  totalProducts.textContent = count;

  // ========================================
  // reduce() FOR TOTAL VALUE
  // ========================================

  const total = items.reduce((sum, { price }) => {
    return sum + price;
  }, 0);

  // ========================================
  // AVERAGE
  // ========================================

  const average = count > 0 ? total / count : 0;

  averagePrice.textContent = `$${average.toFixed(2)}`;

  totalValue.textContent = `$${total.toFixed(2)}`;
};

// ==========================================
// SEARCH EVENT
// ==========================================

searchInput.addEventListener("input", searchProducts);

// ==========================================
// CATEGORY EVENT
// ==========================================

categoryFilter.addEventListener("change", searchProducts);

// ==========================================
// START APPLICATION
// ==========================================

fetchProducts();
