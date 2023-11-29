import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from './config';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

export const FIREBASE_APP = firebase.initializeApp(firebaseConfig);
export const FIREBASE_DB = firebase.firestore(FIREBASE_APP);

const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const FIREBASE_AUTH = auth;

export const FLASHCARDS = FIREBASE_DB.collection('flashcards');
export const CARDS = FIREBASE_DB.collection('cards');