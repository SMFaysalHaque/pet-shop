// import axios from 'axios';

// const axios = require('axios');

// Make a request for a user with a given ID
axios.get("http://localhost:3000/api/products/categories/Dog")
    .then(function (response) {
        // handle success
        console.log("API RESPONSE:", response.data.data);
        let productDetail = response.data.data;

        productDetail.map((card, i) => {

            // dog's product card details start
            let cardDogDiv = document.createElement("div");
            cardDogDiv.innerHTML = `
                    <div class="col">
                        <div class="card">
                            <!-- code in dogProducts.js file -->
                            <img
                                src="${card.imageUrl}"
                                class="card-img-top w-100 h-100"
                                alt="..."
                            />
                            <div class="card-body">
                                <h5 
                                class="card-title"
                                style="
                                        height: 70px;
                                        overflow: hidden;
                                    "
                                >${card.name}</h5>
                                <p
                                    class="card-text"
                                    style="
                                        height: 190px;
                                        overflow: hidden;
                                    "
                                >
                                    ${card.description}
                                </p>
                                <div
                                    class="cart-button-price-area d-flex flex-column flex-md-row align-content-center"
                                >
                                    <h3 class="d-inline me-auto">
                                        ${card.price} tk
                                    </h3>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        id="cart-btn"
                                        onclick="cartPage()"
                                    >
                                        Add Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            if ( i < 4){
                document
                .getElementsByClassName("card-dog-main")[0]
                .appendChild(cardDogDiv);
            }
            // dog's product card details end

            // cart button start**************************************
            // const collection = document.getElementById("card-dog-main").children;
            // let text;
            // for (let i = 0; i < collection.length; i++) {
            // text = collection[i].tagName;
            // }
            // console.log(text);

            // // document.getElementById("demo").innerHTML = text;

            // document.getElementById("cart-btn").addEventListener("click", displayDate);

            // function displayDate() {
            // // document.getElementById("demo").innerHTML = Date();
            // console.log("TEXT PRINT:", text);
            // }
            // cart button end***************************************
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

// import axios from 'axios';

// const axios = require('axios');

// Make a request for a user with a given ID
axios.get("http://localhost:3000/api/products/categories/Cat")
    .then(function (response) {
        // handle success
        console.log("API RESPONSE:", response.data.data);
        let productDetail = response.data.data;

        productDetail.map((card, i) => {

            // dog's product card details start
            let cardCatDiv = document.createElement("div");
            cardCatDiv.innerHTML = `
                    <div class="col">
                        <div class="card">
                            <!-- code in dogProducts.js file -->
                            <img
                                src="${card.imageUrl}"
                                class="card-img-top w-100 h-100"
                                alt="..."
                            />
                            <div class="card-body">
                                <h5 
                                class="card-title"
                                style="
                                        height: 70px;
                                        overflow: hidden;
                                    "
                                >${card.name}</h5>
                                <p
                                    class="card-text"
                                    style="
                                        height: 190px;
                                        overflow: hidden;
                                    "
                                >
                                    ${card.description}
                                </p>
                                <div
                                    class="cart-button-price-area d-flex flex-column flex-md-row align-content-center"
                                >
                                    <h3 class="d-inline me-auto">
                                        ${card.price} tk
                                    </h3>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        onclick="cartPage()"
                                    >
                                        Add Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            if ( i < 4 ) {
                document
                .getElementsByClassName("card-cat-main")[0]
                .appendChild(cardCatDiv);
            }
            // dog's product card details end
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

    function cartPage(){
        window.open("http://127.0.0.1:5500/client/cart-page.html","_self")
    }
