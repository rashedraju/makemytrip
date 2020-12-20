import * as actionTypes from './actionTypes';
import api from '../../api';

const getBusesSuccess = (buses) => {
    return {
        type: actionTypes.GET_BUSES,
        buses
    }
}

export const getBuses = () => {
    return dispatch => {
        api.makeMyTrip().fetchBuses()
            .then(res => {
                if (res.data.success === 1) {
                    dispatch(getBusesSuccess(res.data.buses))
                }
            })
            .catch(err => console.log(err))
    }
}