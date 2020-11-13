const express = require('express')
const routes = express.Router()

const produtoController = require('./controllers/produtoController');

routes.get("/produto", produtoController.index);
routes.get("/produto/:id", produtoController.show);
routes.post("/produto", produtoController.store);
routes.put("/produto/:id", produtoController.update);
routes.delete("/produto/:id", produtoController.destroy);

module.exports = routes;