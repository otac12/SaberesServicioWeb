origen = window.location.origin;

Stock()
VerDatosStock();

function CerrarSesion(){
    id = document.body.getAttribute('session');

    fetch(origen+'/php/CerrarSesion.php',{
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            "ID":id
        })
    }).then(status=>{
        if (!status.ok) {
            throw new Error('La respuesta no fue satisfactoria');
        }
        return status.text();
    }).then(respuesta=>{
        window.location.reload();
    });
};

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

            Icono = document.getElementById('Icono');

            if(Icono != null){
                Icono.addEventListener('change',CambiarImagen);
            }
            
    });
}

function QuitarFormulario(){
    Div = document.getElementById("Fondo");

    if(Div != null){
        Div.remove();
        window.location.href = window.location;
    }
}

function Stock(){

    Boton = document.getElementById('VerStock');

    Boton.style.backgroundColor = "var(--Principal)";
    Boton.style.color = "white";

    fetch(origen+'/Estructura/Ventanas/StockInvestigador.html')
        .then(response => {
            if (!response.ok) {
                 throw new Error('Error al cargar el archivo HTML: ' + response.statusText);
            }
                return response.text();
            })
        .then(htmlContent => {
                const div = document.getElementById('Cuerpo');
                div.innerHTML += htmlContent;
                
                Etiqueta = document.createElement('link');
                Etiqueta.id = "StyleStock";
                Etiqueta.rel = "Stylesheet";
                Etiqueta.type = "text/css";
                Etiqueta.href = "../css/Stock.css";

                Js = document.createElement('script');
                Js.id = "ScryptStock";
                Js.src = "../js/Investigador.js";

                document.head.appendChild(Etiqueta);
                document.head.appendChild(Js);
        });
};

function VerDatosStock(){
    fetch(origen+"/php/DatosStock.php").then(error => {
        if (!error.ok) {
          throw new Error('La respuesta no fue satisfactoria');
        }
        return error.text();
    }).then(respuesta => {
        console.log(respuesta);
        json = JSON.parse(respuesta);
        Visualizar("Equipo",json.Libre);
        Visualizar("Componentes",json.Componentes);
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
            img.id = element.Id_Equipo+"-"+ element.Nombre;

            if(element.Tipo == "Equipo"){
                Cantidad = Cantidad +1;
                img.addEventListener("click",function(e){
                    AgregarCarrito(e.target.id,"Equipo")
                });
                Informacion.appendChild(img);
            }if (element.Tipo  == "Herramienta") {
                CantidadHerramienta = CantidadHerramienta +1;
                img.addEventListener("click",function(e){
                    AgregarCarrito(e.target.id,"Herramienta")
                });
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
            img.id = element.Id_Componente +"-"+ element.Nombre+"-"+element.Cantidad;
            img.addEventListener("click",function(e){
                AgregarCarrito(e.target.id,"Componente")
            });
            Informacion.appendChild(img); 
        });
    }
    
    
}

function AgregarCarrito(id,tipo){
    console.log("Se Agrego a la lista");
    if(tipo == "Herramienta"){
        box = document.getElementById('Herramienta');
        div = document.createElement('div');
        p = document.createElement('p');
        Boton = document.createElement('button');
        
        datos = id.split("-");
        div.id = "Info"+datos[0];
        p.id = datos[0];
        p.innerText = id ;

        Boton.id = id
        Boton.innerText = "Borrar";
        Boton.addEventListener('click',function(e){
            data = e.target.id;
            dat = data.split("-");

            BorraDato(dat[0]);
        });

        if(ValidarDato("Herramienta",datos[0])==true){
            div.appendChild(p);
            div.appendChild(Boton);

            box.appendChild(div);
        }

    };

    if(tipo == "Componente") {
        box = document.getElementById('Componentes');
        div = document.createElement('div');
        p = document.createElement('p');
        Boton = document.createElement('button');
        
        datos = id.split("-");
        div.id = "Info"+datos[0];
        p.id = datos[0]+"Componente";
        p.innerText = datos[0]+"-"+ datos[1]+"-"+1;

        Boton.id = id
        Boton.innerText = "Borrar";
        Boton.addEventListener('click',function(e){
            data = e.target.id;
            dat = data.split("-");

            BorraDato(dat[0]);
        });

        if(ValidarDato("Componentes",datos[0])==true){
            div.appendChild(p);
            div.appendChild(Boton);

            box.appendChild(div);
        }else{
            console.log('Se Repite');
            console.log('Datos');
            p= document.getElementById(datos[0]+"Componente");
            dato = p.innerText.split('-');
            if(Number(dato[2]) + 1 < Number(datos[2])){
                p.innerText = datos[0]+"-"+ datos[1]+"-"+(Number(dato[2]) + 1);
            }
        }
    };

    if(tipo == "Equipo"){

        box = document.getElementById('Equipo');
        div = document.createElement('div');
        p = document.createElement('p');
        Boton = document.createElement('button');
        
        datos = id.split("-");
        div.id = "Info"+datos[0];
        p.id = datos[0];
        p.innerText = id ;

        Boton.id = id
        Boton.innerText = "Borrar";
        Boton.addEventListener('click',function(e){
            data = e.target.id;
            dat = data.split("-");

            BorraDato(dat[0]);
        });

        if(ValidarDato("Equipo",datos[0])==true){
            div.appendChild(p);
            div.appendChild(Boton);

            box.appendChild(div);
        }
    };
}

function ValidarDato(Tipo,id){
    Linea = document.getElementById(Tipo);
    elemntos = Linea.children;

    for (let index = 1; index < elemntos.length; index++) {
        
        if(elemntos[index].id == "Info"+id){
            return false;
        }
    }

    return true;
}

function BorraDato(id){
    elemt = document.getElementById('Info'+id);
    
    if(elemt != null){
        elemt.remove();
    }
}