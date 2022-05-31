import { Component } from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import logo from "../../img/brain.png";

class Logo extends Component {
  render() {
    return (
      <div className="ma4 mt0">
        <Tilt className=" Tilt br2 shadow-2">
          <div className="pa3">
            <img src={logo} alt="brain logo" />
          </div>
        </Tilt>
      </div>
    );
  }
}

export default Logo;
