function logInUser(){
    let isLoggedIn = localStorage.getItem('isLoggedIn')
    if ( isLoggedIn === "true" ) {
        document.getElementById("name-logout").style.display = "inline-block";
        document.getElementById("signIn-signUp").style.display = "none";
    }

    let userName = localStorage.getItem('userName')
    if ( userName.length > 0 ) {
        document.getElementById("userName").innerHTML = userName;
    }
}
logInUser()

function logOutUser(){
    let isLoggedIn = localStorage.getItem('isLoggedIn')
    if ( isLoggedIn === "false" ) {
        document.getElementById("name-logout").style.display = "none";
        document.getElementById("signIn-signUp").style.display = "inline-block";
    }
}
logOutUser()

function logOutClickHandler() {
    console.log("hee");
    localStorage.setItem('isLoggedIn', false);
    logOutUser()
    localStorage.setItem('userName', "");
    localStorage.setItem('userToken', "");
}