const router = require("express").Router();
const bcrypt = require("bcryptjs");
const express = require("express");

const UserModel = require("../models/User.model");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const salt_rounds = 10;

const EstablishmentModel = require("../models/Establishment.model");

// CRUD

// Crud Create (POST)
router.post("/establishment",isAuthenticated, async (req, res) => {
  try {
    console.log(req.body);

    const result = await EstablishmentModel.create(req.body);

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// cRud Read (GET) (Lista)



router.get("/establishment", async (req, res) => {
  try {
    const establishments = await EstablishmentModel.find();

    res.status(200).json(establishments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Detalhe)
router.get("/establishment/:id", async (req, res) => {
  try {
    const establishment = await EstablishmentModel.findOne({
      _id: req.params.id,
    });

    if (!establishment) {
      return res.status(404).json({ msg: "Estabelecimento não encontrado." });
    }

    res.status(200).json(establishment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// PUT => substituição (destrutiva)
// PATCH => atualização (não-destrutiva)

// crUd Update (PATCH)
router.patch("/establishment/:id", async (req, res) => {
  try {

    const result = await EstablishmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Estabelecimento não encontrado." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cruD Delete (DELETE)

router.delete("/establishment/:id", async (req, res) => {
  try {
    const result = await EstablishmentModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Estabelecimento não encontrado" });
    }

    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
