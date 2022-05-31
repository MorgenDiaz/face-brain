import { Component } from "react";
import "./ImageLinkForm.css";
import "tachyons";

class ImageLinkForm extends Component {
  render() {
    return (
      <div>
        <p className="f3">
          {`This brain can detect and recognize faces in pictures!`}
        </p>
        <div className="Flex-Center">
          <div className="form pa4 br3 shadow-5">
            <input type={`text`} className="f4 pa2 w-70"></input>
            <button className="w-30 f4 grow ph3 pv2 db white bg-light-purple dib">
              Detect
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;
