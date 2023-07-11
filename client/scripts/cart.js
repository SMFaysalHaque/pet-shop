// Get the quantity buttons and subtotal element
const minusButton = document.querySelector('.col-lg-2 .fs-5:nth-child(1)');
const plusButton = document.querySelector('.col-lg-2 .fs-5:nth-child(3)');
const quantityElement = document.querySelector('.col-lg-2 .fs-5:nth-child(2)');
const subtotalElement = document.querySelector('.d-flex.justify-content-between.border-bottom.p-2 h6:nth-child(2)');
const shippingElement = document.querySelector('.d-flex.justify-content-between.border-bottom.p-2:nth-child(3) h6:nth-child(2)');
const totalElement = document.querySelector('.d-flex.justify-content-between.p-2 h6:nth-child(2)');

// Set initial values
let quantity = 0;
let price = 100;
let shipping = 10;

// Function to update the cart calculations
function updateCart() {
  const subtotal = quantity * price;
  const total = subtotal + shipping;

  // Update the HTML elements
  quantityElement.textContent = quantity;
  subtotalElement.textContent = subtotal;
  shippingElement.textContent = shipping;
  totalElement.textContent = total;
}

// Event listener for minus button
minusButton.addEventListener('click', function() {
  if (quantity > 0) {
    quantity--;
    updateCart();
  }
});

// Event listener for plus button
plusButton.addEventListener('click', function() {
  quantity++;
  updateCart();
});

// Initial cart update
updateCart();
