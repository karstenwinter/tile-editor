import React, {Component} from 'react';
import './App.css';
import {MyDropzone} from "./MyDropzone";
import {DroppableImage} from "./DroppableImage";

interface AppProps {
}

interface AppState {
  currentImage?: string

  tickMod: number
  len: number
}

class App extends Component<AppProps, AppState> {
  i: number;
  timer: number;

  constructor(props: AppProps) {
    super(props);
    this.i = 0;
    this.timer = 0;
    this.state = {
      tickMod: 200,
      len: 9
    };
  }

  componentDidMount(): void {

    setInterval(() => {
      this.tick();
    }, 1);
  }

  render() {

    return (<div>

      <h1>Tile/Sprite/Animation Editor</h1>

      {/*<div style={{
        display: "flex",
        justifyContent: "space-around"
      }}>
        <DroppableImage/>
        <DroppableImage/>
        <DroppableImage/>
      </div>*/}

      <div>
        {this.state.tickMod} Speed
        <button onClick={() => this.setState({tickMod: this.state.tickMod - 10})}>
          -10
        </button>
        <button onClick={() => this.setState({tickMod: this.state.tickMod + 10})}>
          +10
        </button>
      </div>

      <div>
        {this.state.len} Frames
        <button onClick={() => this.setState({len: this.state.len - 1})}>
          -1
        </button>
        <button onClick={() => this.setState({len: this.state.len + 1})}>
          +1
        </button>
      </div>

      <h1>Character 1</h1>

      <div style={{
        display: "flex",
        justifyContent: "space-around"
      }}>
        {Array.from({length: this.state.len}).map((x, i) =>
        <DroppableImage withImageDo={(img: string) => {
          let obj: any = {};
          obj["i" + (i + 1)] = img;
          this.setState(obj);
        }}/>)}
      </div>
      <h1>Preview</h1>
      <img src={this.state.currentImage} alt=""/>
    </div>
    );
  }

  private tick() {
    this.timer = this.timer + 1;
    //console.log(this.timer + "/" + this.state.tickMod + "/" + this.i + ":" + this.state.currentImage);
    if (this.timer % this.state.tickMod === 0) {

      let len = this.state.len;
      let i = this.i || 0;
      let state: any = this.state;
      this.setState({
        currentImage: state["i" + (i + 1)]
      });
      this.i = (i + 1) % len;
      this.timer = 0;
    }
  }
}

export default App;
