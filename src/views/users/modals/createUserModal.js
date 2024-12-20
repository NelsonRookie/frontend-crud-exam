import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from "reactstrap";

function AddModal({ isOpen, toggle, newUser, setNewUser, createUser }) {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add User</ModalHeader>
            <ModalBody>
                <Input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="mb-2"
                />
                <Input
                    type="text"
                    placeholder="First Name"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                    className="mb-2"
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={createUser}>
                    Submit
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddModal;
