import { Component } from "react";
import Tilt from "react-parallax-tilt";

class Logo extends Component {
  render() {
    return (
      <div className="ma4 mt0">
        <Tilt>
          <div className="br2 shadow-2">
            <h1>React Parallax Tilt 👀</h1>
          </div>
        </Tilt>
      </div>
    );
  }
}

export default Logo;
