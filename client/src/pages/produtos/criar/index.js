import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../services/api";
import "./index.css";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function CriarProduto() {
  const history = useHistory();

  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("produto", { codigo, nome, quantidade, preco });

      if (response.status === 200) {
        history.push("/");
      }
    } catch (err) {
      setError("Houve um problema ao adicionar o produto T.T");
    }
  }

  return (
    <Container maxWidth="md" align="center">
      <Typography variant="h2" color="inherit">
        Criar produto
      </Typography>
      <Typography variant="h2" color="inherit">
        {error ? error : ""}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Codigo de barras"
          className="inputField"
          onChange={(e) => setCodigo(e.target.value)}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Nome"
          className="inputField"
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Quantidade"
          className="inputField"
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Preço"
          className="inputField"
          onChange={(e) => setPreco(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submitButton"
        >
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}
