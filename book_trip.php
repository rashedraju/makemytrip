<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: POST" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

// POST DATA
$data = json_decode( file_get_contents( "php://input" ) );

if ( isset( $data->userId )
    && isset( $data->tripId )
    && isset( $data->seats )
    && isset( $data->price )
) {

    $userId = $data->userId;
    $tripId = $data->tripId;
    $seats = $data->seats;
    $price = $data->price;

    $bookTrip = "INSERT INTO `booking` (`user_id`, `trip_id`, `seats`, `price`) VALUES ($userId, $tripId, $seats, $price)";

    $updateTrip = "UPDATE trips SET seats = seats - $seats WHERE trip_id = $tripId";

    $book = mysqli_query( $db_conn, $bookTrip );
    $update = mysqli_query( $db_conn, $updateTrip );

    if ( $book && $update ) {
        echo json_encode( ["success" => 1, "msg" => "successfully booked."] );
    } else {
        echo json_encode( ["success" => 0, "msg" => $book] );
    }
} else {
    echo json_encode( ["success" => 0, "msg" => "trip no found!"] );
}