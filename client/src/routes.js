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
        <Route exact path="/produto/:id" component={buscarproduto} />
        <Route path="/produtos/criar" component={criarprodutos} />
        <Route exact path="/produto/:id/editar" component={editarprotudo} />

        <Route path="*" component={erro404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
