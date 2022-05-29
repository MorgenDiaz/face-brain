import { Component } from "react";
import "./Navigation.css";
import "tachyons";

class Navigation extends Component {
  render() {
    return (
      <nav>
        <p className="f3 link dim black underline pa3 pointer">Sign Out</p>
      </nav>
    );
  }
}

export default Navigation;
