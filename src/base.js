import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAB-POp3YBFAMOHcKf7TXbvWeHP3eZTSLI',
	authDomain: 'color-palette-app-d458f.firebaseapp.com',
	databaseURL: 'https://color-palette-app-d458f-default-rtdb.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

export default base;
