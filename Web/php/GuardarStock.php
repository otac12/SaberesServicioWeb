<?php
    include 'Accesos.php';

    $Json = file_get_contents('php://input');
    $Respuesta = json_decode($Json);
 
    $conexion = new mysqli(Host,Usuario,Contrasena,DataBase);

    if($Respuesta->Tipo == "Equipo" || $Respuesta->Tipo == "Herramienta"){

        $script = "INSERT INTO Equipo(Tipo,Nombre,Estado,Icono) VALUES ('{$Respuesta->Tipo}','{$Respuesta->Nombre}',True,'{$Respuesta->Icono}')";
        $conexion->query($script);

        $conexion->close();
        echo "Exito";

    }elseif($Respuesta->Tipo == "Componentes"){

        $script = "INSERT INTO Componentes(Nombre,Cantidad,Icono) VALUES ('{$Respuesta->Nombre}',$Respuesta->Cantidad,'{$Respuesta->Icono}')";
        error_log($script);
        $conexion->query($script);

        $conexion->close();
        echo "Exito";
    }else{
        $conexion->close();
        echo "No Existe la categoria";
    }
    
?>
