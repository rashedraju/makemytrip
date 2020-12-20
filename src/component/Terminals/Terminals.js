import React from 'react';
import { Container, Table } from 'react-bootstrap';

const terminals = props => {
    let terminal = props.terminals.map(el => (
        <tr key={el.trmnl_id}>
            <td>{el.trmnl_id}</td>
            <td>{el.trmnl_name}</td>
        </tr>
    ))
    return (
        <Container>
            <Table borderless responsive striped>
                <thead>
                    <tr>
                        <th>Terminal No.</th>
                        <th>Terminal Name</th>
                    </tr>
                </thead>
                <tbody>
                    {terminal}
                </tbody>
            </Table>
        </Container>
    );
}

export default terminals;