import { Row, Col, Button } from 'reactstrap';
import format from 'date-fns/format';

const FullJobPosting = (props) => {
    return (
        <div className="job-posting-full text-left">
            <Row>
                <Col className="p-0 font-weight-bold"><h2>Role: {props.role}</h2></Col>
                <Button color="primary">Apply</Button>
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