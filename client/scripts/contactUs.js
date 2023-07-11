// const form = document.getElementById('contact-us-form');

// form.addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent form submission

  
// });

function submitForm(){
    const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const comment = document.getElementById('comment').value;

  if(firstName === "" || lastName === "" || email === "" || address === "" || comment === ""){
    alert("Fill up all input file!!!")
  } else{
    alert("Form submitted successfully!!!")
  }
}