back.addEventListener('click',(e)=>{
    location.href="/index.html"
})

register.addEventListener('click',(e)=>{
    e.preventDefault()
    var names=document.getElementById("names").value
    var lastNames=document.getElementById("lastNames").value
    var age=document.getElementById("age").value
    var email=document.getElementById("email").value
    var salary=document.getElementById("salary").value
    var password=document.getElementById("password").value
    var confirmPassword=document.getElementById("confirmPassword").value
    var frequencySalary=document.getElementById("frequencySalary").value

    var registerUser={names:names,lastNames:lastNames,age:age,email:email,
                        salary:salary,frequencySalary:frequencySalary, password:password}
    var registerUserJson=JSON.stringify(registerUser)

    if(names.length!=0 && lastNames.length!=0 && age.length!=0 && email.length!=0 && salary.length!=0 && password.length!=0){
        if(password==confirmPassword){
            if(age>=18 && age<=120){
                if(frequencySalary!="0"){
                    if(password.length>=6){
                        fetch("http://localhost:3333/signup",{
                            method:'POST',
                            headers:{
                                "Content-type":"application/json",
                            },
                            body:registerUserJson
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
                                    title: 'Ya te registraste, ahora confirma tu correo'
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
                            text: 'La contraseña debe tener al menos seis caracteres',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        }) 
                    }

                }
                else{
                    Swal.fire({
                        title: '¡Error!',
                        text: 'Debes seleccionar la frecuencia de pago',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }
            else{
                Swal.fire({
                    title: '¡Error!',
                    text: 'La edad que ingresaste no es válida',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })  
            }

        }
        else{
            Swal.fire({
                title: '¡Error!',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    }else{
        Swal.fire({
            title: '¡Error!',
            text: 'Debes llenar todos los campos',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }

})