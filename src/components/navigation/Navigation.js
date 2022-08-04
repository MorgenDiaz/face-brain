import { Component } from "react";
import "./Navigation.css";
import "tachyons";

class Navigation extends Component {
  render() {
    const { onRouteChange } = this.props;

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
  }
}

export default Navigation;
