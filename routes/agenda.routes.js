const router = require("express").Router();

const AgendaModel = require("../models/Agenda.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const { route } = require("./user.routes");


//Crud = Criar uma agenda 
//NEXT PRA GENTE PROCURAR 
router.post("/agenda", isAuthenticated, attachCurrentUser, async (req, res, next) => {
    try{

    } catch (err) {
        next(err)
    }
});

// Criar uma nova tarefa
router.post(
    "/agenda",
    isAuthenticated,
    attachCurrentUser,
    async (req, res, next) => {
      try {
        // Cria a tarefa
        const createdAgenda = await AgendaModel.create(req.body);
  
        return res.status(201).json(createdAgenda);

      } catch (err) {
        next(err);
      }
    }
  );
module.exports = router;