import React, { useState, useEffect, useContext } from "react";
import Experience from "./ExperienceComponent";
import "../profile.scss";
import Education from "./EducationComponent";
import About from "./ProfileAbout";
import Skills from "./SkillsComponent";
import AuthContext from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/profile";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    console.log("go into here please");
    console.log(user);
    if (user) {
      dispatch(fetchProfile(user));
    }
  }, [dispatch, user]);

  const profile = useSelector((state) => state.profile);
  console.log(profile);

  if (user) {
    console.log(profile);
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
          {/* <Skills /> */}
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
