import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import Trips from '../../component/Trips/Trips';
import api from '../../api';
import * as actions from '../../store/actions';
import Loader from '../../component/UI/Loader/Loader';
import Modal from '../../component/UI/Modal/Modal';

const UserProfile = props => {
    const [myTrips, setMyTrips] = useState([]);
    const { userAuthData, onShowLoginModal } = props;
    const [loader, setLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bookId, setBookId] = useState('')

    useEffect(() => {
        if (!userAuthData.isAuthenticated) {
            onShowLoginModal()
        } else {
            setLoader(true)
            const userId = parseInt(userAuthData.id);
            api.makeMyTrip().myTrips(userId)
                .then(res => {
                    setLoader(false)
                    if (res.data.success === 1) setMyTrips(res.data.trips)
                })
                .catch(err => setLoader(false))

        }
    }, [userAuthData, onShowLoginModal])

    const tripRemoveHandler = () => {
        const data = {
            bookId: parseInt(bookId),
            userId: parseInt(userAuthData.id)
        }
        api.makeMyTrip().removeMyTrip(data)
            .then(res => {
                if (res.data.success === 1) {
                    const updatedMyTrips = [...myTrips].filter(el => el.book_id !== bookId);
                    setMyTrips(updatedMyTrips);
                    setShowModal(false)
                }
            })
            .catch(err => {
                setShowModal(false)
                alert('Failed to remove trip!')
            })
    }

    let trips = myTrips.length > 0 ? (
        <Trips
            trips={myTrips.map(el => (
                {
                    ...el,
                    trip_id: el.book_id
                }
            ))}
            btnText="Cancel"
            variant="danger"
            onClicked={(bookId) => {
                setShowModal(true);
                setBookId(bookId)
            }} />
    ) : <p className="text-center my-2">Please Book Your Trip.</p>;

    if (loader) trips = <Loader />

    return (
        <Container>
            {trips}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}>
                <h4>Remove This Trip?</h4>
                <Form.Control as="textarea" row="2" placeholder="Please tell us why you removing this Trip."></Form.Control>
                <Button variant="danger" className="w-100 text-center my-2" onClick={tripRemoveHandler}> Cancel Trip </Button>
                <Button variant="light" className="w-100 text-center" onClick={() => setShowModal(false)}> Go Back</Button>
            </Modal>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        userAuthData: state.auth.userAuthData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowLoginModal: () => dispatch(actions.showLoginModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);