
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get} from "firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyCNLc7iPSLKJFVOaULaZQX4Fs23UxiSNn8",
    authDomain: "basic-dashboard-7a300.firebaseapp.com",
    databaseURL: "https://basic-dashboard-7a300-default-rtdb.firebaseio.com",
    projectId: "basic-dashboard-7a300",
    storageBucket: "basic-dashboard-7a300.appspot.com",
    messagingSenderId: "553080227189",
    appId: "1:553080227189:web:25b0e81b805bec48cebf3c",
    measurementId: "G-8RN21HJQBW"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const firebaseDb = getDatabase(firebaseApp);

// console.log("show database", firebaseDb);


const dbRef = ref(firebaseDb, 'server/saving-data/fireblog');

console.log("show database ref", dbRef);

// export const users = dbRef.child('users');

// get(child(dbRef, `users`)).then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });

// const childRef = dbRef.ref('parentNode/childNode');

// console.log("show database ref child", childRef);


// const lol = 

// const users = firebaseDb.ref.child('users');

// console.log("show database ref child", users);



export const users = firebaseDb.ref.child('users');
export const usersWishlist = firebaseDb.ref().child('usersWishlist');






