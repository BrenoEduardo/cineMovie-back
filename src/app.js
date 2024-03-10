const express = require("express");
const cors = require("cors");

const AuthController = require("./controller/AuthController");
const AdminController = require("./controller/AdminController");
const ClienteController = require("./controller/ClientController");

const { upload, uploadMultiple } = require('./middlewares/multer')

const { getStorage, ref ,uploadBytesResumable, getDownloadURL  } = require('firebase/storage')
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('./config/firebase.config')

const autheticateMiddleware = require("./middlewares/autheticate");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", AuthController);
app.use("/admin", autheticateMiddleware, AdminController);
app.use("/client", autheticateMiddleware, ClienteController);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App online port`, PORT);
});
