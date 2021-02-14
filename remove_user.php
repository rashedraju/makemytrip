<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: GET" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$id = json_decode( file_get_contents( "php://input" ) );
if ( isset( $id ) ) {
    $remove = mysqli_query( $db_conn, "DELETE FROM `users` WHERE `id`={$id}" );

    if ( $remove ) {
        echo json_encode( ["success" => 1, "msg" => "successfully removed."] );
    } else {
        echo json_encode( ["success" => 0, "msg" => "Fail to remove user"] );
    }
} else {
    echo json_encode( ["success" => 0, "msg" => "User id not found!"] );
}
