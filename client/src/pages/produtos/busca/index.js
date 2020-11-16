import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../services/api";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function VisualizarProduto(props) {
  const history = useHistory();

  const [produto, setProduto] = useState([]);

  useEffect(() => {
    async function buscaProduto() {
      const res = await api
        .get(`produto/${props.match.params.id}`)
        .catch((err) => console.error("err", err));
      setProduto(res.data);
    }

    buscaProduto();
  }, [props]);

  async function handleDelete(produto) {
    const response = await api.delete(`/produto/${produto}`);
    if (response.status === 200) {
      history.push("/");
    }
  }

  return (
    <Container maxWidth="md">
      <Button variant="outlined" color="primary" href="/">
        Voltar
      </Button>

      <Typography variant="h2" color="inherit" align="center">
        Visualizar Produto
      </Typography>
      <Card>
        <CardContent>
          <Typography>Nome do produto: {produto.nome}</Typography>
          <Typography>Preço: {produto.preco}</Typography>
          <Typography>Quantidade: {produto.quantidade}</Typography>
          <Typography>Codigo de barras: {produto.codigo}</Typography>
          <ButtonGroup color="primary" aria-label="outlined button group">
            <Button href={`${produto._id}/editar`}>Edit</Button>
            <Button onClick={() => handleDelete(produto._id)}>Delete</Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </Container>
  );
}
