// Header Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});
//products Array
const products = [
  {
    id: 1,
    title: "Long sleeve Woman Dress",
    price: 30,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/82/624706/1.jpg?4037",
  },
  {
    id: 2,
    title: "long sleeve woven dress",
    price: 300,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/97/988394/1.jpg?1454",
  },
  {
    id: 3,
    title: "Floral Short dress white",
    price: 75,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/26/614962/1.jpg?8526",
  },
  {
    id: 4,
    title: "Neck Bodycon Dress-7501",
    price: 30,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/44/042122/1.jpg?7448",
  },
  {
    id: 5,
    title: "AE clooared knit mini dress",
    price: 25,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/33/108796/1.jpg?0042",
  },
  {
    id: 6,
    title: "Wide leg jumpsuit",
    price: 30,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/89/175094/1.jpg?5071",
  },
  {
    id: 7,
    title: "Crew Neck plain",
    price: 35,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/48/718815/1.jpg?6068",
  },
  {
    id: 8,
    title: "shirt collor floral short",
    price: 27,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/08/518815/1.jpg?1499",
  },
  {
    id: 9,
    title: "Fit Woven Skirt",
    price: 40,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/78/688394/1.jpg?1233",
  },
  {
    id: 10,
    title: "Low-Rise cargo maxi shirt",
    price: 20,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/36/083096/1.jpg?4404",
  },
  {
    id: 11,
    title: "High-low midi skirt",
    price: 30,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/44/715784/1.jpg?2985",
  },
  {
    id: 12,
    title: "LC Waikiki woman",
    price: 15,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/71/410316/1.jpg?3618",
  },
  {
    id: 13,
    title: "A-Line skirt shades of blue",
    price: 35,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/55/496384/1.jpg?4657",
  },
  {
    id: 14,
    title: "A-Line chiffon women's skirt",
    price: 30,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/71/738815/1.jpg?9667",
  },
  {
    id: 15,
    title: "Defacto woman beige skirt",
    price: 33,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/592742/1.jpg?5464",
  },
  {
    id: 16,
    title: "LC Waikiki women's straight skirt",
    price: 20,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/42/658815/1.jpg?3654",
  },
  {
    id: 17,
    title: "Sun set solid mid skirt black",
    price: 34,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/08/44817/1.jpg?4825",
  },
  {
    id: 18,
    title: "Defacto standard fit skirt",
    price: 38,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/38/856654/1.jpg?1900",
  },
  {
    id: 19,
    title: "Defacto A Cut printed midi skirt",
    price: 45,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/77/689585/1.jpg?8230",
  },
  {
    id: 20,
    title: "Defacto woman A Line woven skirt",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/08/159194/1.jpg?0834",
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
