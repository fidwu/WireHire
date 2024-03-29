import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col, Alert, InputGroup, InputGroupAddon, Badge } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../profile.scss';

export const EducationModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true}>
            <ModalHeader>{props.action} Education</ModalHeader>
            <ModalBody>
                {props.errorMsg ? (
                    <Alert color="danger">{props.errorMsg}</Alert>
                ) : null}
                <Form onSubmit={props.submit}>
                    <FormGroup>
                        <Label htmlFor="school">School <span className="text-danger">*</span></Label>
                        <Input type="text" id="school" name="school" placeholder="School" defaultValue={props.school || ''} onChange={props.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="degree">Degree <span className="text-danger">*</span></Label>
                        <Input type="text" id="degree" name="degree" placeholder="Degree" defaultValue={props.degree || ''} onChange={props.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label htmlFor="startdate">Start Date <span className="text-danger">*</span></Label>
                                <DatePicker
                                    className="form-control"
                                    selected={props.startDate && new Date(props.startDate)}
                                    onChange={(date) => props.setStartDate(date)}
                                    placeholderText="mm/yy"
                                    selectsStart
                                    dateFormat="MM/yy"
                                    showMonthYearPicker
                                />
                            </Col>
                            <Col>
                                <Label htmlFor="enddate">End Date (or Expected) <span className="text-danger">*</span></Label>
                                <DatePicker
                                    className="form-control"
                                    selected={props.endDate && new Date(props.endDate)}
                                    onChange={(date) => props.setEndDate(date)}
                                    selectsEnd
                                    minDate={props.startDate}
                                    placeholderText="mm/yy"
                                    dateFormat="MM/yy"
                                    showMonthYearPicker
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="gpa">GPA</Label>
                        <Input type="text" id="gpa" name="gpa" placeholder="GPA" defaultValue={props.gpa || ''} onChange={props.handleChange} />
                    </FormGroup>
                    <div className="text-center">
                        <Button type="submit" color="primary">Save</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export const ExperienceModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true}>
            <ModalHeader toggle={props.toggle}>{props.action} Experience</ModalHeader>
            <ModalBody>
                {props.errorMsg ? (
                    <Alert color="danger">{props.errorMsg}</Alert>
                ) : null}
                <Form onSubmit={props.submit}>
                    <FormGroup>
                        <Label htmlFor="company">Company <span className="text-danger">*</span></Label>
                        <Input type="text" id="company" name="company" placeholder="Company" defaultValue={props.company || ''} onChange={props.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="title">Title <span className="text-danger">*</span></Label>
                        <Input type="text" id="title" name="title" placeholder="Title" defaultValue={props.title || ''} onChange={props.handleChange} />
                    </FormGroup>
                    <FormGroup className="mb-1">
                        <Row>
                            <Col>
                                <Label htmlFor="startdate">Start Date <span className="text-danger">*</span></Label>
                                <DatePicker
                                    className="form-control"
                                    selected={props.startDate && new Date(props.startDate)}
                                    onChange={(date) => props.setStartDate(date)}
                                    selectsStart
                                    placeholderText="mm/yy"
                                    dateFormat="MM/yy"
                                    showMonthYearPicker
                                />
                            </Col>
                            <Col>
                                <Label htmlFor="enddate">End Date <span className="text-danger">*</span></Label>
                                {!props.isCurrent ?
                                    <DatePicker
                                        className="form-control"
                                        selected={props.endDate && new Date(props.endDate)}
                                        onChange={(date) => props.setEndDate(date)}
                                        selectsEnd
                                        minDate={props.startDate}
                                        placeholderText="mm/yy"
                                        dateFormat="MM/yy"
                                        showMonthYearPicker
                                    />
                                    : 
                                    <div className="form-control read-only">
                                        Present
                                    </div>
                                }
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox" 
                                name="isCurrent" 
                                onChange={(e) => {
                                    props.setEndDate(null);
                                    props.setIsCurrent(e.target.checked);
                                }}
                                defaultChecked={props.isCurrent}
                            />{' '}
                            Currently working here
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input type="textarea" id="description" name="description" placeholder="Description" defaultValue={props.description || ''} onChange={props.handleChange} />
                    </FormGroup>
                    <div className="text-center">
                        <Button type="submit" color="primary">Save</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}


export const SkillsModal = (props) => {
    const [fadeIn, setFadeIn] = useState(true);
    const toggle = () => {
        setFadeIn(true);
        setTimeout(() => {
            setFadeIn(false);
        }, 2000);
    }
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true}>
            <ModalHeader toggle={props.toggle}>{props.action} Skills</ModalHeader>
            <ModalBody>

                {props.errorMsg ? (
                    <Alert color="danger" className={`${fadeIn ? 'alert-shown' : 'alert-hidden'}`}>{props.errorMsg}</Alert>
                ) : null}

                <Form onSubmit={props.submit}>
                    <InputGroup>
                        <Input placeholder="Add Skill" value={props.skill || ''} onChange={(e) => props.setSkill(e.target.value)} />
                        <InputGroupAddon addonType="append">
                            <Button color="primary" type="submit" onClick={toggle}>Add</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
                <div className="d-flex skills mt-2 flex-wrap justify-content-center">
                    {props.displaySkills.length ?
                        props.displaySkills.map((skills, idx) => {
                            return (
                                <div key={idx} className="d-flex m-2">
                                    <Badge color="secondary">{skills.skill} <button onClick={() => props.delete(skills._id)} className="skill-delete">&#x2715;</button></Badge>
                                </div>
                            )
                        })
                        : <div className="pb-2">No skills to display</div>
                    }
                </div>
            </ModalBody>
        </Modal>
    )
}


// export default ProfileModal;