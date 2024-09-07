console.log('se cargo pop');

var origen =window.location.origin;

function pop (mensaje,tipo,funcion){
    console.log('cargar archivo');
    estilo(origen+'/notificaciones/css/popup.css');
    cargarcuerpo(origen+'/notificaciones/html/popup.html');

    setTimeout(function(){
        actualizar(mensaje,tipo);
        if(funcion != null){
            var boton = document.getElementById('botonaceptar');
            boton.addEventListener('click',function(){
                cerrarpop();
                funcion();
            });
        }else{
            var boton = document.getElementById('botoncancelar');
            var boton2 = document.getElementById('botonaceptar');

            boton.remove();
            boton2.addEventListener('click',function(){
                cerrarpop();
            });
        }
    },200);
    
    switch(tipo){
        case 'exito':
            
            setTimeout(function(){
                ingresarimg('Exito.svg');
            },200);
            break;
        case 'error':
            
            setTimeout(function(){
                ingresarimg('Error.svg');
            },200);
            break;
        case 'warning':
            
            setTimeout(function(){
                ingresarimg('precaucion.svg');
            },200);
            break;
    }

}

function estilo(url){

    var link = document.createElement('link');

    link.rel='stylesheet';
    link.type='text/css';
    link.href=url;

    document.head.appendChild(link);

}

function cargarcuerpo(url){

    fetch(url).then(respuesta=>{
        if(!respuesta){
            console.log('error al cargar el archivo html');
        }
        return respuesta.text();
    }).then(pagina =>{
        document.body.insertAdjacentHTML('beforeend',pagina);
    });

}

function cerrarpop(){
    var pop=document.getElementById("popup");
    if(pop){
        pop.remove();
    }
}

function actualizar(mensaje,tipo){
    var pop = document.getElementById("popup");
    var ms=pop.querySelector('#mensaje');
    var tipotext=pop.querySelector('#tipo');
    var boton=pop.querySelector('.botonaceptar');
    ms.textContent=mensaje;

    switch(tipo){
        case 'exito':  
            tipotext.textContent='Éxito';
            boton.style.backgroundColor = "#72BB3C";
            break;
        case 'error':
            tipotext.textContent='Error';
            boton.style.backgroundColor = "#E47065";
            break;
        case 'warning':
            tipotext.textContent='Precaución';
            boton.style.backgroundColor = "#E7C04B";
            break;
    }
    
}

function ingresarimg(imagen){
    var pop = document.getElementById("popup");
    var img=pop.querySelector('.popupimagen');

    img.src = origen+'/notificaciones/recursos/'+imagen;
}