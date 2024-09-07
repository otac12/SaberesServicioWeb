console.log("Paquetes cargados");

document.addEventListener('DOMContentLoaded',function(){
    var IniciarSesion = document.getElementById("contrasena");

    IniciarSesion.addEventListener("keyup",function(e){
        if(e.key === "Enter"){
        document.getElementById("botoningresar").click();
        };
    }); 
});

function ingresar(){
        var correo = document.getElementById('correo').value;
        var contrasenausuario = document.getElementById('contrasena').value;

        var datos = JSON.stringify({
            usuario : correo,
            contrasena : contrasenausuario
        });

        console.log("datos en json:"+datos);

        fetch('php/Ingresar.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body:datos
        }).then(response => {
            if (!response.ok) {
              throw new Error('La respuesta no fue satisfactoria');
            }
            return response.text();
          }).then(data=>{
            console.log(data);
            Respuesta = JSON.parse(data);

            if(Respuesta.Status == "exito"){
                if(Respuesta.msg== 'Administrador'){
                    window.location.href = "Estructura/Admin.php";
                }else if (Respuesta.msg== 'Investigador'){
                    window.location.href = "Estructura/Investigador.php";
                }
            }else{
                pop(Respuesta.msg,'error');
            } 
        })
}