<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: GET" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$allUsers = mysqli_query( $db_conn, "SELECT * FROM `users` ORDER BY `id`" );

if ( $allUsers ) {
    $all_users = mysqli_fetch_all( $allUsers, MYSQLI_ASSOC );
    echo json_encode( ["success" => 1, "users" => $all_users] );
} else {
    echo json_encode( ["success" => 0, "msg" => "Fetch users fail"] );
}