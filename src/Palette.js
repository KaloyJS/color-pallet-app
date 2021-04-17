import React, { Component } from "react";
import ColorBox from './ColorBox';
import Navbar from "./Navbar";
import "./Pallete.css";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex"  };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(format) {
    this.setState({ format });
  }
  render() {  
    const {colors} = this.props.palette;
    const {level, format} = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color[format]} name={color.name}/>
    ))  
    return (
      <div className="Pallete">        
        <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
        <div className="Pallete-colors"> 
          {colorBoxes}
        </div>
        {/* Footer goes here */}
      </div>
    );
  }
}
export default Palette;
