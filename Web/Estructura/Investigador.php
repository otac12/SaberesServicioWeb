<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if(isset($_SESSION['Usuario'])){
        if($_SESSION['Nivel'] == "Administrador"){
            header("Location: /Admin.php");
        }elseif($_SESSION['Nivel'] == "Investigador"){
            $sesion = session_id();
            $Url = "../js/Investigador.js";
        }else{
            header("Location: ../Login.php");
        }
    }else{
        header("Location: ../Login.php");
    }
?>

<html>
    <head>
        <script src = "../js/FuncionesGenerales.js" defer></script>
        <script src = <?php echo $Url ?> defer></script>
    </head>
    <body session = <?php echo $sesion ?> >
        <div id ="Menu">
            <button onclick = "">Equipo</button>
            <button onclick = "">Componentes</button>
        </div>
        <div id ="Cuerpo">
            <div id= "Navegador">
                <button onclick = "CerrarSesion()">Cerrar Sesion</button>
            </div>
            <div id= "Informacion">
            </div>      
        </div>
    </body>
</html>