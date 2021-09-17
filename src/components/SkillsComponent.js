import React, { useState, useContext } from 'react';
import { Badge, Button } from 'reactstrap';
import '../profile.scss';
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "./Auth";
import { SkillsModal } from './ProfileModal';
import { deleteProfileItem, postProfile } from "../redux/profile";

const Skills = () => {

    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();

    const profileSkills = useSelector((state) => state.profile.data[0].skills);
    console.log(profileSkills);

    const [modal, setModal] = useState(false);
    const [skill, setSkill] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const editSkillsModal = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSkill(null)
        
        if (skill) {
            const args = {
                user,
                category: "skills",
                payload: { skill }
            };
            dispatch(postProfile(args));
        }
    }

    const handleDelete = (skillId) => {
        console.log(skillId)
        const args = {
            user,
            category: "skills",
            itemId: skillId
        };
        dispatch(deleteProfileItem(args));
    }

    return (
        <div className="skillsSection">
            <div className="align-items-center px-sm-2 py-1 header">
                <h2>Skills</h2>
                <Button onClick={editSkillsModal}>Edit</Button>
                <SkillsModal 
                    isOpen={modal}
                    toggle={editSkillsModal}
                    action="Add"
                    skill={skill}
                    setSkill={setSkill}
                    displaySkills={profileSkills}
                    delete={handleDelete}
                    submit={handleSubmit}
                />
            </div>
            <div className="skills text-left">
                <div className="d-flex justify-content-center align-items-center flex-wrap mb-3">
                    {profileSkills.length ?
                        profileSkills.map((skills, idx) => {
                            return (
                                <p key={idx} className="m-2"><Badge color="secondary">{skills.skill}</Badge></p>
                            )
                        })
                    : 
                        <div className="pb-2">No skills to display</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Skills;