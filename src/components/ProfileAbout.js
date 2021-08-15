import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import '../profile.scss';
import AuthContext from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../redux/profile";

const About = (props) => {

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [inputs, setInputs] = useState({});
    const { user } = useContext(AuthContext);

    const profile = useSelector((state) => state.profile.data);
    console.log(profile);

    const toggle = () => setModal(!modal);

    const editProfileAbout = (about) => {
        console.log(about);
        setInputs(about);
    }

    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(inputs));
        console.log(user);
        console.log("phone num inputs: ", inputs.phoneNum);
        const updateArgs = {
            user,
            category: null,
            itemId: null,
            payload: { "phoneNum": inputs.phoneNum }
        };
        console.log(inputs);
        dispatch(editProfile(updateArgs));
        toggle();
    }

    return (
        props.profile.map((info) => {
            return (
                <div className="info text-center" key={info._id}>
                    <div className="align-items-center px-sm-2 py-2 mb-2 header">
                        <div>
                            <h2>{info.name || ""}</h2>
                            <div>{info.email || ""}</div>
                            <div>{info.phoneNum && info.phoneNum}</div>
                        </div>
                        <h2><i className="fa fa-pencil" onClick={() => { editProfileAbout(info); toggle();}}></i></h2>
                    </div>
                    <Modal isOpen={modal} toggle={toggle} centered={true}>
                        <ModalHeader toggle={toggle}>Edit About</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="username">Name</Label>
                                    <Input type="text" id="name" name="name" placeholder="Name" defaultValue={`${info.name}`} readOnly />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" name="email" placeholder="Email" defaultValue={info.email} readOnly />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="phoneNum">Phone Number</Label>
                                    <Input type="text" id="phoneNum" name="phoneNum" placeholder="Phone Number" defaultValue={info.phoneNum} onChange={handleChange} />
                                </FormGroup>
                                <div className="text-center">
                                    <Button type="submit" color="primary">Save</Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            )
        })
    )
}

export default About;