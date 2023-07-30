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
