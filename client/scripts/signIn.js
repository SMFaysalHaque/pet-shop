function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getUserNameFromToken(token) {
    const decoded = parseJwt (token);
    console.log(decoded);
    const name = decoded.firstName || "user"
    return name
}

const form = document.getElementById('signIn-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Create an object with user data
  const userData = {
    email: email,
    password: password
  };

  // Make a POST request using Axios
  axios.post('http://localhost:3000/api/users/login', userData)
    .then(function(response) {
      // Handle the response here
      console.log("xxx:", response.data);
      if (response.status === 200) {
        alert("Login successful!!!")
        localStorage.setItem('isLoggedIn', true);
        const username = getUserNameFromToken(response.data.token);
        localStorage.setItem('userName', username);
        localStorage.setItem('userToken', response.data.token);
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

