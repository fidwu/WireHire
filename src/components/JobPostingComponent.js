import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import format from 'date-fns/format';
import AuthContext from "./Auth";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const JobPosting = (props) => {

    const { user } = useContext(AuthContext);
    const history = useHistory();

    const applied = useSelector((state) => state.jobs.applied);

    const goToJobPosting = (jobId) => {
        history.push(`/jobs/${jobId}`);
    }

    const checkApplied = (jobId) => {
        if (!applied.length) {
            return false;
        }
        const userAppliedArr = applied.filter(job => {
            return job._id === jobId;
        });
        return userAppliedArr.length;
    }

    return (
        <div className="job-posting text-left" onClick={() => goToJobPosting(props.id)}>
            <Row>
                <Col xs="12" md="6" className="p-0 font-weight-bold job-posting-role">Role: {props.role}</Col>
                <Col className="p-0 text-md-right">Posted: {format(new Date(props.date), 'M/d/yy')}</Col>
            </Row>
            <Row>
                <div className="job-posting-location pb-2">{props.location}</div>
            </Row>
            <Row>
                {checkApplied(props.id) ?
                    <Button color="secondary" size="sm" disabled onClick={() => goToJobPosting(props.id)}>
                        Applied
                    </Button>
                    :
                    <Button color="primary" size="sm" disabled={!user} onClick={() => goToJobPosting(props.id)} id="login-tooltip">
                        Apply 
                    </Button>
                }
            </Row>
            <Row>
                <div id="description" className="truncate">
                    {props.description}
                </div>
            </Row>
            <Row>
                <Link to="#" className="readMore">Read more</Link>
            </Row>
        </div>
    )
}

export default JobPosting;