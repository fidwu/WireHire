import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Home from "./HomeComponent";
import Jobs from "./JobsComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Profile from "./ProfileComponent";
import JobsInfo from "./JobsInfoComponent";
import SignUp from "./SignUpComponent";
import AuthContext from "./Auth";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const history = useHistory();

  useEffect(() => {
    fetch("api/users/auth", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoggedIn(data.loggedIn);
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    console.log("LOGOUT");
    fetch("api/users/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
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
