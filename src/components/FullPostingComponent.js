import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import AuthContext from "./Auth";
import format from 'date-fns/format';
import { applyToJob, getAppliedJobs } from "../redux/jobs";
import { useDispatch, useSelector } from "react-redux";

const FullJobPosting = (props) => {

    const [modal, setModal] = useState(false);
    const [alreadyApplied, setAlreadyApplied] = useState(false);

    const toggle = () => setModal(!modal);
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.jobs);

    const applied = useSelector((state) => state.jobs.applied);

    useEffect(() => {
        if (!applied.length) {
            setAlreadyApplied(false);
            return;
        }
        return applied.filter(job => {
            if (job._id === props.id) {
                setAlreadyApplied(true);
                return true;
            }
            return false;
        });
    }, [applied, props.id])

    const apply = () => {
        const data = {
            user,
            jobId: props.id
        };
        dispatch(applyToJob(data));
        setTimeout(() => {
            toggle();
            dispatch(getAppliedJobs(user));
        }, 2000);
    }

    return (
        <div className="job-posting-full text-left">
            <Row>
                <Col xs="12" md="10" className="p-0 font-weight-bold"><h2>Role: {props.role}</h2></Col>
                {alreadyApplied ?
                    <Button color="secondary" onClick={toggle} disabled>
                        Applied
                    </Button>
                    :
                    <Button color="primary" onClick={toggle} disabled={!user}>
                        Apply 
                    </Button>
                }
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Apply to {props.role} job posting?
                    </ModalHeader>
                    <ModalBody>
                        {jobs.appliedStatus === "success" &&
                            <Alert color="success">
                                Successfully applied
                            </Alert>
                        }
                        {jobs.appliedStatus === "failed" &&
                            <Alert color="danger">
                                Server Error - not able to apply
                            </Alert>
                        }
                        <div>Profile information will be sent with application.</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={toggle}>Cancel</Button>
                        <Button color="primary" onClick={apply}>Yes, Apply</Button>{' '}
                    </ModalFooter>
                </Modal>
            </Row>
            <Row>
                <p>Posted: {format(new Date(props.date), 'M/d/yy')}</p>
            </Row>
            <Row>
                <div id="description">
                    {props.description}
                </div>
            </Row>
        </div>
    )
}

export default FullJobPosting;