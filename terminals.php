<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: GET" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$allTerminals = mysqli_query( $db_conn, "SELECT * FROM `terminals`" );

if ( mysqli_num_rows( $allTerminals ) > 0 ) {
    $all_terminals = mysqli_fetch_all( $allTerminals, MYSQLI_ASSOC );
    echo json_encode( ["success" => 1, "terminals" => $all_terminals] );
} else {
    echo json_encode( ["success" => 0] );
}