import firebase from 'firebase'
// Initialize Firebase
const config = {
	apiKey: "AIzaSyAzA1TCwnmOUSTD8B5f2hpcVmQsbCLwJY0",
	authDomain: "amyworks-bloc-chat-react.firebaseapp.com",
	databaseURL: "https://amyworks-bloc-chat-react.firebaseio.com",
	projectId: "amyworks-bloc-chat-react",
	storageBucket: "amyworks-bloc-chat-react.appspot.com",
	messagingSenderId: "873840329996"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;