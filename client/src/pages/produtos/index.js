import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function Produtos() {
  const history = useHistory();

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function buscaProdutos() {
      const res = await api.get("produto").catch((err) => console.error("err", err));
      setProdutos(res.data);
    }

    buscaProdutos();
  }, []);

  async function handleDelete(produto) {
    const response = await api.delete(`/produto/${produto}`);
    if (response.status === 200) {
      history.push("/");
    }
  }

  return (
    <Container maxWidth="md" align="center">
      <Typography variant="h2" color="inherit">
        Todos os produtos
      </Typography>

      <Button variant="contained" color="primary" href="produtos/criar">
        Adicionar Produto
      </Button>

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
