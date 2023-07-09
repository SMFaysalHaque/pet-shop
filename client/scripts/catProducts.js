// import axios from 'axios';

// const axios = require('axios');

// Make a request for a user with a given ID
axios.get("http://localhost:3000/api/products/categories/Cat")
    .then(function (response) {
        // handle success
        console.log("API RESPONSE:", response.data.data);
        let productDetail = response.data.data;

        productDetail.map((card, i) => {
            // cat's products carousel card details photo and name start

            let itemDiv1 = document.createElement("div");
            itemDiv1.innerHTML = `
                    <div class="col-6 col-md-3">
                                <div class="card"
                                style="
                                        height: 235px;
                                        width: 235px;
                                    ">
                                    <img
                                        src="${card.imageUrl}"
                                        class="card-img-top h-100 w-100"
                                        
                                        alt="..."
                                    />
                                </div>
                            </div>
                    `;
            if (i < 4) {
                document
                    .getElementsByClassName("slide-card1")[0]
                    .appendChild(itemDiv1);
            }
            // cat's products carousel card details photo and name end

            // cat's products carousel card details photo and name start
            let itemDiv2 = document.createElement("div");
            itemDiv2.innerHTML = `
                    <div class="col-6 col-md-3"
                                    >
                                <div class="card"
                                style="
                                height: 235px;
                                width: 235px;
                                    ">
                                    <img
                                        src="${card.imageUrl}"
                                        class="card-img-top h-100 w-100"
                                        
                                        alt="..."
                                    />
                                </div>
                            </div>
                    `;
            if (i < 4) {
                document
                    .getElementsByClassName("slide-card2")[0]
                    .appendChild(itemDiv2);
            }

            // cat's products carousel card details photo and name end

            // cat's products carousel card details photo and name start
            let itemDiv3 = document.createElement("div");
            itemDiv3.innerHTML = `
                    <div class="col-6 col-md-3">
                                <div class="card"
                                style="
                                height: 235px;
                                width: 270px;
                                    ">
                                    <img
                                        src="${card.imageUrl}"
                                        class="card-img-top h-100 w-100"
                                        
                                        alt="..."
                                    />
                                </div>
                            </div>
                    `;

            if (i < 4) {
                document
                    .getElementsByClassName("slide-card3")[0]
                    .appendChild(itemDiv3);
            }

            // cat's products carousel card details photo and name end

            // cat's product card details start
            let cardDiv = document.createElement("div");
            cardDiv.innerHTML = `
                    <div class="col">
                        <div class="card">
                            <!-- code in catProducts.js file -->
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
                                    >
                                        Add Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            document.getElementsByClassName("card-main")[0].appendChild(cardDiv);
            // cat's product card details end
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
