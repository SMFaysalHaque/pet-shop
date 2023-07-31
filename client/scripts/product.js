const categoryName = new URLSearchParams(window.location.search).get("name");
console.log("gggg", categoryName);
// Make a request for a user with a given ID
axios
    .get(`http://localhost:3000/api/products/categories/${categoryName}`)
    .then(function (response) {
        // handle success
        console.log("API RESPONSE:", response.data.data);
        let productDetail = response.data.data;

        productDetail.map((card, i) => {
            let pId = card._id
                console.log(pId);

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
            // dog's products carousel card details photo and name end

            // dog's products carousel card details photo and name start
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

            // dog's products carousel card details photo and name end

            // dog's products carousel card details photo and name start
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

            // dog's products carousel card details photo and name end

            // dog's product card details start
            let cardDiv = document.createElement("div");
            cardDiv.innerHTML = `
                    <div class="col">
                        <div class="card">
                            <!-- code in dogProducts.js file -->
                            <img
                                src="${card.imageUrl}"
                                class="card-img-top w-100 h-100"
                                alt="..."
                            />
                            <div class="card-body" >
                                <div onclick="detail('${pId}')">
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
                                </div>
                                <div
                                    class="cart-button-price-area d-flex flex-column flex-md-row align-content-center"
                                >
                                    <h3 class="d-inline me-auto">
                                        ${card.price} tk
                                    </h3>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        onclick="cartPage('${card.name}', '${pId}', '${card.price}', '${card.imageUrl}')"
                                    >
                                        Add Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            document
                .getElementsByClassName("card-main")[0]
                .appendChild(cardDiv);
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

    function detail(id) {
        console.log("aaaa", id);
        document.getElementById("body").style.display = "none";
        document.getElementById("search-result-area").style.display = "none";
        document.getElementById("productDetail").style.visibility = "visible";
    
        axios
            .get(`http://localhost:3000/api/products/${id}`)
            .then(function (response) {
                // handle success
                const product = response.data.data;
                console.log("AAA:", product);
                let cardDogDiv = document.createElement("div");
                cardDogDiv.innerHTML = `
                                    <div class=" row border border-2 align-items-center justify-content-lg-around">
                                        <div class="col-12 col-lg-2" style="width: 300px; height: 250px;">
                                            <img class="w-100 h-100" src="${product.imageUrl}" alt="" srcset="">
                                        </div>
                                        <div class="col-12 col-lg-9 py-3">
                                            <h2>Product Name: ${product.name}</h2>
                                            <h5>Product Price: ${product.price} tk</h5>
                                            <p><span class="fw-bolder fs-5">Description: </span> ${product.description}</p>    
                                        </div>
                                    </div>
                                            `;
                document
                    .getElementsByClassName("product-detail")[0]
                    .appendChild(cardDogDiv);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
    
    function cartPage(name, id, price, image) {
        let cartList = [];
        if (JSON.parse(localStorage.getItem("cartList"))  !== null) {
            console.log("RRRR:", JSON.parse(localStorage.getItem("cartList")));
            cartList = JSON.parse(localStorage.getItem("cartList"));
        }
    
        let singleCart = {
            name: name,
            id: id,
            price: price,
            image: image,
            qty: 1,
        };
        cartList.push(singleCart);
        console.log("PPPP:", cartList);
        localStorage.setItem("cartList", JSON.stringify(cartList));
    }

function filterClicked(min, max) {
    document.getElementById("all-product").style.display = "none";    
    document.getElementById("filtered-product").style.display = "block"; 
    document.getElementById("filtered-product").innerHTML = "";   

    console.log("Filter Clicked", min, max);
    axios
        .get(`http://localhost:3000/api/products/?min=${min}&max=${max}`)
        .then(function (response) {
            // handle success
            console.log(response);

            console.log("API RESPONSE:", response.data.data);
            let filterProduct = response.data.data;
            console.log("filterProduct", filterProduct);

            filterProduct.map((card, i) => {
                
                if(card.category === categoryName){
                    // dog's product card details start
                let cardDiv = document.createElement("div");
                cardDiv.innerHTML = `
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
                                        >
                                            Add Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                document
                    .getElementsByClassName("filter-product")[0]
                    .appendChild(cardDiv);
                // dog's product card details end
                }
                
                
            });

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
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

function productToCartPage() {
    window.open("http://127.0.0.1:5500/client/cart-page.html", "_self");
}
