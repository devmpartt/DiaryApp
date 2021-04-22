import * as firebase from 'firebase';
import '@firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBstYmOq4-wFDWL-t02Oq3ASTn844WGyGw",
    authDomain: "paivakirja-21168.firebaseapp.com",
    databaseURL: "https://paivakirja-21168.firebaseio.com",
    projectId: "paivakirja-21168",
    storageBucket: "paivakirja-21168.appspot.com",
    messagingSenderId: "710238171692",
    appId: "1:710238171692:web:c344023e703d5891441789"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;