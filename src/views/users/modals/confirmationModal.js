import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
function ConfirmationModal({ isOpen, toggle, message }) {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className='fade-in-modal'>
            <ModalHeader toggle={toggle}>User Created</ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ConfirmationModal;
