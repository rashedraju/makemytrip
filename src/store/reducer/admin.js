import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    trips: [],
    buses: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_TRIPS:
            return updateObject(state, { trips: action.trips })
        case actionTypes.GET_BUSES:
            return updateObject(state, { buses: action.buses })
        default:
            return state;
    }
}

export default reducer;