import React from 'react';
import { Table } from 'react-bootstrap';
import Trip from './Trip/Trip';

const trips = props => (
    <Table borderless responsive>
        <thead>
            <tr>
                <th>Operator(Bus type)</th>
                <th className="text-center">Trip Date</th>
                <th className="text-center">Trip Time</th>
                <th className="text-center">Seats Avail.</th>
                <th className="text-center">Fare</th>
            </tr>
        </thead>
        <tbody>
            {<Trip
                trips={props.trips}
                btnText={props.btnText}
                variant={props.variant}
                clicked={props.onClicked} />}
        </tbody>
    </Table>
);

export default trips;