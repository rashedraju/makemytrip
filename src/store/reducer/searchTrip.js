import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    formData: {
        from: '',
        to: '',
        // date: new Date()
    },
    terminals: [],
    trips: [],
    loader: false,
    error: false
}

const searchInputChange = (state, action) => {
    let updatedFormData;
    updatedFormData = updateObject(state.formData, { [action.key]: action.value });

    return updateObject(state, { formData: updatedFormData })
}

const searchTripSuccess = (state, action) => updateObject(state,
    {
        trips: action.res,
        loader: false,
        error: false
    }
);

const updateBookTrip = (state, action) => {
    const updatedTrips = [...state.trips].map(el => {
        if (el.trip_id === action.tripId) {
            return {
                ...el,
                seats: parseInt(el.seats) - action.seats
            }
        } else return el;
    })
    return updateObject(state, { trips: updatedTrips })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TERMINALS:
            return updateObject(state, { terminals: action.terminals });
        case actionTypes.SEARCH_INPUT_CHANGE:
            return searchInputChange(state, action);
        case actionTypes.SEARCH_TRIP_START:
            return updateObject(state, { loader: true })
        case actionTypes.SEARCH_TRIP_SUCCESS:
            return searchTripSuccess(state, action);
        case actionTypes.SEARCH_TRIP_FAIL:
            return updateObject(state, { loader: false, error: true })
        case actionTypes.UPDATE_BOOK_TRIP:
            return updateBookTrip(state, action);
        default:
            return state;
    }
}
export default reducer;