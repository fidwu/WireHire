import React, { useState, useContext } from 'react';
import { Row, Col } from 'reactstrap';
import '../profile.scss';
import { EducationModal } from './ProfileModal';
import AuthContext from "./Auth";
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import { useDispatch, useSelector } from "react-redux";
import { postProfile, editProfile, deleteProfileItem } from "../redux/profile";

const Education = () => {

    const dispatch = useDispatch();

    const [eduInputs, setEduInputs] = useState({
        school: "",
        degree: "",
        gpa: ""
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // opening and closing modals
    const [modalID, setModalID] = useState(null);
    const toggleModal = (e, idx) => setModalID(idx);

    const [modal, setModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const toggleAddForm = () => {
        setModal(!modal);
        // reset form to empty state
        setEduInputs({
            school: "",
            degree: "",
            gpa: ""
        });
        setStartDate(null);
        setEndDate(null);
        setErrorMsg("");
    }

    const { user } = useContext(AuthContext);
    console.log(user);

    const profileEdu = useSelector((state) => state.profile.data[0].education);
    console.log(profileEdu);

    const handleChange = (e) => {
        setEduInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const formatDate = (date) => {
        let formattedDate;
        if (isValid(new Date(date)) && !isNaN(new Date(date))) {
            formattedDate = format(new Date(date), "MM/yy");
        }
        return formattedDate;
    }

    const editItem = (education) => {
        console.log(education);
        setEduInputs(education);
    }

    const handleSubmit = (e, educationId = null) => {
        e.preventDefault();
        const payload = {
            ...eduInputs, 
            ...(startDate && { startDate }), 
            ...(endDate && { endDate })
        };
        console.log(payload);

        const requiredFieldsFilled = payload.school && payload.degree && payload.startDate && payload.endDate;
        
        if (requiredFieldsFilled) {
            if (educationId) {
                const updateArgs = {
                    user,
                    category: "education",
                    itemId: educationId,
                    payload
                };
                console.log(payload);
                dispatch(editProfile(updateArgs));
                toggleModal();
            }
            else {
                const postArgs = {
                    user,
                    category: "education",
                    payload
                };
                dispatch(postProfile(postArgs));
                toggleAddForm();
            }
        }
        else {
            setErrorMsg("Required fields cannot be empty.");
        }
    }

    const deleteItem = (e, educationId) => {
        e.preventDefault();
        const deleteArgs = {
            user,
            category: "education",
            itemId: educationId
        };
        dispatch(deleteProfileItem(deleteArgs));
    }

    return (
        <div className="educationSection">
            <div className="align-items-center px-sm-2 py-1 header">
                <h2>Education</h2>
                <h2><i className="fa fa-plus" onClick={toggleAddForm}></i></h2>
                <EducationModal
                    isOpen={modal}
                    toggle={toggleAddForm}
                    action="Add"
                    errorMsg={errorMsg}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    endDate={endDate}
                    handleChange={handleChange}
                    submit={handleSubmit}
                />
            </div>
            {profileEdu.length ?
                profileEdu.map((education, idx) => {
                    return (
                        <div className="education text-left" key={idx}>
                            <Row className="my-2 mx-0 w-100">
                                <Col xs={7} lg={5} className="p-0 font-weight-bold">{education.school} - {education.degree}</Col>
                                <Col xs={{ order: 3 }} md={{ order: 2 }} className="p-0 col-xs-5 col-lg-5 text-lg-center">{formatDate(education.startDate)} - {formatDate(education.endDate)}</Col>
                                <Col lg={{ order: 3 }} className="p-0 col text-right">
                                    <i className="fa fa-pencil px-2" onClick={e => { editItem(education); toggleModal(e, idx) }}></i>
                                    <i className="fa fa-times px-2" onClick={e => deleteItem(e, education._id)}></i>
                                </Col>
                            </Row>
                            <Row className="mb-2 mx-0">GPA: {education.gpa?.toFixed(1)}</Row>
                            <Row className="mb-2 mx-0">{education.description}</Row>
                            <EducationModal
                                isOpen={modalID === idx}
                                toggle={toggleModal}
                                action="Edit"
                                errorMsg={errorMsg}
                                school={education.school}
                                degree={education.degree}
                                startDate={startDate || education.startDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                endDate={endDate || education.endDate}
                                gpa={education.gpa}
                                handleChange={handleChange}
                                submit={e => handleSubmit(e, education._id)}
                            />
                        </div>
                    )
                })
            : 
                <div className="pb-2">No education to display</div>
            }
        </div>
    )
}

export default Education;