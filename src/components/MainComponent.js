import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Home from "./HomeComponent";
import Jobs from "./JobsComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Profile from "./ProfileComponent";
import JobsInfo from "./JobsInfoComponent";
import SignUp from "./SignUpComponent";
import AuthContext from "./Auth";
import { fetchProfile, resetProfile } from "../redux/profile";
import { fetchJobs, getAppliedJobs, resetJobs } from "../redux/jobs";
import { useDispatch } from "react-redux";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    fetch("/api/users/auth", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.err);
        }
        return res.json();
      })
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchJobs());
    if (user) {
      dispatch(fetchProfile(user));
      dispatch(getAppliedJobs(user));
    }
    else {
      dispatch(resetProfile());
      dispatch(resetJobs());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    fetch("/api/users/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        setIsLoggedIn(false);
        setUser(null);
        history.push("/");
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user }}>
      <Header
        user={user}
        handleLogout={handleLogout}
        setUser={setUser}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/jobs" component={Jobs} />
        <Route path="/jobs/:id" component={JobsInfo} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" exact 
            render={() => 
                <SignUp 
                    user={user}
                    handleLogout={handleLogout}
                    setUser={setUser}
                />
            } 
        />
      </Switch>
      <Footer />
    </AuthContext.Provider>
  );
};

export default Main;
