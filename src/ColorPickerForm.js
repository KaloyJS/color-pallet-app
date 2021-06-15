import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

const styles = {
	root: {
		width: '100%',
	},
	picker: {
		width: '100% !important',
		marginTop: '2rem',
	},
	addColor: {
		width: '100%',
		padding: '1rem',
		marginTop: '1rem',
		fontSize: '2rem',
	},
	colorNameInput: {
		width: '100%',
		height: '70px',
	},
};

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newColorName: '',
			currentColor: 'teal',
		};
		this.updateCurrentColor = this.updateCurrentColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// custom rule will have name 'isColorNameUnique'
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.props.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);

		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	updateCurrentColor(newColor) {
		this.setState({ currentColor: newColor.hex });
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	handleSubmit() {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName,
		};
		this.props.addNewColor(newColor);
		this.setState({ newColorName: '' });
	}

	render() {
		const { paletteIsFull, classes } = this.props;
		const { currentColor, newColorName } = this.state;
		return (
			<div className={classes.root}>
				<ChromePicker
					color={currentColor}
					onChangeComplete={this.updateCurrentColor}
					className={classes.picker}
				/>

				<ValidatorForm onSubmit={this.handleSubmit}>
					<TextValidator
						value={newColorName}
						onChange={this.handleChange}
						className={classes.colorNameInput}
						placeholder='Color name'
						variant='filled'
						margin='normal'
						name='newColorName'
						validators={['required', 'isColorNameUnique', 'isColorUnique']}
						errorMessages={[
							'this field is required',
							'Color Name must be uniqe',
							'Color is already added',
						]}
					/>
					<Button
						variant='contained'
						color='primary'
						style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
						type='submit'
						disabled={paletteIsFull}
						className={classes.addColor}>
						{paletteIsFull ? 'PALETTE FULL' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColorPickerForm);
