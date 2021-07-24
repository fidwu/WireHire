import React, { useState, useContext } from 'react';
import { Row, Col } from 'reactstrap';
import '../profile.scss';
import { ExperienceModal } from './ProfileModal';
import AuthContext from "./Auth";
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import { useDispatch, useSelector } from "react-redux";
import { postProfile, editProfile, deleteProfileItem } from "../redux/profile";

const Experience = () => {

    const dispatch = useDispatch();

    // opening and closing modals
    const [modalID, setModalID] = useState(null);
    const toggleModal = (e, idx) => setModalID(idx);

    const [modal, setModal] = useState(false);
    const toggleAddForm = () => {
        setModal(!modal);
        // reset form to empty state
        setExperience({
            company: "",
            title: "",
            description: ""
        })
    }

    const { user } = useContext(AuthContext);
    console.log(user);

    const profileExp = useSelector((state) => state.profile.data[0].experience);
    console.log(profileExp);

    // experience form values
    const [experience, setExperience] = useState({
        company: "",
        title: "",
        description: ""
    });
    const [startDate, setStartDate] = useState(false);
    const [endDate, setEndDate] = useState(false);

    const handleChange = (e) => {
        setExperience(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const formatDate = (date) => {
        let formattedDate;
        if (isValid(new Date(date)) && !isNaN(new Date(date))) {
            formattedDate = format(new Date(date), "MM/yy");
        }
        return formattedDate;
    }

    const editItem = (experience) => {
        setExperience(experience);
    }

    const handleSubmit = (e, experienceId = null) => {
        e.preventDefault();
        const payload = {
            ...experience, 
            ...(startDate && { startDate }), 
            ...(endDate && { endDate })
        };
        console.log(payload);
        
        if (experienceId) {
            const updateArgs = {
                user,
                category: "experience",
                itemId: experienceId,
                payload
            };
            dispatch(editProfile(updateArgs));
            toggleModal();
        }
        else {
            const postArgs = {
                user,
                category: "experience",
                payload
            };
            dispatch(postProfile(postArgs));
            toggleAddForm();
        }
    }

    const deleteItem = (e, experienceId) => {
        e.preventDefault();
        const deleteArgs = {
            user,
            category: "experience",
            itemId: experienceId
        };
        dispatch(deleteProfileItem(deleteArgs));
    }

    return (
        <div className="experiencesSection">
            <div className="align-items-center px-sm-2 py-1 header">
                <h2>Experience</h2>
                <h2><i className="fa fa-plus" onClick={toggleAddForm}></i></h2>
                <ExperienceModal
                    isOpen={modal}
                    toggle={toggleAddForm}
                    action="Add"
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    endDate={endDate}
                    handleChange={handleChange}
                    submit={handleSubmit}
                />
            </div>
            {profileExp.length > 0 ?
                profileExp.map((experience, idx) => {
                    return (
                        <div className="experience text-left" key={idx}>
                        <Row className="my-2 mx-0 w-100">
                            <Col xs={7} lg={5} className="p-0 font-weight-bold">{experience.company}</Col>
                            <Col xs={{ order: 3 }} md={{ order: 2 }} className="p-0 col-xs-5 col-lg-5 text-lg-center">{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</Col>
                            <Col lg={{ order: 3 }} className="p-0 col text-right">
                                <i className="fa fa-pencil px-2" onClick={e => { editItem(experience); toggleModal(e, idx) }}></i>
                                <i className="fa fa-times px-2" onClick={e => deleteItem(e, experience._id)}></i>
                            </Col>
                        </Row>
                        <Row className="mb-2 mx-0">{experience.title}</Row>
                        <Row className="mb-2 mx-0">
                            {experience.description}
                        </Row>
                        <ExperienceModal
                            isOpen={modalID === idx}
                            toggle={toggleModal}
                            action="Edit"
                            company={experience.company}
                            title={experience.title}
                            startDate={experience.startDate ? new Date(experience.startDate) : startDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            endDate={experience.endDate ? new Date(experience.endDate) : endDate}
                            description={experience.description}
                            handleChange={handleChange}
                            submit={e => handleSubmit(e, experience._id)}
                        />
                    </div>
                    )
                })
                :
                <div className="pb-2">No work experience to display</div>
            }
        </div>
    )
}

export default Experience;