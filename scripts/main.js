// Header Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});
//products Array
const products = [
  {
    id: 1,
    title: "American Eagle Linen Band Collar",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/288942/1.jpg?8801",
  },
  {
    id: 2,
    title: "Activ Long Sleeves Tartan Regular",
    price: 70,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/32/761472/1.jpg?2262",
  },
  {
    id: 3,
    title: "Activ Long Sleeves Tartan Regular",
    price: 75,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/53/561472/1.jpg?2142",
  },
  {
    id: 4,
    title: "Defacto Modern Fit Polo",
    price: 30,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/22/858034/1.jpg?2042",
  },
  {
    id: 5,
    title: "Andora Solid Cotton",
    price: 20,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/42/074644/1.jpg?8756",
  },
  {
    id: 6,
    title: "Andora Solid Cotton",
    price: 23,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/21/674644/1.jpg?8756",
  },
  {
    id: 7,
    title: "T-shirt Burgundy",
    price: 10,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/38/405554/1.jpg?9564",
  },
  {
    id: 8,
    title: "V-Shirt Basic short sleeve T-shirt",
    price: 30,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/37/033014/1.jpg?6440",
  },
  {
    id: 9,
    title: "Pique Polo Shirt",
    price: 35,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/312861/1.jpg?8786",
  },
  {
    id: 10,
    title: "Brown Buttoned polo shirt",
    price: 30,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/05/797074/1.jpg?4558",
  },
  {
    id: 11,
    title: "Polo shirt -sage Green",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/59/405554/1.jpg?9683",
  },
  {
    id: 12,
    title: "Half sleeves T-shirt-Black",
    price: 55,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/65/09639/1.jpg?1852",
  },
  {
    id: 13,
    title: "Shirt Royal Blue",
    price: 63,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/09/405554/1.jpg?9624",
  },
  {
    id: 14,
    title: "polo shirt Maroon",
    price: 80,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/44/312861/1.jpg?8786",
  },
  {
    id: 15,
    title: "Polo Shirt Black",
    price: 33,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/24/505554/1.jpg?0235",
  },
  {
    id: 16,
    title: "Hero Basic",
    price: 15,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/009601/1.jpg?2349",
  },
  {
    id: 17,
    title: "T-shirt Light pink",
    price: 39,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/94/29639/1.jpg?4562",
  },
  {
    id: 18,
    title: "T-shirt Aqua Blue",
    price: 40,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/24/09639/1.jpg?1844",
  },
  {
    id: 19,
    title: "Polo shirt Burgundy",
    price: 70,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/97/922412/1.jpg?5114",
  },
  {
    id: 20,
    title: "Polo shirt Grey",
    price: 60,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/90/464644/1.jpg?2589",
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
