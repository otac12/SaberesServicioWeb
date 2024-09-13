<?php
    include 'Accesos.php';

    $Json = file_get_contents('php://input');
    $Respuesta = json_decode($Json);
 
    $conexion = new mysqli(Host,Usuario,Contrasena,DataBase);

    $script = "INSERT INTO Usuarios (Tipo_Usuario,Nombre,Contrasena)VALUES('{$Respuesta->Tipo}','{$Respuesta->Nombre}','{$Respuesta->Contrasena}');";


    if(  $conexion->query($script) == True){
        $conexion->close();
        echo "Exito";
    }else{
        $conexion->close();
        echo "error";
    }

?>