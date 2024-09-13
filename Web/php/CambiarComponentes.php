<?php
    include 'Accesos.php';

    $Json = file_get_contents('php://input');
    $Respuesta = json_decode($Json);
 
    $conexion = new mysqli(Host,Usuario,Contrasena,DataBase);

    $script = "UPDATE Componentes SET Componentes.Cantidad = {$Respuesta->Cantidad} WHERE Componentes.Id_Componente = {$Respuesta->Id};";

    error_log($script);
    $conexion->query($script);

    $conexion->close();

    echo "Exito";
?>