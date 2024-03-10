// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBC6wDY65vom8sZVDIp-1YQ5ztMP10Hbf0",
  authDomain: "thinkai-469a0.firebaseapp.com",
  projectId: "thinkai-469a0",
  storageBucket: "thinkai-469a0.appspot.com",
  messagingSenderId: "21041416127",
  appId: "1:21041416127:web:ea8a37554be1ad7351430a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = {
  auth,
};
