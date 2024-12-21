import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from "reactstrap";

function EditModal({ isOpen, toggle, editUser, setEditUser, updateUser }) {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit User</ModalHeader>
            <ModalBody>
                <Input
                    type="email"
                    placeholder="Email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    className="mb-2"
                />
                <Input
                    type="text"
                    placeholder="First Name"
                    value={editUser.first_name}
                    onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
                    className="mb-2"
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={editUser.last_name}
                    onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={updateUser}>
                    Submit
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default EditModal;
