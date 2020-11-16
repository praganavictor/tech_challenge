import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../services/api";
// import "./index.css";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function EditarProduto(props) {
  const history = useHistory();

  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function buscaProduto() {
      const res = await api
        .get(`produto/${props.match.params.id}`)
        .catch((err) => console.error("err", err));

      setCodigo(res.data.codigo);
      setNome(res.data.nome);
      setQuantidade(res.data.quantidade);
      setPreco(res.data.preco);
    }

    buscaProduto();
  }, [props.match.params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.put(`produto/${props.match.params.id}`, {
        codigo,
        nome,
        quantidade,
        preco,
      });

      if (response.status === 200) {
        history.push("/");
      }
    } catch (err) {
      setError("Houve um problema ao adicionar o produto T.T");
    }
  }

  return (
    <Container maxWidth="md">
      <Button variant="outlined" color="primary" href="/">
        Voltar
      </Button>

      <Typography variant="h2" color="inherit" align="center">
        Editar produto
      </Typography>
      <Typography variant="h2" color="inherit">
        {error ? error : ""}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          required
          fullWidth
          className="inputField"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          className="inputField"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          className="inputField"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          className="inputField"
          value={preco}
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
