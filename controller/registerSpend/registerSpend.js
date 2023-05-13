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

registerSpend.addEventListener('click',(e)=>{
    e.preventDefault()

    var nameSpend=document.getElementById('nameSpend').value
    var priceSpend=document.getElementById('priceSpend').value
    var priority=document.getElementById('priority').value

    var registerSpend={nameSpend:nameSpend,priceSpend:priceSpend,priority:priority}
    var registerSpendJson=JSON.stringify(registerSpend)

    if(nameSpend.length!=0 && priceSpend.length!=0){
        if(priority!="0"){
            if(priceSpend>=50){
                fetch("http://localhost:3333/registerSpend",{
                    method:'POST',
                    headers:{
                        "Content-type":"application/json",
                    },
                    body:registerSpendJson
                })
                .then(response=>{
                    if(response.ok==true){
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
                            title: 'El gasto fue registrado de forma correcta'
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
            }
            else{
                Swal.fire({
                    title: '¡Error!',
                    text: 'El precio que ingresaste no es válido',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
        else{
            Swal.fire({
                title: '¡Error!',
                text: 'Debes seleccionar la prioridad del gasto',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
    else{
        Swal.fire({
            title: '¡Error!',
            text: 'Debes llenar todos los campos',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
})