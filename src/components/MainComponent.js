import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './HomeComponent';
import Jobs from './JobsComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Profile from './ProfileComponent';
import JobsInfo from './JobsInfoComponent';
import SignUp from './SignUpComponent';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            user: ''
        };

        console.log(this.state.isLoggedIn);
    }

    componentDidMount = () => {
        fetch('/users/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ isLoggedIn: data.loggedIn, user: data.user });
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleLogout = () => {
        console.log("LOGOUT");
        fetch('/users/logout', {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => {
                console.log(res);
                this.setState({ isLoggedIn: false, user: '' });
                this.props.history.push("/");
                return res.json();
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <>
                <Header loggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/jobs' component={Jobs} />
                    <Route path="/jobs/:id" component={JobsInfo} />
                    <Route path="/profile"
                        render={() => (
                            <Profile user={this.state.user} />
                        )}/>
                    <Route path="/signup" exact component={SignUp} />
                </Switch>
                <Footer />
            </>
        );
    };
}

export default Main;