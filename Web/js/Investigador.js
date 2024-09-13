

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