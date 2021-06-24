import React, { Component } from 'react';
import PaletteFormModal from './PaletteFormModal';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import styles from './styles/PaletteFormNavStyles';

class PalletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPaletteName: '',
			formShowing: false,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	showForm = () => {
		console.log('showing modal...');
		this.setState({ formShowing: true });
	};

	hideForm = () => {
		this.setState({ formShowing: false });
	};

	render() {
		const { classes, open } = this.props;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					color='default'
					position='fixed'
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open,
					})}>
					<Toolbar disableGutters={!open}>
						<IconButton
							color='inherit'
							aria-label='Open drawer'
							onClick={this.props.handleDrawerOpen}
							className={classNames(classes.menuButton, {
								[classes.hide]: open,
							})}>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' color='inherit' noWrap>
							Create a Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Link to='/'>
							<Button
								variant='contained'
								color='secondary'
								className={classes.button}>
								Go Back
							</Button>
						</Link>
						<Button
							variant='contained'
							color='primary'
							onClick={this.showForm}
							className={classes.button}>
							Save
						</Button>

						{this.state.formShowing && (
							<PaletteFormModal
								palettes={this.props.palettes}
								handleSubmit={this.props.handleSubmit}
								hideForm={this.hideForm}
							/>
						)}
					</div>
				</AppBar>
			</div>
		);
	}
}
export default withStyles(styles, { withTheme: true })(PalletteFormNav);
