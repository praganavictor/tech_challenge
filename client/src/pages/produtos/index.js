import React, { useState, useEffect } from "react";

import api from "../../services/api";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function buscaProdutos() {
      const res = await api.get("produto").catch((err) => console.error("err", err));
      setProdutos(res.data);
    }

    buscaProdutos();
  }, []);

  return (
    <Container>
      <Typography variant="h2" color="inherit">
        Todos os produtos
      </Typography>

      {produtos &&
        produtos.map((produto) => (
          <Card key={produto._id}>
            <CardContent>
              <Typography>Nome do produto: {produto.nome}</Typography>
              <Typography>Preço: {produto.preco}</Typography>
              <Typography>Quantidade: {produto.quantidade}</Typography>
              <Typography>Codigo de barras: {produto.codigo}</Typography>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
}
