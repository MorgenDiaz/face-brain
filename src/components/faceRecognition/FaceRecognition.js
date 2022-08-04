import { Component } from "react";
import "./faceRecognition.css";

class FaceRecognition extends Component {
  render() {
    const { imageUrl, box } = this.props;

    return (
      <div className="Flex-Center ma">
        <div className="absolute mt2">
          <img
            id="input_image"
            src={imageUrl}
            alt="Scanned face."
            width="500px"
            height="auto"
          ></img>
          <div
            className="face_box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default FaceRecognition;
