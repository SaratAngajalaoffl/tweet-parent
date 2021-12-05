import firebaseApp from 'configs/firebase-config';

export const user_reference = firebaseApp.database().ref('/users');
