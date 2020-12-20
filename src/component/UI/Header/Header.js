import React from 'react';
import './Header.scss';

const header = (props) => (
    <header className="header d-flex flex-column justify-content-center align-items-center text-center">
        <h1  className="text-white font-weight-bold">Find and book your low-cost bus trip</h1>
        {props.children}
    </header> 
)

export default header;