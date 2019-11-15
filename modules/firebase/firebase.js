import firebase from 'firebase';
import 'firebase/storage';
import { API_KEY } from 'react-native-dotenv';

const config = {
  storageBucket: 'gs://blockchaincarsharingapp.appspot.com/',
  projectId: 'blockchaincarsharingapp',
  apiKey: API_KEY,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const storageRef = firebase.storage();
