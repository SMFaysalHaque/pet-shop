const form = document.getElementById('admin-login-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = {
    email: email,
    password: password
  };

  axios.post('http://localhost:3000/api/admin/login', userData)
    .then(function(response) {

      console.log("xxx:", response.data);
      if (response.status === 200) {
        alert("Login successful!!!")
        localStorage.setItem('admin', response.data.token);
        window.open("http://127.0.0.1:5500/client/admin-panel.html","_self")
      }
    })
    .catch(function(error) {

      console.error(error);
      alert ("Enter valid email and password!!!")
    });
});