import React from "react";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: "",
      });
    } catch (error) {
      alert("account does not exist");
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="fs-4 py-2">I already have an account</div>
          <div className="py-4 d-none d-sm-block ">
            Sign in with your email and password
          </div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="col-12">
            <input
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
              label="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="col-12">
            <input
              className="my-2"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              label="password"
              placeholder="Your Password"
              required
            />
          </div>
          <div className="col-12 py-4">
            <button className="btn btn-success me-1 mb-1" type="submit">
              {" "}
              Sign in{" "}
            </button>
            <button
              className="btn btn-primary mb-1"
              type="button"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
