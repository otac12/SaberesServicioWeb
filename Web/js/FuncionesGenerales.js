origen = window.location.origin;

document.addEventListener('DOMContentLoaded',(event)=>{
    Stock();

     BotonStock = document.getElementById('VerStock');
     BotonUsuario = document.getElementById('VerUsuario');

     BotonStock.addEventListener("click",function(){
        BorrarContenido();
        Stock();
     });

     BotonUsuario.addEventListener("click",function(){
        BorrarContenido();
        Usuario();
     });
});

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

function Stock(){

    Boton = document.getElementById('VerStock');

    Boton.style.backgroundColor = "var(--Principal)";
    Boton.style.color = "white";

    fetch(origen+'/Estructura/Ventanas/Stock.html')
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
                Js.src = "../js/Stock.js";

                document.head.appendChild(Etiqueta);
                document.head.appendChild(Js);

        });
};

function Usuario (){

    Boton = document.getElementById('VerUsuario');

    Boton.style.backgroundColor = "var(--Principal)";
    Boton.style.color = "white";

    fetch(origen+'/Estructura/Ventanas/Usuario.html')
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
                Etiqueta.id = "StyleUsuario";
                Etiqueta.rel = "Stylesheet";
                Etiqueta.type = "text/css";
                Etiqueta.href = "../css/Usuario.css";

                Js = document.createElement('script');
                Js.id = "ScryptUsuario";
                Js.src = "../js/Usuario.js";

                document.head.appendChild(Etiqueta);
                document.head.appendChild(Js);
        });
};

function BorrarContenido(){

    Boton = document.getElementById('VerUsuario');

    Boton.style.backgroundColor = "";
    Boton.style.Color = "";

    Boton = document.getElementById('VerStock');

    Boton.style.backgroundColor = "";
    Boton.style.Color = "";

    Cuerpo = document.getElementById('Cuerpo');
    StyleStock = document.getElementById('StyleStock');
    StyleUsuario = document.getElementById('StyleUsuario');

    ScryptStock = document.getElementById('ScryptStock');
    ScryptUsuario = document.getElementById('ScryptUsuario')

    Cuerpo.innerHTML = '';

    if(StyleStock != null){
        StyleStock.remove();
        ScryptStock.remove();
    }if (StyleUsuario != null) {
        StyleUsuario.remove();
        ScryptUsuario.remove();
    }
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