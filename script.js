
// The Cozy Cup: menu data, category filters, search and mobile navigation.

const menuItems = [
 {
  name: "Classic Cappuccino",
  category: "Coffee",
  price: "Rs. 450",
  description: "Rich espresso topped with silky steamed milk and soft foam.",
  image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80"
 },
 {
  name: "Iced Caramel Latte",
  category: "Coffee",
  price: "Rs. 520",
  description: "Chilled espresso, creamy milk and a sweet caramel swirl.",
  image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"
 },
 {
  name: "Matcha Green Tea",
  category: "Tea",
  price: "Rs. 480",
  description: "Smooth green tea with a gentle, earthy taste.",
  image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=700&q=80"
 },
 {
  name: "Chocolate Brownie",
  category: "Dessert",
  price: "Rs. 390",
  description: "A soft, fudgy chocolate brownie for your sweet cravings.",
  image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"
 },
 {
  name: "Butter Croissant",
  category: "Snacks",
  price: "Rs. 350",
  description: "A golden, flaky pastry baked until perfectly crisp.",
  image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"
 },
 {
  name: "Strawberry Cheesecake",
  category: "Dessert",
  price: "Rs. 550",
  description: "Creamy cheesecake finished with a strawberry topping.",
  image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80"
 }
];

const grid = document.getElementById("menuGrid");
const filterArea = document.getElementById("filters");
const searchInput = document.getElementById("menuSearch");

let selectedCategory = "All";

// Create a menu card for each matching item.
function displayMenu(items) {
  if (items.length === 0) {
    grid.innerHTML = '<p class="no-results">No menu items found. Try another search.</p>';
    return;
  }

  grid.innerHTML = items.map(item => `
    <article class="menu-card">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="card-body">
        <div class="card-top">
          <span>${item.category}</span>
          <span class="price">${item.price}</span>
        </div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `).join("");
}

// Apply both the chosen category and the search phrase.
function updateMenu() {
  const phrase = searchInput.value.toLowerCase().trim();

  const results = menuItems.filter(item => {
    const categoryMatch =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const searchMatch =
      item.name.toLowerCase().includes(phrase) ||
      item.category.toLowerCase().includes(phrase) ||
      item.description.toLowerCase().includes(phrase);

    return categoryMatch && searchMatch;
  });

  displayMenu(results);
}

// Listen for clicks on menu category buttons.
filterArea.addEventListener("click", event => {
  const button = event.target.closest(".filter");

  if (!button) return;

  selectedCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");
  updateMenu();
});

// Update results as the visitor types.
searchInput.addEventListener("input", updateMenu);

// Show or hide the mobile navigation menu.
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.textContent = open ? "×" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Display the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Display all menu items when the page first loads.
displayMenu(menuItems);
