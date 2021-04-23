import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter'


class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex"}
        this.gatherShades = this.gatherShades.bind(this);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.changeFormat = this.changeFormat.bind(this);
        console.log(this._shades);
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        // loop through all colors and the filter for color id
        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
       // return shades of given color 
       return shades.slice(1);
    }

    changeFormat(format) {
        this.setState({ format });
    }

    render() {
        const { format } = this.state;
        const { paletteName, emoji, id} = this.props.palette;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                background={color[format]} 
                name = {color.name}
                key={color.name}
                showLink={false}
            />
        ));
        return (
            <div className="SingleColorPalette Palette">
                <Navbar 
                    handleChange={this.changeFormat}
                />                
                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link className="back-button" to={`/palette/${id}`}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter 
                    paletteName={paletteName}
                    emoji={emoji}
                />
            </div>
        )
    }
}

export default SingleColorPalette;