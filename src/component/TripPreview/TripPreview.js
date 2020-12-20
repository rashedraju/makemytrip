import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

const TripPreview = props => {
    const [mySeats, setMySeats] = useState(1);
    const [readyToBook, setReadyToBook] = useState(true)

    const { trip } = props;

    useEffect(() => {
        if (parseInt(trip.seats) < mySeats) setReadyToBook(false)
        if (parseInt(trip.seats) >= mySeats) setReadyToBook(true)
    }, [trip, mySeats]);

    return (
        <Container>
            <Form onSubmit={(e) => props.confirmTrip(e, mySeats, props.trip.price * mySeats)}>
                <h5 className="text-primary mb-0">
                    {props.trip.from_trmnl} <span> &#8211;</span>  {props.trip.to_trmnl}
                </h5>
                <p className="text-muted">{props.trip.trip_date}</p>
                <hr />
                <p className="font-weight-bold">
                    Time: <span className="text-muted">{props.trip.trip_time} </span>
                </p>
                <Form.Label>
                    Select Seats: <span className="text-muted">{Math.max(0, props.trip.seats - mySeats)} Seats Available </span>
                </Form.Label>
                <Form.Control as="select" onChange={(e) => setMySeats(parseInt(e.target.value))}>
                    {
                        ((arr, i, n) => {
                            while (++i <= n) {
                                arr.push(<option value={i} key={i}>{i}</option>)
                            }
                            return arr;
                        })([], 0, 4)
                    }
                </Form.Control>
                {!readyToBook ? <Form.Text className="text-danger">Seats Not Available!</Form.Text> : null}
                <p className="font-weight-bold my-2">Price: &#2547;<span> {props.trip.price * mySeats}</span></p>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={!readyToBook}
                className="w-100 text-center mx-2">{props.spinner ? <Spinner animation="border" size="sm" /> : 'Confirm & Book'}</Button>
            </Form>
        </Container>
    )
}
export default TripPreview;