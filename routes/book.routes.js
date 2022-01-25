const router = require("express").Router();
const BookModel = require("../models/Book.model");

// Crud (CREATE) - HTTP POST
// Criar um novo livro
router.post("/book", async (req, res) => {
  try {
  console.log(req.body);
  const result = await BookModel.create(req.body)
  res.status(201).json(result)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get("/book", async (req,res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books)
  } catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.get('/book/:id', async (req, res) => {
  try {
    const book = await BookModel.findOne({_id: req.params.id})
    
    if (!book) {
      return res.status(404).json({msg: 'Produto não encontrado'})
    }

    res.status(200).json(book)

  } catch (err) {
    console.log(err)
    req.status(500).json(err);
  }
})

router.patch('/book/:id', async (req, res) => {
  try {
    const result = await BookModel.findOneAndUpdate({_id:req.params.id}, {$set: req.body}, {new: true, runValidators:true});

    if (!result) {
      return res.status(404).json({msg: "Livro não encontrado."})
    }
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/book/:id', async (req, res) => {
  try {

    const result = await BookModel.deleteOne({_id: req.params.id})

    if(result.deletedCount < 1) {
      return res.status(400),json({msg: 'Produto não encontrado.'})
    }
      res.status(200).json({});
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
module.exports = router; 