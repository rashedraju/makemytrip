import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Form, FormControl, InputGroup, Col, Button } from 'react-bootstrap';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import './SearchTripForm.scss';

const SearchTripForm = (props) => {
    const { onGetTerminals } = props;
    useEffect(() => {
        onGetTerminals()
    }, [onGetTerminals])

    let terminalName = props.terminals.map(el => {
        return <option key={el.trmnl_id}>{el.trmnl_name}</option>
    })
    return (
        <Aux>
            <datalist id="terminalName">
                {terminalName}
            </datalist>
            <Form inline onSubmit={(e) => {
                e.preventDefault();

                const queryParams = [];
                for (let key in props.formData) {
                    queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(props.formData[key]))
                }
                const queryString = queryParams.join('&');

                props.history.push({
                    pathname: '/search',
                    search: "?" + queryString,
                })

                props.onSearch(props.formData.from, props.formData.to);
            }}>
                <Form.Row className="px-2 w-100">
                    <Form.Group as={Col} md="6" className="justify-content-center">
                        <InputGroup className="mb-2 w-100">
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fa fa-map-marker" aria-hidden="true"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                defaultValue={props.formData.from}
                                placeholder="From"
                                onChange={(e) => {
                                    e.persist();
                                    props.onChanged('from', e.target.value)
                                }} required list="terminalName" />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6" className="justify-content-center">
                        <InputGroup className="mb-2 w-100">
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fa fa-map-marker" aria-hidden="true"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                defaultValue={props.formData.to}
                                placeholder="To"
                                onChange={(e) => {
                                    e.persist();
                                    props.onChanged('to', e.target.value)
                                }} required list="terminalName" />
                        </InputGroup>
                    </Form.Group>
                    {/* <Form.Group as={Col} md="4" className="justify-content-center">
                        <InputGroup className="mb-2 w-mx-sm-100 w-mx-md-75">
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fa fa-calendar" aria-hidden="true"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <DatePicker
                                selected={props.formData.date}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                onChange={(e) => {
                                    props.onChanged('date', e)
                                }}
                                className="form-control date-picker w-sm-100" />
                        </InputGroup>
                    </Form.Group> */}
                </Form.Row>
                {/* search buses action button */}
                <Button variant="primary" className="d-block w-50 mx-auto mt-3 text-white border-white" type="submit"><i className="fa fa-search mx-1" aria-hidden="true"></i>Search Trip</Button>
            </Form>
        </Aux>
    )
};

const mapStateToProps = state => {
    return {
        formData: state.searchTrip.formData,
        terminals: state.searchTrip.terminals
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTerminals: () => dispatch(actions.getTerminals()),
        onChanged: (key, value) => dispatch(actions.searchInputChange(key, value)),
        onSearch: (from, to) => dispatch(actions.searchTrips(from, to))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchTripForm));

