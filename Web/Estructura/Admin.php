<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if(isset($_SESSION['Usuario'])){
        if($_SESSION['Nivel'] == "Administrador"){
            $sesion = session_id();
            $Url = "../js/Admin.js";
        }elseif($_SESSION['Nivel'] == "Investigador"){
            header("Location: /Investigador.php");
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
        <link rel = "Stylesheet" type="text/css" href= "../css/StyleGeneral.css">
        <script src = <?php echo $Url ?>  defer></script>
    </head>
    <body session = <?php echo $sesion ?> >
        <div id ="Menu">
            <button id = "VerStock">Stock</button>
            <button id = "VerUsuario">Usuarios</button>
            <div><p>T</p></div>
            <p>Usuario</p>
            <button>></button>
            <button onclick = "CerrarSesion()">Cerrar Sesion</button>

        </div>
        <div id ="Cuerpo">
                
        </div>
    </body>
</html>