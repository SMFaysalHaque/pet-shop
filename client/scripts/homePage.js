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
                console.log("DETAIL:",detail);
                singleProduct.innerHTML = `
          <div onclick="detail('${id}')" class="col">
            <div class="card">
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
                    onclick="cartPage(${card.name}, ${card.description}, ${card.price}, ${card.imageUrl})"
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

// cat
// axios
//     .get("http://localhost:3000/api/products/categories/Cat")
//     .then(function (response) {
//         // handle success
//         console.log("API RESPONSE:", response.data.data);
//         let productDetail = response.data.data;

//         productDetail.map((card, i) => {
//             let id = card._id;
//             // dog's product card details start
//             let cardCatDiv = document.createElement("div");
//             cardCatDiv.innerHTML = `
//                     <div onclick="productDetail('${id}')" class="col">
//                         <div class="card">
//                             <!-- code in dogProducts.js file -->
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
//             if (i < 4) {
//                 document
//                     .getElementsByClassName("card-cat-main")[0]
//                     .appendChild(cardCatDiv);
//             }
//         });
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .finally(function () {
//         // always executed
//     });

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
                                      <div>
                                          <button class="btn btn-primary w-25" type="submit">Add Cart</button>
                                      </div>    
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

function cartPage(name, description, price, image) {
  let cartList = [] ? localStorage.getItem("cartList", cartList) : ""
  let singleCart = {
    name: name,
    description: description,
    price: price,
    image: image
  }
  cartList.push(singleCart)
  localStorage.setItem("cartList", cartList)
  
    window.open("http://127.0.0.1:5500/client/cart-page.html", "_self");
}
