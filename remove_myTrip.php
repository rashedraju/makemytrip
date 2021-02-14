<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: GET" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$data = json_decode( file_get_contents( "php://input" ) );
if ( isset( $data->userId )
    && isset( $data->bookId ) ) {
    $bookId = $data->bookId;
    $userId = $data->userId;

    $updateTrip = mysqli_query( $db_conn, "UPDATE trips SET seats=seats+(SELECT seats FROM booking WHERE book_id={$bookId}) WHERE trip_id=(SELECT trip_id FROM booking WHERE book_id={$bookId})" );

    $remove = mysqli_query( $db_conn, "DELETE FROM `booking` WHERE `book_id`={$bookId} AND `user_id`={$userId}" );

    if ( $remove ) {
        echo json_encode( ["success" => 1, "msg" => "Trip removed successfully."] );
    } else {
        echo json_encode( ["success" => 0, "msg" => "Fail to remove trip"] );
    }
} else {
    echo json_encode( ["success" => 0, "msg" => "data not found!"] );
}
