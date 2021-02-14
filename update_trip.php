<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: POST" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$data = json_decode( file_get_contents( "php://input" ) );

if ( isset( $data->date )
    && isset( $data->time )
    && isset( $data->seats )
    && isset( $data->price )
    && isset( $data->tripId )
) {

    $date = $data->date;
    $time = $data->time;
    $seats = $data->seats;
    $price = $data->price;
    $tripId = $data->tripId;

    $query = "UPDATE trips
    SET `trip_date`='{$date}', `trip_time`='{$time}', `seats`={$seats}, `price`={$price}
    WHERE `trip_id`={$tripId}";

    $updateTrip = mysqli_query( $db_conn, $query );
    if ( $updateTrip ) {
        echo json_encode( ["success" => 1, "msg" => "successfully update trip."] );
    } else {
        echo json_encode( ["success" => 0, "msg" => "failed to update trip."] );
    }
} else {
    echo json_encode( ["success" => 0, "msg" => "Please fill all the required fields!"] );
}