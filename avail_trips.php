<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: GET" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$data = json_decode( file_get_contents( "php://input" ) );

if ( isset( $data->from )
    && isset( $data->to ) ) {

    // GET FROM, TO TERMINAL NAME FROM UI
    $fromTerminalName = mysqli_real_escape_string( $db_conn, trim( $data->from ) );
    $toTerminalName = mysqli_real_escape_string( $db_conn, trim( $data->to ) );

    // FROM & TO - TERMINAL ID QUERY
    $fromTerminalId = "SELECT trmnl_id FROM terminals WHERE trmnl_name='{$fromTerminalName}'";

    $toTerminalId = "SELECT trmnl_id FROM terminals WHERE trmnl_name='{$toTerminalName}'";

    // GET TRIPS FROM DATABASE

    $trips = "SELECT trips.trip_id, trips.bus_id, buses.bus_name, trips.from_trmnl_id, from_terminal.trmnl_name as from_trmnl, trips.to_trmnl_id, to_terminal.trmnl_name as to_trmnl, trips.trip_date, trips.trip_time, trips.seats, trips.price FROM trips JOIN buses ON buses.bus_id=trips.bus_id INNER JOIN terminals AS from_terminal ON trips.from_trmnl_id=from_terminal.trmnl_id INNER JOIN terminals AS to_terminal ON trips.to_trmnl_id=to_terminal.trmnl_id WHERE trips.from_trmnl_id=({$fromTerminalId}) AND trips.to_trmnl_id=({$toTerminalId}) ORDER BY trip_date DESC";

    $availTrips = mysqli_query( $db_conn, $trips );

    if ( mysqli_num_rows( $availTrips ) > 0 ) {
        $avail_trips = mysqli_fetch_all( $availTrips, MYSQLI_ASSOC );
        echo json_encode( ["success" => 1, "trips" => $avail_trips] );
    } else {
        echo json_encode( ["success" => 0, "trips" => "no trips found"] );
    }
} else {
    echo json_encode( ["success" => 0, "msg" => "Please fill all the required fields!"] );
}