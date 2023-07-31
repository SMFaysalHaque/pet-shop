async function getCategories() {
    const response = await axios.get(
        "http://localhost:3000/api/products/categories"
    );
    return response.data.data.map((category) => {
        return category.name;
    });
}
const categoryNames = await getCategories();

let homeAllProducts = document.createElement("div");

// async function buildHomePage(categoryNames) {
//     for (let categoryName of categoryNames) {
//         console.log("QQQ", categoryName);

//         axios
//             .get(
//                 `http://localhost:3000/api/products/categories/${categoryName}`
//             )
//             .then(function (response) {
//                 // handle success
//                 console.log("API RESPONSE:", response.data.data);
//                 let productDetail = response.data.data;

//                 let categoryProducts = document.createElement("div");
//                 productDetail.map((card, i) => {
//                     let id = card._id;
//                     // dog's product card details start
//                     let singleProduct = document.createElement("div");
//                     singleProduct.innerHTML = `
//                     <div onclick="productDetail('${id}')" class="col">
//                         <div class="card">
//                             <img
//                                 src="${card.imageUrl}"
//                                 class="card-img-top w-100 h-100"
//                                 alt="..."
//                             />
//                             <div class="card-body">
//                                 <h5
//                                 class="card-title"
//                                 style="
//                                         height: 70px;
//                                         overflow: hidden;
//                                     "
//                                 >${card.name}</h5>
//                                 <p
//                                     class="card-text"
//                                     style="
//                                         height: 190px;
//                                         overflow: hidden;
//                                     "
//                                 >
//                                     ${card.description}
//                                 </p>
//                                 <div
//                                     class="cart-button-price-area d-flex flex-column flex-md-row align-content-center"
//                                 >
//                                     <h3 class="d-inline me-auto">
//                                         ${card.price} tk
//                                     </h3>
//                                     <button
//                                         type="button"
//                                         class="btn btn-primary"
//                                         id="cart-btn"
//                                         onclick="cartPage()"
//                                     >
//                                         Add Cart
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     `;
//                     if (i < 4) {
//                         categoryProducts.appendChild(singleProduct);
//                     }
//                 });

//                 homeAllProducts.appendChild(categoryProducts);
//                 console.log(homeAllProducts);
//             })
//             .catch(function (error) {
//                 // handle error
//                 console.log(error);
//             })
//             .finally(function () {
//                 // always executed
//             });
//     }
// }

// await buildHomePage (categoryNames)
// console.log("Home All Products:", homeAllProducts);

async function fetchData() {
    for (let categoryName of categoryNames) {
        console.log("QQQ", categoryName);

        try {
            const response = await axios.get(
                `http://localhost:3000/api/products/categories/${categoryName}`
            );
            console.log("API RESPONSE:", response.data.data);
            let products = response.data.data;

            let categoryProductsAll = document.createElement("div");
            let categoryProducts = document.createElement("div");
            products.map((card, i) => {
                let id = card._id;
                // dog's product card details start
                let singleProduct = document.createElement("div");
                console.log("DETAIL:", detail);
                singleProduct.innerHTML = `
          <div class="col">
            <div class="card">
              <img
                src="${card.imageUrl}"
                class="card-img-top w-100 h-100"
                alt="..."
              />
              <div class="card-body">
                <div onclick="detail('${id}')">
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
                    id="cart-btn"
                    onclick="cartPage('${card.name}', '${id}', '${card.price}', '${card.imageUrl}')"
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          `;
                // document.getElementById ("btnsave").addEventListener ("click", resetEmotes, false);
                if (i < 4) {
                    categoryProducts.appendChild(singleProduct);
                }
            });

            categoryProductsAll.innerHTML = `
                <div class="container mt-5 mb-5">
                    <div class="view-all-product-area d-flex mb-3">
                        <h3 class="me-auto">${categoryName} Products</h3>
                        <!-- 
                        <a
                            class="btn btn-outline-primary rounded-pill px-3"
                            href="./dog-page.html"
                            role="button"
                            >View More</a>
                        -->
                        
                    </div>
                    <div
                        class="row row-cols-2 row-cols-lg-4 g-2 h-25"
                    >
                    ${categoryProducts.innerHTML}
                    </div>
                </div>
                    `;

            homeAllProducts.appendChild(categoryProductsAll);
            console.log(homeAllProducts);
        } catch (error) {
            // handle error
            console.log(error);
        }
    }
}

// Call the fetchData function to initiate the API calls and wait for them to finish
await fetchData();
console.log("Hm al pd:", homeAllProducts);
document.getElementById("all-home-product").appendChild(homeAllProducts);


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
                onclick="categoryPage()"
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


function categoryPage() {
    console.log("Product index:");
}