const express = require("express");
const bcryptjs = require("bcryptjs");
const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const router = express.Router();

const generateToken = (user = {}) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      active: user.active,
    },
    authConfig.secret,
    {
      expiresIn: 86400,
    }
  );
};

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user)
    return res.status(400).json({
      error: true,
      message: "Usuário não encontrado",
    });

  if (!(await bcryptjs.compare(password, user.password)))
    return res.status(400).json({
      error: true,
      message: "Senha invalida",
    });
  if (!user.active) {
    return res.status(400).json({
      error: true,
      message: "Usuário inativo",
    });
  }
  return res.json({
    error: false,
    message: "User logged with sucess",
    data: generateToken(user),
  });
});

module.exports = router;
