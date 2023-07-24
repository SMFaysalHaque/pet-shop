function addCategoryApi() {
    const token = localStorage.getItem("admin");
    if (!token) {
        alert("Please sign in!!!");
        window.open("http://127.0.0.1:5500/client/admin.html", "_self");
        return;
    }
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const categoryName = document.getElementById("categoryName").value;
    const bodyParameters = {
        name: categoryName,
        imageUrl: "test.com",
    };

    axios.post(
        "http://localhost:3000/api/products/categories",
        bodyParameters,
        config
    )
        .then(function (response) {
            console.log("xxx:", response.data);
            if (response.status === 200) {
                addCategory()
            }
        })
        .catch(function(error) {

            console.error(error);
            alert (error.response.data.message)
          });
}

// Array to store categories and their foods
let categories = [];

function addCategory() {
    const categoryName = document.getElementById("categoryName").value;

    // Check if the category name is empty
    if (categoryName.trim() === "") {
        alert("Please enter a category name");
        return;
    }

    // Create a new category object
    const category = {
        name: categoryName,
        foods: [],
    };

    // Add the category to the categories array
    categories.push(category);

    // Clear the input field
    document.getElementById("categoryName").value = "";

    // Update the category list and count board
    updateCategoryList();
    updateCategoryCount();
}

function updateCategoryList() {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = "";

    // Loop through each category
    categories.forEach((category, index) => {
        const categoryItem = document.createElement("p");
        categoryItem.innerHTML = `
      <h3>${category.name}</h3>
      <div>
        <input type="text" id="foodName${index}" placeholder="Food Name">
        <input type="text" id="foodDescription${index}" placeholder="Food Description">
        <input type="number" id="foodPrice${index}" placeholder="Food Price">
        <input type="number" id="foodInventory${index}" placeholder="Food Inventory">
        <input type="file" id="foodPhoto${index}" accept="image/*">
        <button class="btn btn-primary" onclick="addFood(${index})">Add Food</button>
        <button class="btn btn-danger" onclick="deleteCategory(${index})">Delete Category</button>
      </div>

      <table class="table table-hover table-bordered table-striped my-2">
  <thead>
    <tr>
      <!-- <th scope="col">#</th> -->
      <th>S. No.</th>
      <th>Name</th>
      <th class="w-25">Description</th>
      <th>Price</th>
      <th>Inventory</th>
      <th>Image</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody id="foodList${index}">
  </tbody>
</table>
      <p ></p>
    `;
        categoryList.appendChild(categoryItem);

        // Update the food list for the respective category
        updateFoodList(index);
    });
}

function updateCategoryCount() {
    const categoryCountBoard = document.getElementById("categoryCountBoard");
    categoryCountBoard.innerHTML = "";

    // Loop through each category
    categories.forEach((category, index) => {
        const categoryCount = category.foods.length;
        const categoryCountItem = document.createElement("div");
        categoryCountItem.innerHTML = `
    <div class="categoryCountBoard fw-bolder"><h1>${
        category.name
    }</h1> <h5>${categoryCount} ${
            categoryCount === 1 ? "product" : "products"
        }</h5></div>
    `;

        categoryCountBoard.appendChild(categoryCountItem);
    });
}

function addFood(categoryIndex) {
    const foodName = document.getElementById(`foodName${categoryIndex}`).value;
    const foodDescription = document.getElementById(
        `foodDescription${categoryIndex}`
    ).value;
    const foodPrice = parseFloat(
        document.getElementById(`foodPrice${categoryIndex}`).value
    );
    const foodInventory = parseFloat(
        document.getElementById(`foodInventory${categoryIndex}`).value
    );
    const foodPhoto = document.getElementById(`foodPhoto${categoryIndex}`)
        .files[0];

    // Check if any value is empty
    if (
        foodName.trim() === "" ||
        foodDescription.trim() === "" ||
        isNaN(foodPrice) ||
        isNaN(foodInventory) ||
        foodPhoto === undefined
    ) {
        alert("Please fill in all the food details!!!");
        return;
    }

    // Create a new food object
    const food = {
        name: foodName,
        description: foodDescription,
        price: foodPrice,
        inventory: foodInventory,
        photo: foodPhoto,
    };

    // Add the food to the respective category's foods array
    categories[categoryIndex].foods.push(food);

    // Clear the input fields
    document.getElementById(`foodName${categoryIndex}`).value = "";
    document.getElementById(`foodDescription${categoryIndex}`).value = "";
    document.getElementById(`foodPrice${categoryIndex}`).value = "";
    document.getElementById(`foodInventory${categoryIndex}`).value = "";
    document.getElementById(`foodPhoto${categoryIndex}`).value = "";

    // Update the food list for the respective category
    updateFoodList(categoryIndex);

    // Update the category count
    updateCategoryCount();
}

function updateFoodList(categoryIndex) {
    const foodList = document.getElementById(`foodList${categoryIndex}`);
    foodList.innerHTML = "";

    // Loop through each food in the category
    categories[categoryIndex].foods.forEach((food, foodIndex) => {
        const foodItem = document.createElement("tr");
        foodItem.innerHTML = `
    <!-- <th scope="row">1</th> -->
      <th scope="col">${foodIndex + 1}</th>
      <td class="text-break">${food.name}</td>
      <td class="text-break">${food.description}</td>
      <td>${food.price.toFixed(2)} BDT</td>
      <td>${food.inventory}</td>
      <td><img src="${
          food.photo ? URL.createObjectURL(food.photo) : ""
      }" alt="Food Photo" class="food-photo"></td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteFood(${categoryIndex}, ${foodIndex})">Delete</button></td>
    `;

        foodList.appendChild(foodItem);
    });
}

function deleteFood(categoryIndex, foodIndex) {
    categories[categoryIndex].foods.splice(foodIndex, 1);
    updateFoodList(categoryIndex);
    updateCategoryCount();
}

function deleteCategory(categoryIndex) {
    categories.splice(categoryIndex, 1);
    updateCategoryList();
    updateCategoryCount();
}
