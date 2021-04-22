import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex"}
        this.gatherShades = this.gatherShades.bind(this);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
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

    render() {
        const { format } = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                background={color[format]} 
                name = {color.name}
                key={color.id}
                showLink={false}
            />
        ));
        return (
            <div className="Palette">
                <h1>Single Color palette</h1>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default SingleColorPalette;