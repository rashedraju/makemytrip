import React from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Header from '../../component/UI/Header/Header';
import SearchTripForm from '../../component/Form/SearchTripForm/SearchTripForm';

const landingPage = () => {
    return (
        <Aux>
            <Header>
                <SearchTripForm />
            </Header>
        </Aux>

    );
}

export default landingPage;