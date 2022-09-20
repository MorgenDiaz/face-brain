import { Component } from "react";
import "./App.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Logo from "./components/logo/Logo";
import Navigation from "./components/navigation/Navigation";
import Signin from "./components/signin/signin";
import Register from "./components/register/register";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";

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

const initialState = {
  route: "signin",
  isSignedIn: false,
  input: "",
  imageUrl: "",
  box: {},
  user: {
    id: 0,
    name: "",
    email: "",
    password: "",
    entries: 0,
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
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

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
      },
    });
  };

  onRouteChanged = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState(initialState);
    }
    this.setState({ route: route });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = async (event) => {
    const dummyImageSubmission =
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png";
    this.setState({ imageUrl: this.state.input });

    try {
      let options = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: this.state.input }),
      };

      let apiResponse = await fetch(
        "https://serene-scrubland-95553.herokuapp.com/imagefacedetect",
        options
      );

      const faceDetectResponse = await apiResponse.json();

      let faceBox = this.calculateFaceLocation(faceDetectResponse);
      this.displayFaceBox(faceBox);

      options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: this.state.user.id }),
      };

      apiResponse = await fetch(
        "https://serene-scrubland-95553.herokuapp.com/image",
        options
      );
      const entries = await apiResponse.json();

      this.setState(Object.assign(this.state.user, { entries: entries }));
    } catch (error) {
      console.log(error);
    }
  };

  getCurrentComponentForRoute() {
    const user = this.state.user;
    switch (this.state.route) {
      case "home":
        return (
          <div>
            <Logo />
            <Rank name={user.name} rank={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
        );
      case "signin":
        return (
          <Signin
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChanged}
          />
        );
      case "register":
        return (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChanged}
          ></Register>
        );
      default:
        return undefined;
    }
  }

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
        <Navigation
          onRouteChange={this.onRouteChanged}
          isSignedIn={this.state.isSignedIn}
        />
        {this.getCurrentComponentForRoute()}
      </div>
    );
  }
}

export default App;
