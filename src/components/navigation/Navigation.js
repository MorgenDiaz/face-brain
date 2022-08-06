import { Component } from "react";
import "./Navigation.css";
import "tachyons";

class Navigation extends Component {
  render() {
    const { onRouteChange, isSignedIn } = this.props;

    if (isSignedIn) {
      return (
        <nav>
          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={() => onRouteChange("signin")}
          >
            Sign Out
          </p>
        </nav>
      );
    } else {
      return (
        <nav>
          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={() => onRouteChange("signin")}
          >
            Sign In
          </p>

          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={() => onRouteChange("register")}
          >
            Register
          </p>
        </nav>
      );
    }
  }
}

export default Navigation;
