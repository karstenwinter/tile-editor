import React, {Component} from 'react';
import './App.css';
import {MyDropzone} from "./MyDropzone";
import {DroppableImage} from "./DroppableImage";

interface AppProps {
}

interface AppState {
  currentImage?: string
  i1?: string
  i2?: string
  i3?: string
  i4?: string
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    let i = 0;
    setInterval(() => {
      this.setState({
        currentImage:
        [this.state.i1, this.state.i2, this.state.i3, this.state.i4][i]
      });
      i = (i + 1) % 4;
    }, 250);
  }

  render() {

    return (<div>

      <h1>Drop files to show </h1>

      <div style={{
        display: "flex",
        justifyContent: "space-around"
      }}>
        <DroppableImage/>
        <DroppableImage/>
        <DroppableImage/>
      </div>

      <h1>Character 1</h1>

      <div style={{
        display: "flex",
        justifyContent: "space-around"
      }}>
        <DroppableImage withImageDo={(i1: string) => this.setState({i1})}/>
        <DroppableImage withImageDo={(i2: string) => this.setState({i2})}/>
        <DroppableImage withImageDo={(i3: string) => this.setState({i3})}/>
        <DroppableImage withImageDo={(i4: string) => this.setState({i4})}/>
      </div>
      <h1>Preview</h1>
      <img src={this.state.currentImage} alt=""/>
    </div>
    );
  }
}

export default App;
