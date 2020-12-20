import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Button, Accordion, Row, Col } from 'react-bootstrap';
import SearchTripForm from '../../component/Form/SearchTripForm/SearchTripForm';
import Trips from '../../component/Trips/Trips';
import * as actions from '../../store/actions';
import api from '../../api';
import Modal from '../../component/UI/Modal/Modal';
import TripPreview from '../../component/TripPreview/TripPreview';
import Loader from '../../component/UI/Loader/Loader';

class SearchTrip extends Component {
    state = {
        showSearchForm: false,
        showConfirmTripModal: false,
        selectedTrip: null,
        spinner: false
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            this.props.onChanged(param[0], param[1])
        }

        if (this.props.trips.length === 0) {
            this.props.onSearch(this.props.formData.from, this.props.formData.to)
        }
    }

    submitTripHandler = (e, seats, price) => {
        e.preventDefault();

        if (this.props.userAuthData.isAuthenticated) {
            this.setState({ spinner: true })
            const selectedTripId = this.state.selectedTrip.trip_id;
            const data = {
                tripId: parseInt(selectedTripId),
                userId: parseInt(this.props.userAuthData.id),
                seats,
                price
            }
            api.makeMyTrip().bookTrip(data)
                .then(res => {
                    if (res.data.success === 1) {
                        this.props.onUpdateBookTrip(selectedTripId, seats)
                        this.setState({ spinner: false, showConfirmTripModal: false })
                    } else {
                        this.setState({ spinner: false })
                        alert('failed to book')
                    }
                })

        } else this.props.onShowLoginModal();
    }

    tripPrevModalHandler = (tripId) => {
        this.setState(
            {
                showConfirmTripModal: true,
                selectedTrip: this.props.trips.find(el => el.trip_id === tripId)
            }
        )
    }

    render() {
        let AllTrips = null;
        if (this.props.trips.length > 0) AllTrips = (
            <Trips trips={this.props.trips}
                btnText="Book Now"
                variant="primary"
                onClicked={this.tripPrevModalHandler} />
        );
        if (this.props.loader) AllTrips = <Loader />;
        if (this.props.error && !this.props.loader) AllTrips = (
            <div className="text-center mx-auto my-2">
                <h3 className="text-warning">OPS! NO TRIP FOUND</h3>
                <p className="text-muted">Please change trip Date/Terminal and Search agin.</p>
            </div>
        );
        return (
            <div className="bg-light">
                <div className="bg-light no-gutters py-3">
                    <Container>
                        <Accordion defaultActiveKey="0">
                            <Row>
                                <Col>
                                    {this.props.trips.length > 0 ? (
                                        <h4 className="text-primary mb-0">  {this.props.formData.from}  <span> &#8211;</span>  {this.props.formData.to} </h4>
                                    ) : null}

                                </Col>
                                <Col className="text-right mb-2">
                                    <Accordion.Toggle
                                        as={Button}
                                        className="btn-sm"
                                        onClick={() => this.setState((state) => ({ showSearchForm: !state.showSearchForm }))} variant="primary" eventKey="0">
                                        {this.state.showSearchForm ? 'Modify' : 'Close'}
                                    </Accordion.Toggle>
                                </Col>
                            </Row>
                            <Accordion.Collapse eventKey="0">
                                <SearchTripForm />
                            </Accordion.Collapse>
                        </Accordion>
                    </Container>
                </div>
                <Container>
                    {AllTrips}
                    <Modal
                        show={this.state.showConfirmTripModal}
                        onHide={() => this.setState({ showConfirmTripModal: false })}>
                        <TripPreview
                            trip={this.state.selectedTrip}
                            spinner={this.state.spinner}
                            confirmTrip={this.submitTripHandler} />
                    </Modal>
                </Container>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        trips: state.searchTrip.trips,
        userAuthData: state.auth.userAuthData,
        formData: state.searchTrip.formData,
        showModal: state.auth.showLoginModal,
        loader: state.searchTrip.loader,
        error: state.searchTrip.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowLoginModal: () => dispatch(actions.showLoginModal()),
        onUpdateBookTrip: (tripId, seats) => dispatch(actions.updateBookTrip(tripId, seats)),
        onChanged: (key, value) => dispatch(actions.searchInputChange(key, value)),
        onSearch: (from, to) => dispatch(actions.searchTrips(from, to))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchTrip);