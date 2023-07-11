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




// const form = document.getElementById("form")
// form.addEventListener('submit', async function(e) {
//     e.preventDefault();

//     const formData = new FormData(form);
//     console.log([...formData]);
//     alert("Successfully Sign Up!!!")
    
//     try {
//         const res = await axios.post('http://localhost:3000/api/users/register', formData)
//         console.log(res);
//     } catch(e){
//         console.log(e);
//     }
// })



const form = document.getElementById('signup-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Create an object with user data
  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  };

  // Make a POST request using Axios
  axios.post('http://localhost:3000/api/users/register', userData)
    .then(function(response) {
      // Handle the response here
      console.log("xxx:", response.status);
      if (response.status === 200) {
        alert("User registration successful!!!")
        // go to home page
        
      }
      response.status
    })
    .catch(function(error) {
      // Handle the error here
      console.error(error);
    });
});