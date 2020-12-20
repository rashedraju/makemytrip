import React from 'react';
import { Button } from 'react-bootstrap';

const trip = props => {
    let trip = props.trips.map(trip => (

        <tr className="bg-white border-top border-bottom border-gray" key={trip.trip_id + Math.random()}>
            <td>
                <ul className="list-unstyled mb-0">
                    <li className="text-primary h5">{trip.bus_name}</li>
                    <li className="mt-3">Starting Point: <span className="text-secondary">{trip.from_trmnl}</span></li>
                    <li>Ending Point:<span className="text-secondary"> {trip.to_trmnl}</span></li>
                </ul>
            </td>
            <td className="text-center">{trip.trip_date}</td>
            <td className="text-center">{trip.trip_time}</td>
            <td className="text-center">{trip.seats}</td>
            <td className="text-center">
                <ul className="list-unstyled mb-0">
                    <li className="text-primary h5">&#2547; {trip.price}</li>
                    <li className="mt-1 mt-sm-4">
                        <Button size="sm" type="button" variant={props.variant} onClick={() => props.clicked(trip.trip_id)}> {props.btnText} </Button>
                    </li>
                </ul>
            </td>
        </tr>
    ))
    return trip;
}

export default trip;

