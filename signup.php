<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: access" );
header( "Access-Control-Allow-Methods: POST" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

require 'db_connection.php';

// POST DATA
$data = json_decode( file_get_contents( "php://input" ) );

if ( isset( $data->name )
    && isset( $data->email )
    && !empty( trim( $data->password ) )
) {

    $name = mysqli_real_escape_string( $db_conn, trim( $data->name ) );
    $email = mysqli_real_escape_string( $db_conn, trim( $data->email ) );
    $password = mysqli_real_escape_string( $db_conn, trim( $data->password ) );

    $checkUser = mysqli_query( $db_conn, "SELECT `id` FROM `users` WHERE `email`='{$email}'" );

    if ( mysqli_num_rows( $checkUser ) > 0 ) {
        echo json_encode( ["success" => 0, "msg" => "this email already exist"] );
    } else {
        $query = "INSERT INTO `users`(`username`,`email`, `password`) VALUES('$name','$email','$password')";

        $insertUser = mysqli_query( $db_conn, $query );

        if ( $insertUser ) {
            $getUser = mysqli_query( $db_conn, "SELECT `id`, `username`, `email` FROM `users` WHERE `email`='{$email}'" );

            if ( mysqli_num_rows( $getUser ) == 1 ) {
                $user = mysqli_fetch_all( $getUser, MYSQLI_ASSOC );
                echo json_encode( ["success" => 1, "user" => $user] );
            } else {
                echo json_encode( ["success" => 0, "msg" => "failed."] );
            }
        } else {
            echo json_encode( ["success" => 0, "msg" => "signup failed"] );
        }
    }
} else {
    echo json_encode( ["success" => 0, "msg" => "Please fill all the required fields!"] );
}