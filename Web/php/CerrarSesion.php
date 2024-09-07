<?php
    $json = file_get_contents('php://input');

    $datos = json_decode($json,true);

    if(isset($datos['ID']) && $datos['ID']!= null){
        error_log($datos['ID']);
        session_id($datos['ID']);

        session_start();

        session_destroy();

        error_log('se cerro la session');
        echo 'Se cerro la session';
    }else{
        echo 'No existe la session';
    }
    
?>