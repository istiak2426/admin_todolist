/**
 * Created by bikramkawan on 9/1/17.
 */
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCNLc7iPSLKJFVOaULaZQX4Fs23UxiSNn8",
    authDomain: "basic-dashboard-7a300.firebaseapp.com",
    databaseURL: "https://basic-dashboard-7a300-default-rtdb.firebaseio.com",
    projectId: "basic-dashboard-7a300",
    storageBucket: "basic-dashboard-7a300.appspot.com",
    messagingSenderId: "553080227189",
    appId: "1:553080227189:web:25b0e81b805bec48cebf3c",
    measurementId: "G-8RN21HJQBW"
};
export const firebaseApp = firebase.initializeApp(config);
export const users = firebaseApp.database().ref().child('users');
export const usersWishlist = firebaseApp.database().ref().child('usersWishlist');