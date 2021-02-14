<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: POST" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

// POST DATA
$data = json_decode( file_get_contents( "php://input" ) );

if ( isset( $data->from )
    && isset( $data->to )
    && !empty( trim( $data->bus ) )
    && !empty( trim( $data->date ) )
    && !empty( trim( $data->time ) )
    && !empty( trim( $data->seats ) )
    && !empty( trim( $data->price ) )
) {

    $tripstart = $data->from;
    $tripend = $data->to;
    $bus = $data->bus;
    $date = $data->date;
    $time = $data->time;
    $seats = $data->seats;
    $price = $data->price;

    $query = "INSERT INTO `trips` (`from_trmnl_id`, `to_trmnl_id`, `bus_id`, `trip_date`, `trip_time`, `seats`, `price`) VALUES ($tripstart, $tripend, $bus, '$date', '$time', $seats, $price)";

    $addTrip = mysqli_query( $db_conn, $query );

    if ( $addTrip ) {
        echo json_encode( ["success" => 1, "msg" => "successfully added."] );
    } else {
        echo json_encode( ["success" => 0, "msg" => "failed to add trip."] );
    }
} else {
    echo json_encode( ["success" => 0, "msg" => "Please fill all the required fields!"] );
}