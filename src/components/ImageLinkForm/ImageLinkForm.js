import { Component } from "react";
import "./ImageLinkForm.css";
import "tachyons";

class ImageLinkForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onInputChange, onSubmit } = this.props;

    return (
      <div>
        <p className="f3">
          {`This brain can detect and recognize faces in pictures!`}
        </p>
        <div className="Flex-Center">
          <div className="form pa4 br3 shadow-5">
            <input
              type={`text`}
              className="f4 pa2 w-70"
              onChange={onInputChange}
            ></input>
            <button
              className="w-30 f4 grow ph3 pv2 db white bg-light-purple dib"
              onClick={onSubmit}
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;
