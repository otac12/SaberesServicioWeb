
VerDatosStock();

function AgregarStock(){
   PonerFormulario("AgregarStock");
}

function PonerFormulario(Formulario){
    console.log("/Estructura/Formulario/"+Formulario+".html");
    fetch(origen+"/Estructura/Formulario/"+Formulario+".html")
    .then(response => {
        if (!response.ok) {
             throw new Error('Error al cargar el archivo HTML: ' + response.statusText);
        }
            return response.text();
        })
    .then(htmlContent => {
            document.body.innerHTML += htmlContent;
            document.getElementById('Icono').addEventListener('change',CambiarImagen);
    });
}

function QuitarFormulario(){
    Div = document.getElementById("Fondo");

    if(Div != null){
        Div.remove();
    }
}

function CambiarImagen(event){
    valor = event.target.value;
    direccion = "../../css/Rescursos/"+valor+".png";
    document.getElementById('Muestra').src = direccion;
}

function GuardarStock(){
    json = {
        "Usuario":document.getElementById("Usuario").value,
        "Nombre":document.getElementById("Nombre").value,
        "Tipo":document.getElementById("Tipo").value,
        "Cantidad":document.getElementById("Cantidad").value,
        "Icono":document.getElementById("Icono").value
    }

    console.log(json);

    fetch(origen+"/php/GuardarStock.php",{
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

function VerDatosStock(){
    fetch(origen+"/php/DatosStock.php").then(error => {
        if (!error.ok) {
          throw new Error('La respuesta no fue satisfactoria');
        }
        return error.text();
    }).then(respuesta => {
        console.log(respuesta);
        json = JSON.parse(respuesta);
        Visualizar("Equipo",json.Equipo);
        Visualizar("Componentes",json.Componentes);
        VisualizarDisponible(json.Libre,json.Ocupados,json.Componentes);
    });
}

function Visualizar(Tipo,list){

    if(Tipo == 'Equipo'){

        var Cantidad = 0;
        var CantidadHerramienta=0;

        console.log('Numero'+Tipo);
        Numero = document.getElementById('Numero'+Tipo);
        NumeroHerramienta = document.getElementById('NumeroHerramienta');

        Informacion = document.getElementById('Informacion'+Tipo);
        InformacionHerramienta = document.getElementById('InformacionHerramienta');

        list.forEach(element => {

            img = document.createElement('img');
            direccion = "../../css/Rescursos/"+element.Icono+".png";
            img.src = direccion;

            if(element.Tipo == "Equipo"){
                Cantidad = Cantidad +1;
                Informacion.appendChild(img);
            }if (element.Tipo  == "Herramienta") {
                CantidadHerramienta = CantidadHerramienta +1;
                InformacionHerramienta.appendChild(img);
            }
        });

        Numero.innerText = Cantidad;
        NumeroHerramienta.innerText = CantidadHerramienta;
    }else{

        Numero = document.getElementById('Numero'+Tipo); 
        Informacion = document.getElementById('Informacion'+Tipo);

        Numero.innerText = list.length;

        list.forEach(element => {
            img = document.createElement('img');
            direccion = "../../css/Rescursos/"+element.Icono+".png";
            img.src = direccion;
            Informacion.appendChild(img); 
        });
    }
    
    
}

function VisualizarDisponible(Disponible,NoDisponible,Componentes){
    tabla = document.getElementById('StatusDisponible');
    tabla2 = document.getElementById('StatusNoDisponible');
    tabla3 = document.getElementById('StatusComponentes');
    if(Disponible != null){
        Disponible.forEach(element=>{
            p = document.createElement("p");
            if(element.Tipo == "Equipo"){
                p.innerText = element.Nombre;
                document.getElementById('DEquipo').appendChild(p);
            }if (element.Tipo  == "Herramienta") {
                p.innerText = element.Nombre;
                document.getElementById('DHerramienta').appendChild(p);
            }
        });
    };

    if(NoDisponible != null){
        NoDisponible.forEach(element=>{
            p = document.createElement("p");
            if(element.Tipo == "Equipo"){
                p.innerText = element.Nombre;
                document.getElementById('OEquipo').appendChild(p);
            }if (element.Tipo  == "Herramienta") {
                p.innerText = element.Nombre;
                document.getElementById('OHerramienta').appendChild(p);
            }
        });
    };

    if(Componentes != null){
        Componentes.forEach(element=>{
            p = document.createElement("p");
            p.innerText = element.Nombre;
            document.getElementById('CNombre').appendChild(p);

            div = document.createElement('div');
            img = document.createElement('img');
            img.id = element.Id_Componente;
            img.src = "../../css/Rescursos/Editar.svg";
            img.addEventListener('click',EditarComponente);

            p2 = document.createElement("p");
            p2.innerText = element.Cantidad;
            p2.id = "Numero"+element.Id_Componente;

            div.appendChild(p2);
            div.appendChild(img);

            document.getElementById("CCantidad").appendChild(div);

        });
    };
    
}

function EditarComponente(event){
    id= event.target.id;

    Cantidad = document.getElementById("Numero"+id).innerText;
    Padre = document.getElementById("Numero"+id).parentNode;
    Input = document.createElement('input');
    Input.type = "num";
    Input.value = Cantidad;

    Padre.replaceChild(Input,document.getElementById("Numero"+id));
    document.getElementById(id).src = "../../css/Rescursos/Guardar.svg";
    document.getElementById(id).removeEventListener('click',EditarComponente);
    document.getElementById(id).addEventListener('click',function(event){
        console.log("Se envio informacion con id "+event.target.id);
    });
}