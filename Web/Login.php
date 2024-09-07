<?php

    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if(isset($_SESSION['Usuario'])){
        if($_SESSION['Nivel'] == "Administrador"){
            header("Location: Estructura/Admin.php");
        }elseif($_SESSION['Nivel'] == "Investigador"){
            header("Location: Estructura/Investigador.php");
        }
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="css/login.css" type="text/css">
        <script src="js/Login.js"></script>
        <script src="notificaciones/pop.js"></script>
    </head>

    <body>
    <h2 class="marca">Yankulia</h2>
        <div class="Datos">
            <h1 class="Titulo">Ingresa a tu cuenta</h1>
            <div class="linea"></div>
            <h2 class="textinput">Correo</h2>
            <input type="mail" class="box" placeholder="Ingresa tu correo" id="correo">
            <h2 class="textinput" >Contraseña</h2>
            <input type="password" class="box" placeholder="Ingresa tu contraseña" id="contrasena">
            <button class="botoningresar" onclick="ingresar()" id="botoningresar">Ingresar</button>
        </div>
        <div class="Informacion">
            <h2>¡Bienvenido!</h2>
            <h3>Por favor, ingresar tus credenciales para acceder a tu cuenta</h3>
        </div>
    </body>
</html>