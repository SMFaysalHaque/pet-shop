let cartList = JSON.parse(localStorage.getItem("cartList"));
// cartList.splice(0, 1)
// console.log("Cart 111:", cartList[i]);
console.log("cartList:", cartList);
const token = localStorage.getItem("userToken");

let subtotal = 0;
let total = 0;

if(cartList && cartList.length) {
    cartList.map((item, i) => {
        if (item.qty === -1 ) {
            // qty = -1 means that this item has been deleted. so ignore this product
            return;
        }
        // console.log("Cart List Index:", cartList[i]);
        subtotal = parseFloat(item.price) * parseFloat(item.qty) + subtotal;
        
        // cartList.splice(1, 1)
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
                        <h6 id="itemPrice${i}">${item.price} tk</h6>
                    </div>
                    <div
                        class="col-3 col-lg-2 d-flex justify-content-evenly border rounded-pill"
                        style="width: 95px; height: 33px"
                    >
                        <p onclick="minus(${i})" class="fs-5" style="cursor: pointer;">-</p>
                        <p id="quantity${i}" class="fs-5">${item.qty}</p>
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
                            role="button"
                            >Delete</a
                        >
                    </div>
                    <!-- XXXX -->
                </div>
                <!-- FFFFFF -->
                        `;
                        document.getElementById("cart-body").appendChild(itemDiv1);
    });
}

// showing subtotal:
document.getElementById("subCount").innerHTML = subtotal;

// total calculation:
const shipping = document.getElementById("shipping").innerHTML;
total = subtotal + parseFloat(shipping);
document.getElementById("total").innerHTML = total;

// JavaScript
function plus(i) {
    let quantity = document.getElementById(`quantity${i}`).innerHTML;
    let itemPrice = document.getElementById(`itemPrice${i}`).innerHTML;

    subtotal = parseFloat(itemPrice) + subtotal;
    document.getElementById("subCount").innerHTML = subtotal;

    total = subtotal + parseFloat(shipping);
    document.getElementById("total").innerHTML = total;

    quantity++;
    updateQuantity(i, quantity);
}

function minus(i) {
    let quantity = document.getElementById(`quantity${i}`).innerHTML;
    let itemPrice = document.getElementById(`itemPrice${i}`).innerHTML;

    if (quantity > 1) {
        subtotal = subtotal - parseFloat(itemPrice);
        document.getElementById("subCount").innerHTML = subtotal;

        total = subtotal + parseFloat(shipping);
        document.getElementById("total").innerHTML = total;

        quantity--;
        updateQuantity(i, quantity);
    }
}
function updateQuantity(i, quantity) {
    cartList[i].qty = quantity;
    localStorage.setItem("cartList", JSON.stringify(cartList));
    const quantityElement = document.getElementById(`quantity${i}`);
    quantityElement.textContent = quantity;
}

function confirmOder() {
    if (!cartList) {
        alert("Cart is empty!");
        window.open("http://127.0.0.1:5500/client/home.html", "_self");
        return;
    }

    if (!token) {
        alert("Please sign in!!!");
        window.open("http://127.0.0.1:5500/client/sign-in.html", "_self");
        return;
    }
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    let orders = [];

    cartList.map((item, i) => {
        if (item.qty === -1 ) {
            // qty = -1 means that this item has been deleted. so ignore this product
            return;
        }
        var order = {
            id: item.id,
            quantity: item.qty,
        };
        orders.push(order);
    });

    console.log("orders",orders);

    const bodyParameters = {
        order: orders,
    };

    axios
        .post(
            "http://localhost:3000/api/orders/register",
            bodyParameters,
            config
        )
        .then(function (response) {
            // handle success
            console.log("res", response);
            localStorage.removeItem('cartList');
            alert("Order placed successfully!");
            window.open("http://127.0.0.1:5500/client/home.html", "_self");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function deleteCart(i) {
    console.log("Div Index:", cartList[i]);

    let quantity = document.getElementById(`quantity${i}`).innerHTML;
    let itemPrice = document.getElementById(`itemPrice${i}`).innerHTML;
    subtotal = subtotal - parseFloat(itemPrice) * parseFloat(quantity);
    document.getElementById("subCount").innerHTML = subtotal;
    total = subtotal + parseFloat(shipping);
    document.getElementById("total").innerHTML = total;

    // set an impossible value of -1; when we see that a item's qty is -1, we can assume
    // that the item was deleted
    cartList[i].qty = -1;
    localStorage.setItem("cartList", JSON.stringify(cartList));

    console.log("Cart List", cartList);

    document.getElementById(`delete${i}`).remove();
}

axios
    .get("http://localhost:3000/api/products/categories")
    .then(function (response) {
        // handle success
        console.log("pppp", response.data.data);
        let allCategories = response.data.data;

        allCategories.map((category, i) => {
            let itemDiv1 = document.createElement("li");
            itemDiv1.innerHTML = `
                <a
                class="dropdown-item"
                href="http://127.0.0.1:5500/client/product.html?name=${category.name}"
                >
                ${category.name} Product
                </a>
                    `;
            document.getElementById("drop-down").appendChild(itemDiv1);
        });
    })

    .catch(function (error) {
        // handle error
        console.log(error);
    });
