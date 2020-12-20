import React from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const addTrip = props => {
    let bus = props.buses.map(el => (
        <option value={el.bus_id} key={el.bus_id}>{el.bus_name}</option>
    ))
    let terminal = props.terminals.map(el => (
        <option value={el.trmnl_id} key={el.trmnl_id}>{el.trmnl_name}</option>
    ))
    return (
        <Container className="my-2 w-100 w-md-50">
            <Form.Group>
                <Form.Label>Select Bus</Form.Label>
                <Form.Control as="select"
                    defaultValue="Select Bus"
                    onChange={(e) => props.changed(e, 'tripData', 'bus')}>
                    <option disabled>Select Bus</option>
                    {bus}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Starting Terminal</Form.Label>
                <Form.Control as="select"
                    defaultValue="Select Terminal"
                    onChange={(e) => props.changed(e, 'tripData', 'from')}>
                    <option disabled>Select Terminal</option>
                    {terminal}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Destination Terminal</Form.Label>
                <Form.Control as="select"
                    defaultValue="Select Terminal"
                    onChange={(e) => props.changed(e, 'tripData', 'to')}>
                    <option disabled>Select Terminal</option>
                    {terminal}
                </Form.Control>
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Trip Time</Form.Label>
                        <br />
                        <DatePicker
                            selected={props.tripData.time}
                            onChange={(e) => props.changed(e, 'tripData', 'time')}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Time"
                            timeFormat="HH:mm"
                            dateFormat="h:mm"
                            className="form-control"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Trip Date</Form.Label>
                        <br />
                        <DatePicker
                            selected={props.tripData.date}
                            minDate={new Date()}
                            onChange={(e) => props.changed(e, 'tripData', 'date')}
                            dateFormat="yyyy/MM/dd"
                            className="form-control" />
                    </Form.Group>

                </Col>
            </Row>
            <Form.Group>
                <Form.Label>Seats</Form.Label>
                <Form.Control as="select"
                    required
                    defaultValue="Select Seats"
                    onChange={(e) => props.changed(e, 'tripData', 'seats')}>
                    <option disabled>Select Seats</option>
                    {
                        ((arr, i, n) => {
                            while (++i <= n) {
                                arr.push(<option value={i} key={i}>{i}</option>)
                            }
                            return arr;
                        })([], 0, 40)
                    }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Ticket Price</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Tricket Price"
                    onChange={(e) => props.changed(e, 'tripData', 'price')} />
            </Form.Group>
        </Container>
    );
}

export default addTrip;