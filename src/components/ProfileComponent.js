import React, { useContext } from "react";
import Experience from "./ExperienceComponent";
import "../profile.scss";
import Education from "./EducationComponent";
import About from "./ProfileAbout";
import Skills from "./SkillsComponent";
import AuthContext from "./Auth";
import { useSelector } from "react-redux";

const Profile = () => {

  const { user } = useContext(AuthContext);

  const profile = useSelector((state) => state.profile);

  if (user) {
    if (profile.status === "loading") {
      return <h2>Loading</h2>
    }
    else if (profile.status === "failed") {
      return <h2>Error</h2>
    }
    else {
      return (
        <div className="profile">
          <div className="aboutSection">
            <About profile={profile.data} />
          </div>
          <Experience />
          <Education />
          <Skills />
        </div>
      );
    }
  }
  else {
    return (
      <div className="profile">
        <h5>Sign in or create an account to view profile.</h5>
      </div>
    )
  }
};

export default Profile;
