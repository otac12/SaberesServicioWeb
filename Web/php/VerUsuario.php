<?php
    include 'Accesos.php';

    $Json = file_get_contents('php://input');
    $Respuesta = json_decode($Json);
 
    $conexion = new mysqli(Host,Usuario,Contrasena,DataBase);


    $script = "SELECT * FROM Usuarios LIMIT 100 OFFSET 1";

    $Peticion = $conexion->query($script);

    $Usuario = $Peticion->fetch_all(MYSQLI_ASSOC);

    $json = [
        "Usuario" => $Usuario 
    ]; 

    $conexion->close();

    echo json_encode($json);
?>