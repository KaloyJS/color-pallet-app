import React, { Component } from "react";
import ColorBox from './ColorBox';
import Navbar from "./Navbar";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/PaletteStyles";



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
    const {colors, paletteName, emoji, id} = this.props.palette;
    const { classes } = this.props;
    const {level, format} = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox 
        background={color[format]} 
        name={color.name} 
        key={color.id} 
        id={color.id} 
        paletteId={id}
        showingFullPalette
      />
    )) 
     
    return (
      <div className={classes.Palette}>        
        <Navbar 
          level={level} 
          changeLevel={this.changeLevel} 
          handleChange={this.changeFormat}
          showLevel
          />
        <div className={classes.colors}> 
          {colorBoxes}
        </div>
        <footer className={classes.footer}>
          {paletteName}
          <span className={classes.emoji}>{emoji}</span>
        </footer>
      </div>
    );
  }
}
export default withStyles(styles)(Palette);
