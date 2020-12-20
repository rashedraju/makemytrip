import React from 'react';
import { Modal } from 'react-bootstrap';

const modal = props => (
    <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Body>
            {props.children}
        </Modal.Body>
    </Modal>
)

export default modal