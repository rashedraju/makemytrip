import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Redirect } from 'react-router-dom';
import { Container, Tabs, Tab, Card, Form, Button } from 'react-bootstrap';
import Trips from '../../component/Trips/Trips';
import Terminals from '../../component/Terminals/Terminals';
import Buses from '../../component/Buses/Buses';
import Users from '../../component/Users/Users';
import AddTrip from '../../component/AddTrip/AddTrip';
import { updateObject } from '../../shared/utility';
import api from '../../api';
import UpdateTrip from '../../component/UpdateTrip/UpdateTrip';
import Modal from '../../component/UI/Modal/Modal';

class Admin extends Component {
    state = {
        trips: [],
        tripData: {
            from: null,
            to: null,
            bus: null,
            date: new Date(),
            time: new Date(),
            seats: null,
            price: null
        },
        users: [],
        updatedTrip: {},
        showModal: false
    }

    componentDidMount() {
        this.onGetAllTrips();
        this.props.onGetTerminals();
        this.props.onGetBuses();
        this.getAllUsers();
    }

    getAllUsers = () => {
        api.makeMyTrip().fetchUsers()
            .then(res => {
                if (res.data.success === 1) {
                    this.setState({ users: res.data.users })
                }
            })
            .catch(err => console.log(err))
    }

    onGetAllTrips = () => {
        api.makeMyTrip().getAllTrips()
            .then(res => res.data.success === 1 ? this.setState({ trips: res.data.trips }) : alert('No Trips Found!'))
            .catch(err => console.log(err))

    }

    inputChangeHandler = (e, objKey, key) => {
        const object = this.state[objKey];
        if (key === 'date') {
            const updateTrip = updateObject(object, { [key]: e });
            this.setState({ [objKey]: updateTrip })
        } else if (key === 'time') {
            const updateTrip = updateObject(object, { [key]: e });
            this.setState({ [objKey]: updateTrip })

        }
        else {
            e.persist();
            const value = parseInt(e.target.value)
            const updateTrip = updateObject(object, { [key]: value });
            this.setState({ [objKey]: updateTrip })
        }
    }

    convertDateTime = (date, time) => {
        date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        time = time.getHours() + ':' +
            time.getMinutes() + '0:0' +
            time.getSeconds();
        return [date, time];
    }

    submitTrip = (e) => {
        e.preventDefault();
        const [date, time] = this.convertDateTime(this.state.tripData.date, this.state.tripData.time);
        const data = {
            ...this.state.tripData,
            date,
            time
        }
        api.makeMyTrip().addTrip(data)
            .then((res) => {
                console.log(res, data)
                res.data.success === 1 ? alert('Successfully Added Trip') : alert('Faild to Add Trip')

            })
            .catch(() => alert('OMG! Something Want Wrong!'))
    }

    removeUserHandler = (id) => {
        api.makeMyTrip().removeUser(id)
            .then((res) => {
                this.getAllUsers();
                res.data.success === 1 ? alert('User Successfully Removed') : alert('Failed to Remove!');

            })
            .catch(() => alert('OMG! Something Want Wrong!'))
    }

    updateTripHandler = (tripId) => {
        const trip = this.state.trips.find(el => el.trip_id === tripId);
        let date = new Date(trip.trip_date + ' ' + trip.trip_time);
        this.setState({
            updatedTrip: {
                tripId: trip.trip_id,
                date: date,
                time: date,
                seats: trip.seats,
                price: trip.price
            },
            showModal: true
        })
    }

    updatedTripSubmit = (e) => {
        e.preventDefault();
        const [date, time] = this.convertDateTime(this.state.updatedTrip.date, this.state.updatedTrip.time);

        const data = {
            ...this.state.updatedTrip,
            date,
            time
        }

        api.makeMyTrip().updateTrip(data)
            .then((res) => {
                this.onGetAllTrips();
                res.data.success === 1 ? alert('Trip Update Successfully.') : alert('Failed to Update!');
                this.setState({ showModal: false })
            })
            .catch(() => alert('OMG! Something Want Wrong!'))
    }

    render() {
        let redirect = !this.props.adminAuthData.isAuthenticated ? <Redirect to="/admin-login" /> : null;
        return (
            <Container className="mt-3">
                { redirect}
                <h2>Welcome to Dashboard</h2>
                <Card.Body className="shadow">
                    <Tabs defaultActiveKey="allTrips">
                        <Tab eventKey="allTrips" title="All Trips">
                            {this.state.trips.length > 0 ? (
                                <Trips
                                    trips={this.state.trips}
                                    btnText="Modify"
                                    variant="warning"
                                    onClicked={this.updateTripHandler} />) : null}
                        </Tab>
                        <Tab eventKey="addTrip" title="Add Trip">
                            <Form
                                className="w-md-50"
                                onSubmit={this.submitTrip}>
                                <AddTrip
                                    terminals={this.props.terminals}
                                    buses={this.props.buses}
                                    tripData={this.state.tripData}
                                    changed={this.inputChangeHandler} />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100 text-center mx-2">Submit Trip</Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="terminals" title="Terminals">
                            <Terminals terminals={this.props.terminals} />
                        </Tab>
                        <Tab eventKey="buses" title="Buses">
                            <Buses buses={this.props.buses} />
                        </Tab>
                        <Tab eventKey="users" title="All Users">
                            <Users
                                users={this.state.users}
                                remove={this.removeUserHandler} />
                        </Tab>
                    </Tabs>
                </Card.Body>
                <Modal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}>
                    <Form onSubmit={this.updatedTripSubmit}>
                        <UpdateTrip
                            tripData={this.state.updatedTrip}
                            changed={this.inputChangeHandler} />
                        <Button variant="warning" type="submit" className="w-100 text-center"> Submit Update </Button>
                    </Form>
                </Modal>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        adminAuthData: state.auth.adminAuthData,
        terminals: state.searchTrip.terminals,
        buses: state.admin.buses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTerminals: () => dispatch(actions.getTerminals()),
        onGetBuses: () => dispatch(actions.getBuses())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);