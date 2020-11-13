const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require('mongoose');
const cors = require("cors");

const port = 4000;

const app = express();

mongoose.connect('mongodb://localhost:27017/apistore', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => console.log(`Escutando a porta ${port}`));
