import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const users = props => {
    let user = props.users.map(el => (
        <tr key={el.id}>
            <td>{el.id}</td>
            <td>{el.username}</td>
            <td>{el.email}</td>
            <td>
                <Button variant="danger" onClick={() => props.remove(el.id)}>Remove</Button>
            </td>
        </tr>
    ))
    return (
        <Container>
            <Table borderless responsive striped>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Email</th>
                    </tr>
                </thead>
                <tbody>
                    {user}
                </tbody>
            </Table>
        </Container>
    );
}

export default users;