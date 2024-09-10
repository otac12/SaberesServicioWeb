<?php
    include 'Accesos.php';
 
    $conexion = new mysqli(Host,Usuario,Contrasena,DataBase);

    $ScriptEquipos = "SELECT * FROM Equipo";
    $ScriptComponentes = "SELECT * FROM Componentes";
    $StatusOcupados = "SELECT * FROM Equipo WHERE Equipo.Estado = False";
    $StatusLibres = "SELECT * FROM Equipo WHERE Equipo.Estado = True";
    
    $RespuestaEquipo = $conexion->query($ScriptEquipos);
    $RespuestaComponentes = $conexion->query($ScriptComponentes);
    $RespuestaOcupados = $conexion->query($StatusOcupados);
    $Respuestalibre = $conexion->query($StatusLibres);

    $Equipos = $RespuestaEquipo->fetch_all(MYSQLI_ASSOC);
    $Componentes = $RespuestaComponentes->fetch_all(MYSQLI_ASSOC);
    $Ocupados = $RespuestaOcupados->fetch_all(MYSQLI_ASSOC);
    $Libre = $Respuestalibre->fetch_all(MYSQLI_ASSOC);

    $Respuesta =[
        'Equipo'=>$Equipos,
        'Componentes'=>$Componentes,
        'Ocupados'=>$Ocupadosm,
        'Libre'=> $Libre
    ];
    
    $conexion->close();
    echo json_encode($Respuesta);
?>