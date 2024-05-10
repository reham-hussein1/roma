const payBtn = document.querySelector(".checkout-btn");

payBtn.addEventListener("click", () => {
  fetch("/stripe-checkout", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      items: JSON.parse(localStorage.getItem("cart")),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Invalid URL Recived from the server:", data.url);
      }
    })
    .catch((err) => console.error(err));
});
