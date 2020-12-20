import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../../component/Navigation/Navigation';
import './layout.scss';

const layout = (props) => {
    return (
        <div className="layout">
            <Navigation />
            <main>{props.children}</main>
        </div>
    );
}

layout.propTypes = {
    children: PropTypes.node
}

export default layout;