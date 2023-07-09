const form = document.getElementById("form")
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    console.log([...formData]);
    
    try {
        const res = await axios.post('http://localhost:3000/api/users/login', formData)
        console.log(res);
    } catch(e){
        console.log(e);
    }
})