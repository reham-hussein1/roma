// Header Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});
//products Array
const products = [
  {
    id: 1,
    title: "Caesar unisex hoodie with zipper",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/868182/1.jpg?2132",
  },
  {
    id: 2,
    title: "Caesar unisex hoodie with zipper",
    price: 51,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/69/868182/1.jpg?2133",
  },
  {
    id: 3,
    title: "Caesar unisex hoodie with zipper",
    price: 40,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/89/868182/1.jpg?2132",
  },
  {
    id: 4,
    title: "Izor boys zipper Hoodie-wine",
    price: 60,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/81/39308/1.jpg?5965",
  },
  {
    id: 5,
    title: "Fashion ladies loose casual print hoodie",
    price: 30,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/63/616017/1.jpg?9664",
  },
  {
    id: 6,
    title: "Fashion casual hooded sweatshirt",
    price: 35,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/82/912337/1.jpg?4164",
  },
  {
    id: 7,
    title: "Fashion 21n1 Men's casual Jacket",
    price: 38,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/87/275137/1.jpg?9328",
  },
  {
    id: 8,
    title: "LC Waikiki crew neck girls dress",
    price: 40,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/27/554116/1.jpg?3291",
  },
  {
    id: 9,
    title: "kady girls healther light grey sleeves dress",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/30/611081/1.jpg?6952",
  },
  {
    id: 10,
    title: "Defacto girls regular fit long sleeve knitted dress",
    price: 60,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/48/864483/1.jpg?3086",
  },
  {
    id: 11,
    title: "Children's dress of ribbed rib and tulle",
    price: 80,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/75/825072/1.jpg?5087",
  },
  {
    id: 12,
    title: "fashion children's dress",
    price: 70,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/40/910916/1.jpg?8836",
  },
  {
    id: 13,
    title: "fashion sprint Autumn children dress",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/89/010916/1.jpg?8789",
  },
  {
    id: 14,
    title: "fashion toddler infant jumper skirt",
    price: 53,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/33/900916/1.jpg?8612",
  },
  {
    id: 15,
    title: "fashion summer party dress",
    price: 20,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/16/800916/1.jpg?8629",
  },
  {
    id: 16,
    title: "fashion summer party dress",
    price: 20,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/02/210916/1.jpg?8751",
  },
  {
    id: 17,
    title: "fashion summer party dress",
    price: 20,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/09/410916/1.jpg?8899",
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
