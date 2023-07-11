async function searchClickHandler() {
    let searchText = document.getElementById("searchText").value;
    searchText = searchText.trim();
    if (searchText.length === 0) {
        return;
    }
    const response = await axios.get("http://localhost:3000/api/products");
    const products = response.data.data;
    let result = products.filter((product) => {
        const name = product.name.toLowerCase();
        return name.includes(searchText.toLowerCase());
    });
    console.log("KKK:", result);

    for (let i = 0; i < result.length; i++) {
        let item = result[i];
        console.log("QQQ:", item);
        let searchDiv = document.createElement("div");
        searchDiv.innerHTML = `
                    <div class="col">
                        <div class="card">
                            <!-- code in dogProducts.js file -->
                            <img
                                src="${item.imageUrl}"
                                class="card-img-top w-100 h-25"
                                alt="..."
                            />
                            <div class="card-body">
                                <h5 
                                class="card-title"
                                style="
                                        height: 70px;
                                        overflow: hidden;
                                    "
                                >${item.name}</h5>
                                <div
                                    class="cart-button-price-area d-flex flex-column flex-md-row align-content-center"
                                >
                                    <h3 class="d-inline me-auto">
                                        ${item.price} tk
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
        document
            .getElementsByClassName("search-result")[0]
            .appendChild(searchDiv);
    }
}
function cartPage() {
    window.open("http://127.0.0.1:5500/client/cart-page.html", "_self");
}
