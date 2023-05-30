import React from 'react';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  
  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='row'>
        <div className="col-12">
          <div className="fs-4 py-2">I do not have an account</div>
          <div className="py-4 d-none d-sm-block ">Sign up with your email and password</div>
        </div>
        <form onSubmit={this.handleSubmit}>
            <div className="col-12">
                <input
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    placeholder='Your Name'
                    required
                />
            </div>
            <div className="col-12">
                <input
                    className="my-2"
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    placeholder='Your Email'
                    required
                />
            </div>
            <div className="col-12">
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    placeholder='Password'
                    required
                />
            </div>
            <div className="col-12 my-2">
                <input
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    placeholder='Confirm Password'
                    required
                />
            </div>
            <div className='col-12 py-4'>
            <button className="btn btn-success me-1 mb-1" type='submit'> Sign up </button>
            </div>
        </form>
      </div>
    );
  }
}

export default SignUp;