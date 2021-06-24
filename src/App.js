import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';
import base from './base';

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
		this.state = {
			palettes: [],
		};
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
	}

	componentDidMount() {
		console.log('Mounting');
		this.ref = base.syncState(`testAccount/palettes`, {
			context: this,
			state: 'palettes',
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	findPalette(id) {
		return this.state.palettes.find(function (palette) {
			return palette.id === id;
		});
	}

	savePalette(newPalette) {
		this.setState(
			{ palettes: [...this.state.palettes, newPalette] },
			this.syncLocalStorage
		);
	}

	syncLocalStorage = () => {
		// save palette to local storage
		window.localStorage.setItem(
			'palettes',
			JSON.stringify(this.state.palettes)
		);
	};

	loadSamplePalettes = () => {
		console.log('Loading sample palettes...');
		this.setState({ palettes: seedColors });
	};

	deletePalette = (id) => {
		this.setState((st) => ({
			palettes: st.palettes.filter((palette) => palette.id !== id),
		}));
	};
	render() {
		return (
			<Switch>
				<Route
					exact
					path='/palette/new'
					render={(routeProps) => (
						<NewPaletteForm
							savePalette={this.savePalette}
							palettes={this.state.palettes}
							{...routeProps}
						/>
					)}
				/>
				<Route
					exact
					path='/'
					render={(routeProps) => (
						<PaletteList
							palettes={this.state.palettes}
							loadPalettes={this.loadSamplePalettes}
							deletePalette={this.deletePalette}
							{...routeProps}
						/>
					)}
				/>
				<Route
					exact
					path='/palette/:id'
					render={(routeProps) => (
						<Palette
							palette={generatePalette(
								this.findPalette(routeProps.match.params.id)
							)}
						/>
					)}
				/>
				<Route
					exact
					path='/palette/:paletteId/:colorId'
					render={(routeProps) => (
						<SingleColorPalette
							palette={generatePalette(
								this.findPalette(routeProps.match.params.paletteId)
							)}
							colorId={routeProps.match.params.colorId}
						/>
					)}
				/>
			</Switch>
		);
	}
}

export default App;
