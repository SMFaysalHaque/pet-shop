// const form = document.getElementById('contact-us-form');

// form.addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent form submission

  
// });

const form = document.getElementById('contact-us-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const comment = document.getElementById('comment').value;

  // Create an object with user data
  const userData = {
    email: email,
    comment: comment,
    firstName: firstName,
    lastName: lastName,
    phone: mobile,
    presentAddress: address
  };

  // Make a POST request using Axios
  axios.post('http://localhost:3000/api/users/contact', userData)
    .then(function(response) {
      // Handle the response here
      console.log("xxx:", response.data);
      if (response.status === 200) {
        alert("Login successful!!!")
        localStorage.setItem('isLoggedIn', true);
        const name = getUserNameFromToken(response.data.token)
        localStorage.setItem('userName', name);
        window.open("http://127.0.0.1:5500/client/home.html","_self")
        // sign up and sign in button will be hidden and logout-name will show.
      }
    //   response.status
    })
    .catch(function(error) {
      // Handle the error here
      console.error(error);
      alert ("Enter valid email and password!!!")
    });
});

function submitForm(){
    

  if(firstName === "" || mobile === "" || lastName === "" || email === "" || address === "" || comment === ""){
    alert("Fill up all input file!!!")
  } else{
    alert("Form submitted successfully!!!")
  }
}