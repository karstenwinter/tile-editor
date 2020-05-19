import React, {Component} from 'react'
import {MyDropzone} from "./MyDropzone";

interface DroppableImageProps {
  withImageDo?: Function
}

interface DroppableImageState {
  image?: string
}

export class DroppableImage extends Component<DroppableImageProps, DroppableImageState> {
  constructor(props: DroppableImageProps) {
    super(props);
    let image = "";
    this.state = {
      image
    };
  }

  render() {

    return (
    <span>
      {this.state.image ?
      <div>
        <button style={{float: "right"}} onClick={() => {
          this.setState({image: undefined})
        }}>X
        </button>
        <img src={this.state.image} alt=""/>
      </div>
      : <MyDropzone withBinaryDo={(yourArrayBuffer: any) => {
        const buffer = Buffer.from(yourArrayBuffer);
        const base64String = buffer.toString('base64');
        let image = "data:image/png;base64," + base64String;
        this.props.withImageDo && this.props.withImageDo(image)
        this.setState({image});
      }}/>}
    </span>
    );
  }
}