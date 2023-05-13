back.addEventListener('click',(e)=>{
    location.href="/views/loginPage/login.html"
})

recovery.addEventListener('click',(e)=>{
    e.preventDefault()
    var email=document.getElementById("email").value
    var recoverPassword={email:email}
    var recoverPasswordJson=JSON.stringify(recoverPassword)
    fetch("http://localhost:3333/recover",{
        method:'POST',
        headers:{
            "Content-type":"application/json",
        },
        body:recoverPasswordJson
    })
    .then(response=>{
        if(response.ok){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'El correo de restablecimiento ya fue enviado a tu correo'
              })
            document.getElementById('form').reset()
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