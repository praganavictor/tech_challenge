import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import produtos from "./pages/produtos";
import buscarproduto from "./pages/produtos/busca/";
import criarprodutos from "./pages/produtos/criar/";
import editarprotudo from "./pages/produtos/editar/";

import erro404 from "./pages/error404";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={produtos} />
        <Route exact path="/evento/:id" component={buscarproduto} />
        <Route path="/eventos/criar" component={criarprodutos} />
        <Route exact path="/evento/:id/editar" component={editarprotudo} />

        <Route path="*" component={erro404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
