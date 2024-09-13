<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if(isset($_SESSION['Usuario'])){
        if($_SESSION['Nivel'] == "Administrador"){
            header("Location: /Admin.php");
        }elseif($_SESSION['Nivel'] == "Investigador"){
            $Usuario = $_SESSION['Usuario'];
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
        <script src = "../js/FuncionesGInvestigadro.js" defer></script>
        <script src = "../notificaciones/pop.js" defer></script>
        <link rel = "Stylesheet" type="text/css" href= "../css/StyleGeneral.css">
        <script src = <?php echo $Url ?>  defer></script>
    </head>
    <body session = <?php echo $sesion ?> >
        <div id ="Menu">
            <button id = "VerStock">Stock</button>
            <button id = "VerUsuario" Style = "borde:0; color:white; background:white;">Usuarios</button>
            <div><p>T</p></div>
            <p id="Usuario"><?php echo $Usuario ?></p>
            <button>></button>
            <button onclick = "CerrarSesion()">Cerrar Sesion</button>

        </div>
        <div id ="Cuerpo">
                
        </div>
    </body>
</html>