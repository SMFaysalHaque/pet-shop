let cartList = JSON.parse(localStorage.getItem("cartList"))
console.log("cartList:", cartList);

cartList.map((item, i) => {
  let itemDiv1 = document.createElement("div");
            itemDiv1.innerHTML = `
            <!-- FFFFFF -->
            <div
                id="delete${i}"
                class="d-flex justify-content-around align-items-center my-2 py-2 border rounded-2"
            >
                <!-- XXXX -->
                <div
                    class="col-6 col-lg-3 text-center text-md-start py-1"
                >
                    <img
                        src="${item.image}"
                        alt=""
                        style="width: 50%"
                    />
                </div>
                <div class="col-6 col-lg-3 py-1">
                    <h5 class="fw-bold">${item.name}</h5>
                    <h6>${item.price} tk</h6>
                </div>
                <div
                    class="col-3 col-lg-2 d-flex justify-content-evenly border rounded-pill"
                    style="width: 95px; height: 33px"
                >
                    <p onclick="minus(${i})" class="fs-5" style="cursor: pointer;">-</p>
                    <p id="quantity${i}" class="fs-5">0</p>
                    <p onclick="plus(${i})" class="fs-5" style="cursor: pointer;">+</p>
                </div>
                <div>
                    <p class="col-3 col-lg-2 text-center">
                    ${item.price} tk
                    </p>
                </div>
                <div
                    class="d-flex flex-wrap justify-content-between col-lg-2"
                >
                    <a
                        onclick="deleteCart(${i})"
                        class="btn btn-outline-danger m-1"
                        href="./cart-page.html"
                        role="button"
                        >Delete</a
                    >
                </div>
                <!-- XXXX -->
            </div>
            <!-- FFFFFF -->
                    `;
                    document
                    .getElementById("cart-body")
                    .appendChild(itemDiv1);
})


// JavaScript
function plus(i){
  let quantity = document.getElementById(`quantity${i}`).innerHTML;
    quantity++;
    updateQuantity(i, quantity);
}
function minus(i){
  let quantity = document.getElementById(`quantity${i}`).innerHTML;
    if (quantity > 0) {
      quantity--;
      updateQuantity(i, quantity);
    }
}
function updateQuantity(i, quantity) {
  const quantityElement = document.getElementById(`quantity${i}`);
  quantityElement.textContent = quantity;
}




















































// // Get the quantity buttons and subtotal element
// const minusButton = document.querySelector('.col-lg-2 .fs-5:nth-child(1)');
// const plusButton = document.querySelector('.col-lg-2 .fs-5:nth-child(3)');
// const quantityElement = document.querySelector('.col-lg-2 .fs-5:nth-child(2)');
// const subtotalElement = document.querySelector('.d-flex.justify-content-between.border-bottom.p-2 h6:nth-child(2)');
// const shippingElement = document.querySelector('.d-flex.justify-content-between.border-bottom.p-2:nth-child(3) h6:nth-child(2)');
// const totalElement = document.querySelector('.d-flex.justify-content-between.p-2 h6:nth-child(2)');

// // Set initial values
// let quantity = 0;
// let price = 100;
// let shipping = 10;

// // Function to update the cart calculations
// function updateCart() {
//   const subtotal = quantity * price;
//   const total = subtotal + shipping;

//   // Update the HTML elements
//   quantityElement.textContent = quantity;
//   subtotalElement.textContent = subtotal;
//   shippingElement.textContent = shipping;
//   totalElement.textContent = total;
// }

// // Event listener for minus button
// minusButton.addEventListener('click', function() {
//   if (quantity > 0) {
//     quantity--;
//     updateCart();
//   }
// });

// // Event listener for plus button
// plusButton.addEventListener('click', function() {
//   quantity++;
//   updateCart();
// });

// // Initial cart update
// updateCart();
