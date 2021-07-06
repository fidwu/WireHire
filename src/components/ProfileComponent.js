import React, { useState, useEffect, useContext } from "react";
import Experience from "./ExperienceComponent";
import "../profile.scss";
import Education from "./EducationComponent";
import About from "./ProfileAbout";
import Skills from "./SkillsComponent";
import AuthContext from "./Auth";

const Profile = (props) => {
  const [userProfile, setUserProfile] = useState([]);

  console.log(userProfile);

  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    console.log("ready to fetch");

    const fetchProfileData = async () => {
      try {
        console.log(user);
        // let username = localStorage.getItem('user');
        const result = await fetch(`profile/${user}`);
        const body = await result.json();
        console.log(body);
        setUserProfile(body);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchProfileData();
  }, [user]);

  if (userProfile.length !== 0) {
      console.log(userProfile);
    return (
      <div className="profile">
        <div className="aboutSection">
          <About profile={userProfile} />
        </div>
        <Experience experience={userProfile[0].experience} />
        <Education education={userProfile[0].education} />
        {/* <Skills /> */}
      </div>
    );
  } 
  else {
    return (
      <div className="profile">
        <h5>Sign in or create an account to create a profile</h5>
      </div>
    );
  }
};

export default Profile;
