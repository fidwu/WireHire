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
        setStartDate(null);
        setEndDate(null);
        setIsCurrent(false);
        setErrorMsg("");
    }
    const [errorMsg, setErrorMsg] = useState("");

    const { user } = useContext(AuthContext);

    const profileExp = useSelector((state) => state.profile.data[0].experience);
    console.log(profileExp);

    // make a copy to sort by date
    let profileExpSorted = [...profileExp];

    // sort from most recent to oldest
    profileExpSorted.sort((a, b) => {
        if (a.isCurrent) {
            return -1;
        }
        else {
            if (a.endDate > b.endDate) {
                return -1;
            }
            else if (a.endDate < b.endDate) {
                return 1;
            }
            else {
                return 0;
            }
        }
    })

    // experience form values
    const [experience, setExperience] = useState({
        company: "",
        title: "",
        description: ""
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isCurrent, setIsCurrent] = useState(false);

    const handleChange = (e) => {
        setExperience(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const formatDate = (date, isCurrent) => {
        let formattedDate;
        if (isCurrent) {
            return "Present";
        }
        if (isValid(new Date(date)) && !isNaN(new Date(date))) {
            formattedDate = format(new Date(date), "MM/yy");
        }
        return formattedDate;
    }

    const editItem = (experience) => {
        setExperience(experience);
        setIsCurrent(experience.isCurrent);
        setErrorMsg("");
    }

    const handleSubmit = (e, experienceId = null) => {
        e.preventDefault();
        const payload = {
            ...experience, 
            ...(startDate && { startDate: new Date(startDate) }), 
            ...({ isCurrent }),
            ...(endDate &&  { endDate: new Date(endDate) } 
            )
        };
        console.log(payload);

        const requiredFieldsFilled = payload.company && payload.title && payload.startDate && (payload.isCurrent || payload.endDate);

        if (requiredFieldsFilled) {
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
        else {
            setErrorMsg("Required fields cannot be empty.");
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
                    errorMsg={errorMsg}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    endDate={endDate}
                    isCurrent={isCurrent}
                    setIsCurrent={setIsCurrent}
                    handleChange={handleChange}
                    submit={handleSubmit}
                />
            </div>
            {profileExpSorted.length > 0 ?
                profileExpSorted.map((experience, idx) => {
                    return (
                        <div className="experience text-left" key={idx}>
                        <Row className="my-2 mx-0 w-100">
                            <Col xs={7} lg={5} className="p-0 font-weight-bold">{experience.company}</Col>
                            <Col xs={{ order: 3 }} md={{ order: 2 }} className="p-0 col-xs-5 col-lg-5 text-lg-center">{formatDate(experience.startDate)} - {formatDate(experience.endDate, experience.isCurrent)}</Col>
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
                            errorMsg={errorMsg}
                            company={experience.company}
                            title={experience.title}
                            startDate={startDate || experience.startDate}
                            setStartDate={setStartDate}
                            endDate={endDate || experience.endDate}
                            setEndDate={setEndDate}
                            isCurrent={isCurrent}
                            setIsCurrent={setIsCurrent}
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