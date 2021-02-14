<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: GET" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$query = "SELECT trips.trip_id, trips.bus_id, buses.bus_name, trips.from_trmnl_id, from_terminal.trmnl_name as from_trmnl, trips.to_trmnl_id, to_terminal.trmnl_name as to_trmnl, trips.trip_date, trips.trip_time, trips.seats, trips.price FROM trips JOIN buses ON buses.bus_id=trips.bus_id INNER JOIN terminals AS from_terminal ON trips.from_trmnl_id=from_terminal.trmnl_id INNER JOIN terminals AS to_terminal ON trips.to_trmnl_id=to_terminal.trmnl_id ORDER BY trip_date DESC";

$allTrips = mysqli_query( $db_conn, $query );

if ( mysqli_num_rows( $allTrips ) > 0 ) {
    $all_trips = mysqli_fetch_all( $allTrips, MYSQLI_ASSOC );
    echo json_encode( ["success" => 1, "trips" => $all_trips] );
} else {
    echo json_encode( ["success" => 0] );
}