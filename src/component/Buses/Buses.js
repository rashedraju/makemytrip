import React from 'react';
import { Container, Table } from 'react-bootstrap';

const buses = props => {
    let bus = props.buses.map(el => (
        <tr key={el.bus_id}>
            <td>{el.bus_id}</td>
            <td>{el.bus_name}</td>
        </tr>
    ))
    return (
        <Container>
            <Table borderless responsive striped>
                <thead>
                    <tr>
                        <th>Bus No.</th>
                        <th>Bus Name</th>
                    </tr>
                </thead>
                <tbody>
                    {bus}
                </tbody>
            </Table>
        </Container>
    );
}

export default buses;