const mongoose = require("mongoose")

const produtoSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    quantidade: Number,
    preco: Number
    
  },
  {
    timestamps: true
})

module.exports = mongoose.model("Produto", produtoSchema);
