<?php

    include 'Accesos.php';

    $Json = file_get_contents('php://input');
    $Respuesta = json_decode($Json);
    $RespuestaFront=json_decode("{'Status':'','msg':''}");

    $conexion = new mysqli(Host,Usuario,Contrasena,DataBase);

    $script = "SELECT * FROM Usuarios WHERE Nombre = '{$Respuesta->usuario}';";
    $Peticion = $conexion -> query($script); 
    
    if($Peticion->num_rows > 0){
        $Usuario = $Peticion->fetch_assoc();

        error_log($Usuario['Nombre'].":".$Usuario['Contrasena']);
        error_log($Respuesta->usuario.":".$Respuesta->contrasena);

        if($Usuario['Nombre']== $Respuesta->usuario && $Usuario['Contrasena'] == $Respuesta->contrasena && $Respuesta->contrasena != null ){
            error_log("Se inicio la sesion de '{$Respuesta->usuario}'");

            session_start();

            $_SESSION['Usuario'] = $Respuesta->usuario;
            $_SESSION['Nivel'] = $Usuario['Tipo_Usuario'];

            $RespuestaFront->Status = "exito";
            $RespuestaFront->msg = $Usuario['Tipo_Usuario'];
            $conexion->close();
            echo json_encode($RespuestaFront);
            
        }else{
            $RespuestaFront->Status = "error";
            $RespuestaFront->msg = "Usuario o contraseña incorrecto";
            $conexion->close();
            echo json_encode($RespuestaFront);
        }
        
    }else{
        $conexion->close();
        error_log("Error en la peticion");
    }

?>