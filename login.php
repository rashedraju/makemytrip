<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: GET" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

$data = json_decode( file_get_contents( "php://input" ) );

if ( isset( $data->email )
    && isset( $data->password )
    && isset( $data->method ) ) {

    // GET FROM, TO TERMINAL NAME FROM UI
    $myemail = mysqli_real_escape_string( $db_conn, trim( $data->email ) );
    $mypassword = mysqli_real_escape_string( $db_conn, trim( $data->password ) );
    $method = mysqli_real_escape_string( $db_conn, trim( $data->method ) );

    // GET TRIPS FROM DATABASE

    if ( $method == 'adminLogin' ) {
        $query = "SELECT `username`, `email` from `admin` WHERE `email`='{$myemail}' AND `password`='{$mypassword}'";
    } else if ( $method == 'userLogin' ) {
        $query = "SELECT `id`, `username`, `email` from `users` WHERE `email`='{$myemail}' AND `password`='{$mypassword}'";
    } else {
        echo json_encode( ["failed" => 0, "msg" => "Failed Login"] );
    }

    $result = mysqli_query( $db_conn, $query );

    if ( mysqli_num_rows( $result ) == 1 ) {
        $logged_in = mysqli_fetch_all( $result, MYSQLI_ASSOC );
        echo json_encode( ["success" => 1, "auth" => $logged_in] );
    } else {
        echo json_encode( ["failed" => 0, "msg" => "User not fount!"] );
    }
} else {
    echo json_encode( ["success" => 0, "msg" => "Please fill all the required fields!"] );
}