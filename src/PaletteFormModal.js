import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class PaletteFormModal extends Component {
	state = {
		stage: 'form',
		newPaletteName: '',
	};

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	showEmojiPicker = () => {
		this.setState({ stage: 'emoji' });
	};

	savePalette = (emoji) => {
		console.log(emoji);
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native,
		};
		this.props.handleSubmit(newPalette);
	};

	render() {
		const { stage } = this.state;
		const { hideForm } = this.props;
		return (
			<div>
				<Dialog open={stage === 'emoji'} onClose={hideForm}>
					<DialogTitle id='form-dialog-title'>Emoji Picker</DialogTitle>
					<Picker title='Pick a Palette Emoji' onSelect={this.savePalette} />
				</Dialog>
				<Dialog
					open={stage === 'form'}
					onClose={hideForm}
					aria-labelledby='form-dialog-title'>
					<DialogTitle id='form-dialog-title'>Choose Palette Name</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please enter a name for your new beautiful palette. Make sure
								name is unique from other palettes.
							</DialogContentText>

							<TextValidator
								value={this.state.newPaletteName}
								label='Palette Name'
								onChange={this.handleChange}
								name='newPaletteName'
								fullWidth
								margin='normal'
								validators={['required', 'isPaletteNameUnique']}
								errorMessages={['Enter Palette name', 'Name already Taken']}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={hideForm} color='primary'>
								Cancel
							</Button>
							<Button variant='contained' color='primary' type='submit'>
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default PaletteFormModal;
