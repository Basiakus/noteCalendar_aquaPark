import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyCagOGwY2gIy47Sh81_KtK08mjM9yjkDxA",
    authDomain: "note-calendar.firebaseapp.com",
    databaseURL: "https://note-calendar.firebaseio.com"
    //projectId: "note-calendar",
    //storageBucket: "note-calendar.appspot.com",
    //messagingSenderId: "377763751393"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
