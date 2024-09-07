origen = window.location.origin;

Stock();

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
            });
};

function Usuario (){

};