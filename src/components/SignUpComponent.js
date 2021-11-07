import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Col, Row, Alert } from "reactstrap";

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
        successMsg: null,
        errorMsg: null
    };

  }

  // Check the register object to ensure they are all filled in
  allFilled = (register) => {
    for (var key in register) {
      if (register[key] === "") {
        this.setState({ errorMsg: "Please fill in all fields." });
        return false;
      }
    }
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const register = {
      username: this.username.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      password: this.password.value,
      email: this.email.value,
    };
    if (this.allFilled(register)) {
      fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(register),
      })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ successMsg: "Login successful!" });
            this.setState({ errorMsg: null });
          }
          return res.json();
        })
        .then((data) => {
          // Display email error
          if (data.err.errors) {
            this.setState({ errorMsg: "Invalid email" });
            this.setState({ successMsg: null });
            this.props.setLoggedIn(false);
          }
          // Display username exists error
          else if (data.err) {
            this.setState({ errorMsg: data.err.message });
            this.setState({ successMsg: null });
            this.props.setLoggedIn(false);
          }
          // No error
          else {
            this.props.setLoggedIn(true);
            this.props.setUser(data.user);
            setTimeout(() => {
              this.setState({ successMsg: "Login successful!" });
              this.setState({ errorMsg: null });
              this.props.history.push("/");
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <Form>
        <h3 className="my-4">Create Account</h3>
        <div className="signup">
          {this.state.successMsg ? (
            <Alert color="success">{this.state.successMsg}</Alert>
          ) : null}
          {this.state.errorMsg ? (
            <Alert color="danger">{this.state.errorMsg}</Alert>
          ) : null}
        </div>
        <FormGroup className="signup">
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            innerRef={(input) => (this.username = input)}
          />
        </FormGroup>
        <Row form className="signup mx-auto">
          <Col md={6} className="pl-0">
            <FormGroup>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                innerRef={(input) => (this.firstName = input)}
              />
            </FormGroup>
          </Col>
          <Col md={6} className="pr-0">
            <FormGroup>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                innerRef={(input) => (this.lastName = input)}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="signup">
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            innerRef={(input) => (this.password = input)}
          />
        </FormGroup>
        <FormGroup className="signup">
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            innerRef={(input) => (this.email = input)}
          />
        </FormGroup>
        <FormGroup className="signup">
          <div className="container">
            <div className="row">
              <Label className="resume">Upload Resume</Label>
              <Input
                type="file"
                id="resume"
                name="resume"
                placeholder="Word or PDF"
                innerRef={(input) => (this.resume = input)}
              />
            </div>
          </div>
        </FormGroup>
        <Button
          type="submit"
          value="submit"
          className="signup-button"
          onClick={this.handleSubmit}
        >
          Sign Up
        </Button>
        <p className="disclaimer">
          By submitting your information, you consent to our sharing of your
          information with our clients and affiliates to support you in finding
          a job and to send you emails and text messages about jobs you may be
          interested in and other promotional emails. Please refer to the terms
          of our Applicant Privacy Policy for more information.
        </p>
      </Form>
    );
  }
}

export default SignUp;
