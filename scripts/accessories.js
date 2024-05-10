// Header Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});
//products Array
const products = [
  {
    id: 1,
    title: " shalateen leather",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/96/820381/1.jpg?3247",
  },
  {
    id: 2,
    title: " beaded bracelet",
    price: 55,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/29/015591/1.jpg?7305",
  },
  {
    id: 3,
    title: " sinai embroidered necklace",
    price: 35,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/93/219602/1.jpg?7105",
  },
  {
    id: 4,
    title: " Hande Gold Ring",
    price: 53,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/13/934622/1.jpg?9332",
  },
  {
    id: 5,
    title: "Rhine stone decor earrings",
    price: 60,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/53/693364/1.jpg?3956",
  },
  {
    id: 6,
    title: "Charm Necklace & earring",
    price: 55,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/22/334843/1.jpg?7009",
  },
  {
    id: 7,
    title: "Rhinestone& faux pearl decor stud earring",
    price: 55,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/58/873335/1.jpg?3373",
  },
  {
    id: 8,
    title: "1pair round ball decor earring jackets",
    price: 55,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/62/693364/1.jpg?3960",
  },
  {
    id: 9,
    title: "Fluffy women accessories",
    price: 55,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/65/163484/1.jpg?7314",
  },
];

//get the products list and elements
const productlist = document.getElementById("productlist");
const cartitemsElement = document.getElementById("cartitems");
const carttotalElement = document.getElementById("carttotal");

//store cart items in local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Render products on page
function renderProducts() {
  productlist.innerHTML = products
    .map(
      (product) => `
    <div class="product">
      <img src="${product.image}" alt="${product.title}" class="product-img"/>
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <a class="add-to-cart" data-id=${product.id}> Add to cart</a>
      </div>
    </div>
    `
    )
    .join("");
  // add to cart
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCart);
  }
}
// Add to cart
function addToCart(event) {
  const productId = parseInt(event.target.dataset.id);

  const product = products.find((product) => product.id === productId);

  if (product) {
    // if product already in cart
    const exixtingItem = cart.find((item) => item.id === productId);

    if (exixtingItem) {
      exixtingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    // change add to cart text to added
    event.target.textContent = "Added";
    updateCartIcon();
    saveToLocalStorage();
    rendercartitems();
    calculateCartTotal();
  }
}

// Remove from cart
function removeFromCart(event) {
  const productID = parseInt(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);
  saveToLocalStorage();
  rendercartitems();
  calculateCartTotal();
  updateCartIcon();
}
// Quantity Change
function changeQuantity(event) {
  const productID = parseInt(event.target.dataset.id);
  const quantity = parseInt(event.target.value);

  if (quantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);
    if (cartItem) {
      cartItem.quantity = quantity;
      saveToLocalStorage();
      calculateCartTotal();
      updateCartIcon();
    }
  }
}
// saveToLocalStorage
function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render prodects on cart page
function rendercartitems() {
  cartitemsElement.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <h2 class="cart-item-title">${item.title}</h2>
        <input 
        class="cart-item-quantity" 
        type="number" 
        name="" 
        min="1" 
        value="${item.quantity}" 
        data-id="${item.id}"
      />
      </div>
      <h2 class="cart-item-price">$${item.price}</h2>
      <button class="remove-from-cart" data-id="${item.id}">Remove</button>
    </div>
    `
    )
    .join("");
  // Remove from cart
  const removeButtons = document.getElementsByClassName("remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }
  // Quantity change
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", changeQuantity);
  });
}

// claculate total
function calculateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  carttotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// check if on cart page

if (window.location.pathname.includes("cart.html")) {
  rendercartitems();
  calculateCartTotal();
} else if (window.location.pathname.includes("success.html")) {
  clearCart();
} else {
  renderProducts();
  calculateCartTotal();
}
// Empty Cart on succesful payment
function clearCart() {
  cart = [];
  saveToLocalStorage();
  updateCartIcon;
}
// cart icon quantity
const cartIcon = document.getElementById("cart-icon");

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.setAttribute("data-quantity", totalQuantity);
}
updateCartIcon();

function updateCartIconOnCartChange() {
  updateCartIcon();
}

window.addEventListener("storage", updateCartIconOnCartChange);
function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.setAttribute("data-quantity", totalQuantity);
}

renderProducts();
rendercartitems();
calculateCartTotal();
