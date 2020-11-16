import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import "./index.css";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default function Produtos() {
  const history = useHistory();

  const [produtos, setProdutos] = useState([]);
  const [selecao, setSelecao] = useState(0);

  useEffect(() => {
    async function buscaProdutos() {
      const res = await api.get("produto").catch((err) => console.error("err", err));
      setProdutos(res.data);
    }

    buscaProdutos();
  }, []);

  useEffect(() => {
    let nProdutos;
    switch (selecao) {
      case "1":
        nProdutos = produtos.sort((p1, p2) => p1.preco - p2.preco);
        setProdutos(nProdutos);
        break;

      case "2":
        nProdutos = produtos.sort((p1, p2) => p1.quantidade - p2.quantidade);
        setProdutos(nProdutos);
        break;

      default:
        break;
    }
  }, [produtos, selecao]);

  async function handleDelete(produto) {
    const response = await api.delete(`/produto/${produto}`);
    if (response.status === 200) {
      history.push("/");
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h2" color="inherit" align="center">
        Todos os produtos
      </Typography>

      <Button variant="contained" color="primary" href="produtos/criar">
        Adicionar Produto
      </Button>
      <br></br>
      <FormControl className="selection">
        <InputLabel id="demo-simple-select-label">Selecione uma opção</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={selecao}
          onChange={(e) => setSelecao(e.target.value)}
        >
          <MenuItem disabled value="0"></MenuItem>
          <MenuItem value="1">Preço </MenuItem>
          <MenuItem value="2">Quantidade </MenuItem>
        </Select>
      </FormControl>

      {produtos &&
        produtos.map((produto) => (
          <Card key={produto._id} align="left">
            <CardContent>
              <Typography>Nome do produto: {produto.nome}</Typography>
              <Typography>Preço: {produto.preco}</Typography>
              <Typography>Quantidade: {produto.quantidade}</Typography>
              <Typography>Codigo de barras: {produto.codigo}</Typography>
              <ButtonGroup color="primary" aria-label="outlined button group">
                <Button href={`produto/${produto._id}`}>Show</Button>
                <Button href={`produto/${produto._id}/editar`}>Edit</Button>
                <Button onClick={() => handleDelete(produto._id)}>Delete</Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
}
