const router = require("express").Router();

const UserModel = require("../models/User.model");
const OrdersModel = require("../models/Orders.model")
//const isAuthenticated = require("../middlewares/isAuthenticated");
//const attachCurrentUser = require("../middlewares/attachCurrentUser");


// Crud (CREATE) - HTTP POST
// Criar um novo pedido
router.post("/create", async (req, res) => {
    try {
        const productArray = req.body.products.map(async(product) => {
              
            const productId =  await ProductModel.findOne({_id: product.id}) 

            return [productId, product.qtt]  
        })
        productArray.reduce((acc, cur) => {
            
            return (acc + cur[0].price) * cur[1].qtt
        },0);


        //const result = await OrdersModel.create({...req.body});

    } catch(err) {
        console.error(err)
    }
    
    
});






module.exports = router;



