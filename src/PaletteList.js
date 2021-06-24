import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	render() {
		const { palettes, classes, loadPalettes, deletePalette } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React colors</h1>
						<div className={classes.navRight}>
							<Link to='/palette/new'>Create Palette</Link>
						</div>
					</nav>
					<div className={classes.palettes}>
						{palettes.length > 0 &&
							palettes.map((palette) => (
								<MiniPalette
									key={palette.id}
									id={palette.id}
									handleDelete={deletePalette}
									{...palette}
									handleClick={() => this.goToPalette(palette.id)}
								/>
							))}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
