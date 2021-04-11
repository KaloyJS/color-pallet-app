import React, { Component } from "react";
import ColorBox from './ColorBox';
import "./Pallete.css";


class Palette extends Component {
  
  render() {  
    const colorBoxes = this.props.colors.map(color => (
      <ColorBox background={color.color} name={color.name}/>
    ))  
    return (
      <div className="Pallete">
      {/* Navbar goes here */}
        <div className="Pallete-colors"> 
          {colorBoxes}
        </div>
        {/* Footer goes here */}
      </div>
    );
  }
}
export default Palette;
