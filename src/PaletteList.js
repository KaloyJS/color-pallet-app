import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
	state = {
		openDeleteDialog: false,
		deletingId: '',
	};

	openDialog = (id) => {
		this.setState({ openDeleteDialog: true, deletingId: id });
	};

	closeDialog = () => {
		this.setState({ openDeleteDialog: false, deletingId: '' });
	};

	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	handleDelete = () => {
		this.props.deletePalette(this.state.deletingId);
		this.closeDialog();
	};

	render() {
		const { palettes, classes } = this.props;
		const { openDeleteDialog } = this.state;

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.heading}>React colors</h1>
						<div className={classes.navRight}>
							<Link to='/palette/new'>Create Palette </Link>
						</div>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.length > 0 &&
							palettes.map((palette) => (
								<CSSTransition key={palette.id} classNames='fade' timeout={500}>
									<MiniPalette
										key={palette.id}
										id={palette.id}
										// handleDelete={deletePalette}
										openDialog={this.openDialog}
										{...palette}
										handleClick={() => this.goToPalette(palette.id)}
									/>
								</CSSTransition>
							))}
					</TransitionGroup>
				</div>
				<Dialog
					open={openDeleteDialog}
					aria-labelledby='delete-dialog-title'
					onClose={this.closeDialog}>
					<DialogTitle id='delete-dialog-title'>
						Delete this Palette?
					</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar
									style={{ backgroundColor: blue[100], color: blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary='Delete' />
						</ListItem>
						<ListItem button onClick={this.closeDialog}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary='Cancel' />
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
