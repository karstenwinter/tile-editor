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
  i5?: string
  i6?: string
  i7?: string
  i8?: string
  i9?: string
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    let len = 9;
    let i = 0;
    setInterval(() => {
      let state: any = this.state;
      this.setState({
        currentImage: state["i" + (i + 1)]
      });
      i = (i + 1) % len;
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
        <DroppableImage withImageDo={(i5: string) => this.setState({i5})}/>
        <DroppableImage withImageDo={(i6: string) => this.setState({i6})}/>
        <DroppableImage withImageDo={(i7: string) => this.setState({i7})}/>
        <DroppableImage withImageDo={(i8: string) => this.setState({i8})}/>
        <DroppableImage withImageDo={(i9: string) => this.setState({i9})}/>
      </div>
      <h1>Preview</h1>
      <img src={this.state.currentImage} alt=""/>
    </div>
    );
  }
}

export default App;
