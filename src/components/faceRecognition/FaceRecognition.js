import { Component } from "react";

class FaceRecognition extends Component {
  render() {
    const { imageUrl } = this.props;

    return (
      <div className="Flex-Center ma">
        <div className="absolute mt2">
          <img
            src={imageUrl}
            alt="Scanned face."
            width="500px"
            height="auto"
          ></img>
        </div>
      </div>
    );
  }
}

export default FaceRecognition;
