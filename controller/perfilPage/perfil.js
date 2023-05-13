spends.addEventListener('click',(e)=>{
    location.href="/views/registerSpend/registerSpend.html"
})

balance.addEventListener('click',(e)=>{
    location.href="/views/balancePage/balance.html"
})

home.addEventListener('click',(e)=>{
    location.href="/views/homePage/home.html"
})

notification.addEventListener('click',(e)=>{
    location.href="/views/notificationPage/notification.html"
})

user.addEventListener('click',(e)=>{
    location.href="/views/perfilPage/perfil.html"
})

fetch("http://localhost:3333/getData")
.then(response =>{
    if(response.ok){
        response.json()
        .then(data=>{
            document.getElementById("name").value=data[0]
            document.getElementById("email").value=data[1]
            document.getElementById("salary").value=data[2]
            document.getElementById("frequencySalary").value=data[3]
        })
    }
    else{
        Swal.fire({
            title: '¡Error!',
            text: "No se pudieron obtener los datos del usuario",
            icon: 'error',
            confirmButtonText: 'OK',
        })   
    }
})



logout.addEventListener('click',(e)=>{
    fetch("http://localhost:3333/logout",{
        method:'POST',
        headers:{
            "Content-type":"application/json",
        },
    })
    .then(response=>{
        if(response.ok){
            Swal.fire({
                title: '¡Cuidado!',
                text: "¿Seguro deseas cerrar la sesión?",
                icon: 'warning',
                confirmButtonText: 'OK',
                showCancelButton: true,
            }).then((result)=>{
                if(result.isConfirmed){
                    location.href="/index.html"
                }
            })
            
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