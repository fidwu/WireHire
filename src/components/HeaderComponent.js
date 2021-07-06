import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Alert} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            successMsg: null,
            errorMsg: null
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        console.log(this.props.user);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.username.value || !this.password.value) {
            this.setState({ errorMsg: "Missing username and password" });
        }
        else {
            const loginBody = {
                username: this.username.value,
                password: this.password.value
            }
            fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(loginBody)
            })
                .then(res => {
                    console.log(res);
                    // close the modal if login is successful, otherwise, clear password field and display error
                    if (res.status === 200) {
                        this.setState({ successMsg: "Login successful!" });
                        this.setState({ errorMsg: null });
                        this.props.setUser(null);
                    }
                    else {
                        this.password.value = "";
                        this.setState({ errorMsg: "Invalid username or password" });
                        this.setState({ successMsg: null });
                        this.props.setUser(null);
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    this.props.setUser(data.user);
                    setTimeout(() => {
                        this.toggleModal();
                        this.setState({ successMsg: null });
                        this.setState({ errorMsg: null });
                    }, 1000);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        const modalStyles = {
            overlay: {
              backgroundColor: '#ffffff',
            },
          };
        return (
            <React.Fragment>
                <Navbar sticky="top" className="navbar" expand="md" dark>
                    <div className="container">
                        <NavbarBrand className="mr-auto nav-item-color" tag={Link} to="/">WireHire</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="mr-auto">
                                <NavItem className="nav-item">
                                    <NavLink className="nav-link nav-item-color" to="/">
                                        <i className="fa fa-home fa-lg" /> Home
                                        </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link nav-item-color" to="/profile">
                                        <i className="fa fa-user" /> Profile
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link nav-item-color" to="/jobs">
                                        <i className="fa fa-briefcase"/> Jobs
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            {this.props.user ? 
                                <span onClick={this.props.handleLogout}>
                                    <Button className="navbar-text float-sm-right nav-item-color" variant="outline-success">
                                        <i className="fa fa-sign-out fa-lg" /> Logout
                                    </Button>
                                </span>
                                :
                                <span>
                                    <Button className="navbar-text float-sm-right nav-item-color" variant="outline-success" onClick={this.toggleModal}>
                                        <i className="fa fa-sign-in fa-lg" /> Login
                                    </Button>
                                </span>
                            }
                        </Collapse>
                    </div>
                </Navbar>
                <CSSTransition
                    in={this.state.isModalOpen}
                    timeout={300}
                    classNames="dialog"
                >
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} style={modalStyles} contentLabel="modal" closeTimeoutMS={2000}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            {this.state.successMsg ?
                                <Alert color="success">
                                    {this.state.successMsg}
                                </Alert>
                                : null
                            }
                            {this.state.errorMsg ?
                                <Alert color="danger">
                                    {this.state.errorMsg}
                                </Alert>
                                : null
                            }
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" placeholder="username" innerRef={input => this.username = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" placeholder="password" innerRef={input => this.password = input} />
                            </FormGroup>
                            <Button className="modalLogin" type="submit" value="submit" color="info">Login</Button>
                            <p className="message">Not registered? <Link to="/signup" onClick={this.toggleModal}>Create an account</Link></p>
                        </Form>
                    </ModalBody>
                </Modal>
                </CSSTransition>
            </React.Fragment>
        );
    }
}

export default Header;