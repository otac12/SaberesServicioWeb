
VerUsuario();

function AgregarUsuario (){

    PonerFormulario("AgregarUsuario");
    
};

function EnviarUsuario(){
    json = {
        "Nombre":document.getElementById("Nombre").value,
        "Tipo":document.getElementById("Tipo").value,
        "Contrasena":document.getElementById("Contrasena").value
    }

    console.log(json);

    fetch(origen+"/php/GuardarUsuario.php",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(json)
    }).then(error => {
        if (!error.ok) {
          throw new Error('La respuesta no fue satisfactoria');
        }
        return error.text();
    }).then(respuesta => {
        if(respuesta == "Exito"){
            QuitarFormulario();
            pop('Se creo el elemento','exito');
        }else{
            pop('Ups hubo un error','error');
        }
    });
}

function VerUsuario (){

    fetch(origen+"/php/VerUsuario.php").then(error => {
        if (!error.ok) {
          throw new Error('La respuesta no fue satisfactoria');
        }
        return error.text();
    }).then(respuesta => {
        console.log(respuesta);
        json = JSON.parse(respuesta);
        array = json.Usuario;
        cuerpo = document.getElementById("Contenido");

        array.forEach(element => {
            tr = document.createElement('tr');
            Nombre = document.createElement('th');
            Usuario = document.createElement('th');

            Nombre.innerText = element.Nombre;
            Usuario.innerText = element.Nombre;

            Contrasena = document.createElement('th');
            Contrasena.innerText = element.Contrasena;

            Tipo = document.createElement('th');
            Tipo.innerText = element.Tipo_Usuario;

            tr.appendChild(Nombre);
            tr.appendChild(Usuario);
            tr.appendChild(Contrasena);
            tr.appendChild(Tipo);

            cuerpo.appendChild(tr);
        });
    });


}