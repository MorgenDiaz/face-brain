import { Component } from "react";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: "",
      loginPassword: "",
    };
  }

  onEmailChanged = (event) => {
    this.setState({ loginEmail: event.target.value });
  };

  onPasswordChanged = (event) => {
    this.setState({ loginPassword: event.target.value });
  };

  onSigninClicked = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.loginEmail,
        password: this.state.loginPassword,
      }),
    };

    const response = await fetch(
      "https://serene-scrubland-95553.herokuapp.com/signin",
      options
    );
    const user = await response.json();

    if (user.id) {
      this.props.loadUser(user);
      this.props.onRouteChange(`home`);
    }
  };

  render() {
    const { onRouteChange } = this.props;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center pa4">
        <form className="measure center ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChanged}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChanged}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={this.onSigninClicked}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              className="f6 link dim black db pointer"
              onClick={() => onRouteChange("register")}
            >
              Register
            </p>
          </div>
        </form>
      </article>
    );
  }
}

export default Signin;
