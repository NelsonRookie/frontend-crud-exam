import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormFeedback } from "reactstrap";

function AddModal({ isOpen, toggle, newUser, setNewUser, createUser }) {
    const [errors, setErrors] = useState({
        email: "",
        first_name: "",
        last_name: "",
    });

    // Validate inputs
    const validate = () => {
        const newErrors = {};
        if (!newUser.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!newUser.first_name) {
            newErrors.first_name = "First Name is required";
        }

        if (!newUser.last_name) {
            newErrors.last_name = "Last Name is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = () => {
        if (validate()) {
            createUser(); // Call createUser if validation passes
        }
    };

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
                    invalid={!!errors.email}
                />
                <FormFeedback>{errors.email}</FormFeedback>

                <Input
                    type="text"
                    placeholder="First Name"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                    className="mb-2"
                    invalid={!!errors.first_name}
                />
                <FormFeedback>{errors.first_name}</FormFeedback>

                <Input
                    type="text"
                    placeholder="Last Name"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                    invalid={!!errors.last_name}
                />
                <FormFeedback>{errors.last_name}</FormFeedback>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
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
