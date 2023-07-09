// // let name = document.getElementById("name");
// let emailInput = document.getElementById("exampleFormControlInput1");
// let passwordInput = document.getElementById("inputPassword");
// let btn = document.getElementById("btn");

// btn.addEventListener("click", () => {
//     // let name = name.value; 
//     let email = emailInput.value;
//     let password = passwordInput.value;

//     axios.post("http://localhost:3000/api/users/register", {
//         // name: name,
//         email: email,
//         password: password
//     })
//     .then((response) => {
//         console.log("API RESPONSE:", response.data.data);
//       console.log(response);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     });
// });




const form = document.getElementById("form")
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    console.log([...formData]);
    
    try {
        const res = await axios.post('http://localhost:3000/api/users/register', formData)
        console.log(res);
    } catch(e){
        console.log(e);
    }
})