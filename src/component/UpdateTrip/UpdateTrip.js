import React from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

const updateTrip = props => {
    return (
        <Container className="my-2 w-100 w-md-50">
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Trip Time</Form.Label>
                        <br />
                        <DatePicker
                            selected={props.tripData.time}
                            onChange={(e) => props.changed(e, 'updatedTrip', 'time')}
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
                            onChange={(e) => props.changed(e, 'updatedTrip', 'date')}
                            dateFormat="yyyy/MM/dd"
                            className="form-control" />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group>
                <Form.Label>Seats</Form.Label>
                <Form.Control as="select"
                    required
                    defaultValue={props.tripData.seats}
                    onChange={(e) => props.changed(e, 'updatedTrip', 'seats')}>
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
                    defaultValue={props.tripData.price}
                    type="text"
                    placeholder="Tricket Price"
                    onChange={(e) => props.changed(e, 'updatedTrip', 'price')} />
            </Form.Group>
        </Container>
    );
}

export default updateTrip;