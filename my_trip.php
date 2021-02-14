<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: GET" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$userId = json_decode( file_get_contents( "php://input" ) );

if ( isset( $userId ) ) {
    $query = "SELECT booking.book_id, booking.seats, booking.price, buses.bus_name, from_terminal.trmnl_name as from_trmnl, to_terminal.trmnl_name as to_trmnl, trips.trip_id, trips.trip_date, trips.trip_time FROM booking JOIN trips ON trips.trip_id=booking.trip_id INNER JOIN buses ON buses.bus_id=trips.bus_id INNER JOIN terminals AS from_terminal ON trips.from_trmnl_id=from_terminal.trmnl_id INNER JOIN terminals AS to_terminal ON trips.to_trmnl_id=to_terminal.trmnl_id WHERE booking.user_id=$userId";

    $trips = mysqli_query( $db_conn, $query );

    if ( $trips ) {
        $all_trips = mysqli_fetch_all( $trips, MYSQLI_ASSOC );
        echo json_encode( ["success" => 1, "trips" => $all_trips] );
    } else {
        echo json_encode( ["success" => 0] );
    }
} else {
    echo json_encode( ["success" => 0, "msg" => "Please fill all the required fields!"] );
}