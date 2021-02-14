<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: GET" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$allBuses = mysqli_query( $db_conn, "SELECT * FROM `buses`" );

if ( mysqli_num_rows( $allBuses ) > 0 ) {
    $all_buses = mysqli_fetch_all( $allBuses, MYSQLI_ASSOC );
    echo json_encode( ["success" => 1, "buses" => $all_buses] );
} else {
    echo json_encode( ["success" => 0, "msg" => "Fetch Buses Fail"] );
}