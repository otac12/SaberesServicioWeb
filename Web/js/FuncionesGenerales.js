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

                document.head.appendChild(Etiqueta);

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

                document.head.appendChild(Etiqueta);

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

    Cuerpo.innerHTML = '';

    if(StyleStock != null){
        StyleStock.remove();
    }if (StyleUsuario != null) {
        StyleUsuario.remove();
    }
}