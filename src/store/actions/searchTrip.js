import * as actionTypes from './actionTypes';
import api from '../../api';

const getTerminalsSuccess = (data) => {
    return {
        type: actionTypes.GET_TERMINALS,
        terminals: data
    }
}

export const getTerminals = () => {
    return dispatch => {
        api.makeMyTrip().fetchTerminals()
            .then(res => {
                if (res.data.success === 1) {
                    dispatch(getTerminalsSuccess(res.data.terminals))
                }
            })
            .catch(err => console.log(err))
    }
}

export const searchInputChange = (key, value) => {
    return {
        type: actionTypes.SEARCH_INPUT_CHANGE,
        key,
        value
    }
}

const searchTripStart = () => (
    {
        type: actionTypes.SEARCH_TRIP_START
    }
);

const searchTripSuccess = (res) => {
    return {
        type: actionTypes.SEARCH_TRIP_SUCCESS,
        res
    }
}

const searchTripFail = () => (
    {
        type: actionTypes.SEARCH_TRIP_FAIL,
    }
)

export const searchTrips = (from, to) => dispatch => {
    dispatch(searchTripStart());
    const data = {
        from,
        to
    }
    api.makeMyTrip().fetchTrips(data)
        .then(res => {
            if (res.data.success === 1) {
                dispatch(searchTripSuccess(res.data.trips))
            } else dispatch(searchTripFail());
        })
        .catch(() => dispatch(searchTripFail()))

}

export const updateBookTrip = (tripId, seats) => {
    return {
        type: actionTypes.UPDATE_BOOK_TRIP,
        tripId,
        seats
    }
}