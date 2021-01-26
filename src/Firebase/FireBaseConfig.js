import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB2uyriTe_w305fUZnVS_c6tO57uavnM5Y",
  authDomain: "instagram-de597.firebaseapp.com",
  databaseURL: "https://instagram-de597.firebaseio.com",
  projectId: "instagram-de597",
  storageBucket: "instagram-de597.appspot.com",
  appId: "1:364520035820:android:7fb9294b69d1dcb0db5cc9",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
