import { Component } from "react";
import "./App.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Logo from "./components/logo/Logo";
import Navigation from "./components/navigation/Navigation";
import Signin from "./components/signin/signin";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "f460d892804d402faca1e6798679e4f1",
});

const particlesInit = async (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main);
};

const particlesLoaded = (container) => {
  console.log(container);
};

const particleSettings = {
  color: {
    value: "#ffffff",
  },
  links: {
    color: "#ffffff",
    distance: 150,
    enable: true,
    opacity: 0.5,
    width: 1,
  },
  collisions: {
    enable: true,
  },
  move: {
    direction: "none",
    enable: true,
    outModes: {
      default: "bounce",
    },
    random: false,
    speed: 6,
    straight: false,
  },
  number: {
    density: {
      enable: true,
      area: 800,
    },
    value: 80,
  },
  opacity: {
    value: 0.5,
  },
  shape: {
    type: "circle",
  },
  size: {
    value: { min: 1, max: 5 },
  },
};

const particleOptions = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: particleSettings,
  detectRetina: true,
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "signin",
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  calculateFaceLocation = (respData) => {
    const clarifaiFace =
      respData.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input_image");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onRouteChanged = (route) => {
    this.setState({ route: route });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = (event) => {
    const dummyImageSubmission =
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png";
    this.setState({ imageUrl: this.state.input });

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      (response) => {
        let faceBox = this.calculateFaceLocation(response);
        this.displayFaceBox(faceBox);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Particles
          className="Particles"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particleOptions}
        />
        <Navigation onRouteChange={this.onRouteChanged} />
        {this.state.route === `signin` ? (
          <Signin onRouteChange={this.onRouteChanged} />
        ) : (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
