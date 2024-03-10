const express = require("express");
const MoviesModel = require("../model/Movies");
const UserModel = require("../model/User");
const ActorsModel = require("../model/Actors");
const DirectorModel = require("../model/Director");
const GenrerModel = require("../model/Genrer");
const { upload } = require("../middlewares/multer");

const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const router = express.Router();

router.get("/getAllUsers/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await UserModel.find({ _id: { $ne: userId } });

    return res.json({
      error: false,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Ocorreu um erro ao buscar os usuários.",
    });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  delete req.body.password;

  const userId = req.params.id;
  const userData = req.body;
  
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData);

    if (!updatedUser) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado.",
      });
    }

    return res.json({
      error: false,
      message: "Usuário atualizado com sucesso.",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Erro ao atualizar o usuário.",
      data: error.message,
    });
  }
});
router.patch("/deleteUser/:id", async (req, res) => {
  const _id = req.params.id;
  const active = req.body.active;
  if (!_id) {
    return res.status(400).json({
      error: true,
      message: "idNotFound",
    });
  }
  await UserModel.updateOne({ _id: _id }, { $set: { active: !active } });
  return res.json({
    error: false,
    data: "movies patch with sucess",
  });
});

router.post("/register", async (req, res) => {
  const { email } = req.body;

  if (await UserModel.findOne({ email }))
    return res.status(400).json({
      error: true,
      message: "User already exists",
    });

  const user = await UserModel.create(req.body);
  user.password = undefined;
  return res.json({
    error: false,
    message: "Registred with sucess",
  });
});

router.post("/image-upload", upload, async (req, res) => {
  const file = {
    type: req.file.mimetype,
    buffer: req.file.buffer,
  };
  try {
    const buildImage = await uploadImage(file, "single");
    res.send({
      status: "SUCCESS",
      imageName: buildImage,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/register-movie", upload, async (req, res) => {
  try {
    const movie = await MoviesModel.create(req.body);
    if (movie) {
      res.status(200).json({ error: false });
    } else {
      res.status(500).json({ error: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/filterUsers", async (req, res) => {
  try {
    const { filter, id } = req.body;

    const companies = await UserModel.find({
      $or: [
        { name: { $regex: filter, $options: "i" } },
        { email: { $regex: filter, $options: "i" } },
      ],
      _id: { $ne: id },
    });

    return res.json({
      error: false,
      data: companies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/newsAtributtes", async (req, res) => {
  try {
    const { genresName, directorName, actorName } = req.body;

    if (genresName) {
      await GenrerModel.create(req.body);
    }

    if (directorName) {
      await DirectorModel.create(req.body);
    }

    if (actorName) {
      await ActorsModel.create(req.body);
    }
    return res.status(200).json({ error: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/getAtributtes", async (req, res) => {
  try {
    const genres = await GenrerModel.find();
    const actors = await ActorsModel.find();
    const directors = await DirectorModel.find();
    const payload = {
      genres: genres.map((genre) => ({ _id: genre._id, name: genre.genresName })),
      actors: actors.map((actor) => ({ _id: actor._id, name: actor.actorName })),
      directors: directors.map((director) => ({
        _id: director._id,
        name: director.directorName,
      })),
    };
    return res.json({
      error: false,
      data: payload,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Ocorreu um erro ao buscar os usuários.",
    });
  }
});
async function uploadImage(file, quantity) {
  const storageFB = getStorage();
  if (quantity === "single") {
    const dateTime = Date.now();
    const fileName = `images/${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.type,
    };
    await uploadBytesResumable(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
}

module.exports = router;
