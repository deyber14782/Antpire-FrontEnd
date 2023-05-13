back.addEventListener('click',(e)=>{
    location.href="/index.html"
})

login.addEventListener('click',(e)=>{
    e.preventDefault()
    var email=document.getElementById("email").value
    var password=document.getElementById("password").value
    var loginUser={email:email,password:password}
    var loginUserJson=JSON.stringify(loginUser)
    fetch("http://localhost:3333/login",{
        method:'POST',
        headers:{
            "Content-type":"application/json",
        },
        body:loginUserJson
    })
    .then(response=>{
        if(response.ok){
            location.href="/views/homePage/home.html"
        }
        else{
            response.json().then(text=>Swal.fire({
                title: '¡Error!',
                text: JSON.stringify(text.message),
                icon: 'error',
                confirmButtonText: 'OK'

            }))
        }
    })
    
})

recovery.addEventListener('click',(e)=>{
    location.href="/views/recoveryPage/recovery.html"
})