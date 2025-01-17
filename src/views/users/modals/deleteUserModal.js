import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";


function DeleteModal({ isOpen, toggle, deleteUser, deleteUserById }) {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Delete User</ModalHeader>
            <ModalBody className="modal-body">
                <img src={deleteUser?.avatar} alt="User Profile"></img>
                <div className="user-details">
                    <p><strong>ID:</strong> {deleteUser?.id}</p>
                    <p><strong>Email:</strong> {deleteUser?.email}</p>
                    <p><strong>First Name:</strong> {deleteUser?.first_name}</p>
                    <p><strong>Last Name:</strong> {deleteUser?.last_name}</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={deleteUserById}>
                    Submit
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteModal;
